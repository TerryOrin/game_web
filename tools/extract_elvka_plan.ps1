param(
    [Parameter(Mandatory = $true)]
    [string]$PdfPath,

    [Parameter(Mandatory = $true)]
    [string]$OutPath
)

$latin1Encoding = [System.Text.Encoding]::GetEncoding(28591)
$bytes = [System.IO.File]::ReadAllBytes($PdfPath)
$latin1 = $latin1Encoding.GetString($bytes)
$objMatches = [regex]::Matches($latin1, '(?ms)(\d+)\s+(\d+)\s+obj\s*(.*?)\s*endobj')
$objects = @{}
foreach ($m in $objMatches) {
    $objects[$m.Groups[1].Value] = $m.Groups[3].Value
}

function Get-HexBytes {
    param([string]$Hex)

    if ([string]::IsNullOrWhiteSpace($Hex)) {
        return [byte[]]::new(0)
    }

    $clean = ($Hex -replace '\s+', '')
    $result = New-Object byte[] ($clean.Length / 2)
    for ($index = 0; $index -lt $clean.Length; $index += 2) {
        $result[$index / 2] = [Convert]::ToByte($clean.Substring($index, 2), 16)
    }

    return $result
}

function Convert-HexUnicodeToString {
    param([string]$Hex)

    $hexBytes = Get-HexBytes $Hex
    if ($hexBytes.Length -eq 0) {
        return ''
    }

    return [System.Text.Encoding]::BigEndianUnicode.GetString($hexBytes)
}

function Get-DecompressedText {
    param([string]$ObjectId)

    $body = $objects[$ObjectId]
    if (-not $body) {
        return $null
    }

    $streamMatch = [regex]::Match($body, 'stream\r?\n(.*?)\r?\nendstream', [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if (-not $streamMatch.Success) {
        return $body
    }

    $rawBytes = $latin1Encoding.GetBytes($streamMatch.Groups[1].Value)
    try {
        $payload = if ($rawBytes.Length -gt 6 -and $rawBytes[0] -eq 120) {
            $rawBytes[2..($rawBytes.Length - 5)]
        } else {
            $rawBytes
        }

        $input = New-Object System.IO.MemoryStream
        $input.Write($payload, 0, $payload.Length)
        $input.Position = 0
        $output = New-Object System.IO.MemoryStream
        $deflate = New-Object System.IO.Compression.DeflateStream($input, [System.IO.Compression.CompressionMode]::Decompress)
        $deflate.CopyTo($output)
        $deflate.Dispose()
        return $latin1Encoding.GetString($output.ToArray())
    } catch {
        return $body
    }
}

function Parse-ToUnicodeMap {
    param([string]$CMapText)

    $map = @{}
    $lines = $CMapText -split "`r?`n"
    for ($index = 0; $index -lt $lines.Length; $index++) {
        $line = $lines[$index].Trim()

        if ($line -match '^(\d+)\s+beginbfchar$') {
            $count = [int]$Matches[1]
            for ($offset = 1; $offset -le $count; $offset++) {
                $entry = $lines[$index + $offset].Trim()
                if ($entry -match '^<([^>]+)>\s+<([^>]+)>$') {
                    $map[$Matches[1].ToUpper()] = Convert-HexUnicodeToString $Matches[2]
                }
            }
            $index += $count
            continue
        }

        if ($line -match '^(\d+)\s+beginbfrange$') {
            $count = [int]$Matches[1]
            for ($offset = 1; $offset -le $count; $offset++) {
                $entry = $lines[$index + $offset].Trim()
                if ($entry -match '^<([^>]+)>\s+<([^>]+)>\s+<([^>]+)>$') {
                    $start = [Convert]::ToInt32($Matches[1], 16)
                    $end = [Convert]::ToInt32($Matches[2], 16)
                    $dest = [Convert]::ToInt32($Matches[3], 16)
                    for ($code = $start; $code -le $end; $code++) {
                        $map[('{0:X4}' -f $code)] = Convert-HexUnicodeToString ('{0:X4}' -f ($dest + ($code - $start)))
                    }
                    continue
                }

                if ($entry -match '^<([^>]+)>\s+<([^>]+)>\s+\[(.+)\]$') {
                    $start = [Convert]::ToInt32($Matches[1], 16)
                    $end = [Convert]::ToInt32($Matches[2], 16)
                    $targets = [regex]::Matches($Matches[3], '<([^>]+)>')
                    $cursor = 0
                    for ($code = $start; $code -le $end -and $cursor -lt $targets.Count; $code++) {
                        $map[('{0:X4}' -f $code)] = Convert-HexUnicodeToString $targets[$cursor].Groups[1].Value
                        $cursor++
                    }
                }
            }
            $index += $count
        }
    }

    return $map
}

$fontObjectToUnicode = @{}
foreach ($pair in $objects.GetEnumerator()) {
    $body = $pair.Value
    if ($body -match '/Type\s*/Font' -and $body -match '/ToUnicode\s+(\d+)\s+0\s+R') {
        $fontObjectToUnicode[$pair.Key] = $Matches[1]
    }
}

$aliasToFontObject = @{}
foreach ($pair in $objects.GetEnumerator()) {
    $matches = [regex]::Matches($pair.Value, '/(F\d+)\s+(\d+)\s+0\s+R')
    foreach ($match in $matches) {
        $aliasToFontObject[$match.Groups[1].Value] = $match.Groups[2].Value
    }
}

$aliasToMap = @{}
foreach ($alias in $aliasToFontObject.Keys) {
    $fontObject = $aliasToFontObject[$alias]
    if ($fontObjectToUnicode.ContainsKey($fontObject)) {
        $aliasToMap[$alias] = Parse-ToUnicodeMap (Get-DecompressedText $fontObjectToUnicode[$fontObject])
    }
}

function Decode-HexText {
    param(
        [string]$FontAlias,
        [string]$Hex
    )

    $clean = ($Hex -replace '\s+', '').ToUpper()
    if ([string]::IsNullOrWhiteSpace($clean)) {
        return ''
    }

    $map = $aliasToMap[$FontAlias]
    if (-not $map) {
        return Convert-HexUnicodeToString $clean
    }

    $lengths = $map.Keys | ForEach-Object { $_.Length } | Sort-Object -Descending -Unique
    $builder = New-Object System.Text.StringBuilder
    $index = 0
    while ($index -lt $clean.Length) {
        $matched = $false
        foreach ($length in $lengths) {
            if ($index + $length -le $clean.Length) {
                $key = $clean.Substring($index, $length)
                if ($map.ContainsKey($key)) {
                    [void]$builder.Append($map[$key])
                    $index += $length
                    $matched = $true
                    break
                }
            }
        }

        if (-not $matched) {
            $index += 2
        }
    }

    return $builder.ToString()
}

function Decode-LiteralText {
    param([string]$Literal)

    $text = $Literal -replace '\\\\', '\\'
    $text = $text -replace '\\\(', '('
    $text = $text -replace '\\\)', ')'
    return $text
}

function Decode-ArrayText {
    param(
        [string]$FontAlias,
        [string]$Body
    )

    $parts = [regex]::Matches($Body, '<([^>]+)>|\(([^)]*)\)')
    $builder = New-Object System.Text.StringBuilder
    foreach ($part in $parts) {
        if ($part.Groups[1].Success) {
            [void]$builder.Append((Decode-HexText $FontAlias $part.Groups[1].Value))
        } elseif ($part.Groups[2].Success) {
            [void]$builder.Append((Decode-LiteralText $part.Groups[2].Value))
        }
    }

    return $builder.ToString()
}

$pageObjects = New-Object System.Collections.Generic.List[object]
foreach ($pair in $objects.GetEnumerator() | Sort-Object { [int]$_.Key }) {
    $body = $pair.Value
    if ($body -match '/Type\s*/Page\b' -and $body -notmatch '/Type\s*/Pages\b') {
        $pageObjects.Add([pscustomobject]@{ Id = $pair.Key; Body = $body })
    }
}

$outputLines = New-Object System.Collections.Generic.List[string]
$pageNumber = 0
foreach ($page in $pageObjects) {
    $pageNumber++
    $contentIds = New-Object System.Collections.Generic.List[string]
    if ($page.Body -match '/Contents\s+(\d+)\s+0\s+R') {
        $contentIds.Add($Matches[1])
    } elseif ($page.Body -match '/Contents\s*\[(.*?)\]') {
        $refs = [regex]::Matches($Matches[1], '(\d+)\s+0\s+R')
        foreach ($ref in $refs) {
            $contentIds.Add($ref.Groups[1].Value)
        }
    }

    $pageTexts = New-Object System.Collections.Generic.List[string]
    foreach ($contentId in $contentIds) {
        $streamText = Get-DecompressedText $contentId
        if (-not $streamText) {
            continue
        }

        $currentFont = 'F1'
        $lines = $streamText -split "`r?`n"
        foreach ($line in $lines) {
            $fontMatch = [regex]::Match($line, '/(F\d+)\s+[\d\.]+\s+Tf')
            if ($fontMatch.Success) {
                $currentFont = $fontMatch.Groups[1].Value
            }

            $arrayMatches = [regex]::Matches($line, '\[(.*?)\]\s*TJ')
            foreach ($match in $arrayMatches) {
                $decoded = Decode-ArrayText $currentFont $match.Groups[1].Value
                if (-not [string]::IsNullOrWhiteSpace($decoded)) {
                    $pageTexts.Add($decoded.Trim())
                }
            }

            $hexMatches = [regex]::Matches($line, '<([^>]+)>\s*Tj')
            foreach ($match in $hexMatches) {
                $decoded = Decode-HexText $currentFont $match.Groups[1].Value
                if (-not [string]::IsNullOrWhiteSpace($decoded)) {
                    $pageTexts.Add($decoded.Trim())
                }
            }

            $literalMatches = [regex]::Matches($line, '\(([^)]*)\)\s*Tj')
            foreach ($match in $literalMatches) {
                $decoded = Decode-LiteralText $match.Groups[1].Value
                if (-not [string]::IsNullOrWhiteSpace($decoded)) {
                    $pageTexts.Add($decoded.Trim())
                }
            }
        }
    }

    $outputLines.Add("===== Page $pageNumber =====")
    foreach ($entry in $pageTexts) {
        $outputLines.Add($entry)
    }
    $outputLines.Add('')
}

[System.IO.File]::WriteAllLines($OutPath, $outputLines, [System.Text.Encoding]::UTF8)
Write-Output $OutPath