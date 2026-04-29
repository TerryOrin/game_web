# Render 部署指南 - 艾爾芙卡遊戲網站

## 設置參數

### 基本資訊
- **Service Type**: Static Site
- **Name**: `elvka-game-web`
- **Repository**: `5A8G0001/game_web`
- **Branch**: `main`

### 建構設置
- **Root Directory**: `html`
- **Build Command**: `# No build command needed`
- **Publish Directory**: `.`

### 環境變數
無需設置任何環境變數（靜態網站）

### 自定義域名（可選）
- 主域名: `elvka-game.com` （如果有的話）
- 子域名: `www.elvka-game.com`

## 部署後檢查清單

### 1. 檔案路徑檢查
確保以下檔案能正常訪問：
- `/` → `index.html`
- `/world.html` → 世界觀頁面
- `/characters.html` → 角色介紹頁面
- `/gameplay.html` → 遊戲玩法頁面
- `/download.html` → 下載頁面

### 2. 資源檔案檢查
- ✅ CSS 檔案: `/assets/css/elvka-refresh.css`
- ✅ 圖片檔案: `/assets/images/`
- ✅ 角色 GIF: `/assets/media/elvka/gifs/`
- ✅ Logo: `/assets/images/logo.png`
- ✅ QR Code: `/assets/images/elvka/ig-qrcode.png`

### 3. 重定向設置
創建 `_redirects` 檔案在 html 目錄中：

```
# 首頁
/             /index.html       200

# 其他未知路徑導回首頁
/*            /index.html       200
```

### 4. 標頭設置
創建 `_headers` 檔案在 html 目錄中：

```
/*
  Cache-Control: public, max-age=31536000
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff

/*.html
  Cache-Control: public, max-age=3600

/*.css
  Cache-Control: public, max-age=31536000

/*.js
  Cache-Control: public, max-age=31536000

/*.png
  Cache-Control: public, max-age=31536000

/*.jpg
  Cache-Control: public, max-age=31536000
```

## 故障排除

### 常見問題

1. **404 錯誤**: 檢查 Root Directory 和 Publish Directory 設置
2. **CSS/JS 不載入**: 檢查相對路徑是否正確
3. **圖片顯示問題**: 確認圖片檔案存在且路徑正確

### 部署後測試

1. 測試所有頁面連結
2. 檢查聯絡資訊的 Instagram 連結
3. 確認 QR Code 正常顯示
4. 測試響應式設計在不同裝置上的表現
5. 檢查頁面載入速度

## 自動部署

每次推送到 `main` 分支時，Render 會自動重新部署網站。

## 監控

- 檢查 Render Dashboard 的部署日誌
- 設置 uptime 監控（可選）
- 定期檢查網站效能

## 備註

- 此配置適用於純靜態網站
- 無需後端服務或資料庫
- 所有檔案都會透過 CDN 提供，載入速度快