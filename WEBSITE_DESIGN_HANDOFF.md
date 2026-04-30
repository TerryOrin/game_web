# 艾爾芙卡網站設計 Handoff

這份文件的目的，是把目前網站已完成的設計內容完整整理成可供其他 AI 分析、評論、延伸設計或重構的輸入資料。

適用對象：
- 視覺設計分析 AI
- 前端 UI/UX 重構 AI
- 品牌／官網風格評論 AI
- 動畫、互動、體驗優化 AI

工作區路徑：
- 專案根目錄：d:/git_repo/game_web
- 正式網站頁面目錄：d:/git_repo/game_web/html

## 1. 專案定位

網站類型：
- 靜態遊戲官網

遊戲名稱：
- 艾爾芙卡 ELVKA

遊戲定位：
- 三人編隊
- 戰前站位
- 地形高度操控
- 強化攻擊條件切換
- 回合制戰棋 / Tactical SRPG

目標受眾：
- 玩家
- 評審
- 展演觀眾
- 對角色、美術、世界觀與玩法有興趣的潛在關注者

設計目標：
- 不做企業型資訊網站
- 不做開發者自述頁
- 目標是接近市面遊戲官網的「玩家導向」、「主視覺導向」、「角色與玩法導向」體驗

## 2. 正式網站頁面清單

目前正式 live pages 只有以下五頁：

1. html/index.html
2. html/world.html
3. html/characters.html
4. html/gameplay.html
5. html/download.html

其他頁面都不再是主站內容核心。

## 3. 整體視覺方向

### 3.1 核心風格

網站整體不是單一風格，而是「深色幻想官網」和「亮白角色展示」混合的體系：

- 內頁大多維持深色幻想風格
- 首頁 hero 已被重做成較亮、較精品感、較二次元海報化的編輯式版面
- 全站仍保留統一的卡片系統、字體體系、圓角、玻璃感、漸層與發光細節

整體關鍵詞：
- Anime premium
- Tactical fantasy
- Editorial hero layout
- Glass panel
- Gradient glow
- Character-centric
- Motion-rich landing page

### 3.2 美術素材使用方向

網站使用大量正式版素材，重點包含：

- LOGO.png 作為 favicon 與品牌識別主圖
- 懸舵主視覺海報作為首頁 Hero 核心
- 角色立繪
- 角色頭像
- 技能卡圖
- 群像圖
- 異獸／世界觀圖像
- 角色 GIF 動態圖
- 角色技能與強化攻擊本地 MP4

素材使用原則：
- 首頁偏海報與主視覺統御
- 世界頁偏世界觀與災禍敘事
- 角色頁偏角色資料庫與動態展示
- 玩法頁偏系統說明與影片示意
- 下載頁偏 CTA 與入口整理

## 4. 品牌與識別

### 4.1 品牌名與標語

Header 品牌文字固定為：
- 艾爾芙卡 ELVKA
- 三人編隊 × 地形戰棋

### 4.2 Logo 使用方式

Logo 檔案：
- html/assets/images/LOGO.png

使用位置：
- 每頁 favicon
- Header 品牌圖示
- 舊版首頁曾作為 crest 使用，現首頁新版 hero 已轉為偏編輯式用法

### 4.3 Header 風格

共通 header 特徵：
- sticky 頂部導覽
- 半透明背景
- backdrop blur
- 底部細線
- 桌面為水平導覽
- 手機為 mobile nav toggle

首頁 header 特化：
- 已改為更亮的半透明淺色 header
- 導覽與品牌字轉為深藍色系
- 與首頁亮白 hero 做一致化

## 5. 配色系統

### 5.1 全站共用變數

主要定義在：
- html/assets/css/elvka-refresh.css

全站基礎變數：
- --bg: #07080d
- --bg-soft: #10131d
- --panel: rgba(18, 20, 30, 0.88)
- --panel-strong: rgba(25, 28, 42, 0.96)
- --line: rgba(255, 255, 255, 0.08)
- --text: #f4f0ef
- --text-muted: #c4c6d2
- --text-soft: #9095ab
- --crimson: #d14b69
- --rose: #ff8aa4
- --aqua: #74d6ff
- --gold: #f5d28d
- --violet: #7d6ff0

### 5.2 色彩傾向

全站主色關係：
- 深底：黑藍 / 夜色 / 科幻幻想感
- 強調色：玫紅、粉、淡藍、金色、紫色
- 功能效果：用於漸層、光暈、卡片高光、按鈕強調

### 5.3 首頁 Hero 特化色調

新版首頁 hero 已從深色壓暗式構圖，改為亮色編輯式構圖：

- Hero 背景為淺白到淺藍漸層
- 文字主色改為深藍
- 角色臉部保留原畫亮度
- 暗部不再整張圖大面積覆蓋
- 改用右側文案玻璃板承接資訊
- 藍色粒子與背景英文裝飾字加強俐落感

首頁 hero 主色趨勢：
- 白
- 淺藍
- 深藍
- 冷白
- 極少量金色與藍亮點作視覺節奏

## 6. 字體與排版

### 6.1 字體

Google Fonts：
- Noto Sans TC
- Noto Serif TC

用途分工：
- Noto Sans TC：本文、導覽、meta、button、說明性文字
- Noto Serif TC：大標、章節標題、首頁 hero 標題、quote panel、重要標頭

### 6.2 排版傾向

目前網站排版使用：
- 中文為主
- 中英混排作裝飾與標籤
- 大標多用 Serif
- 章節與說明文維持可讀性優先
- 用圓角卡片與 section heading 提供節奏

### 6.3 標題處理

目前已針對標題做穩定化：
- text-wrap: balance
- line-break: strict
- 首頁 hero 主標改成獨立 span line structure，不再用 br 粗暴斷行

首頁 hero 標題內容：
- 在赤城裂縫失控後
- 排出你的三人戰線

這兩行已做成可控的雙行結構，避免縮放時亂掉。

### 6.4 首頁 Hero 的文字語言

首頁 hero 的文案組成：
- Eyebrow：2026 放視大賞參賽作品 / Tactical SRPG
- Meta tag：懸舵 / Xuanduo Focus
- Editorial line：Tactical Formation / Xuanduo Arc 01
- 主標：在赤城裂縫失控後 / 排出你的三人戰線
- 說明文：強調三人編隊、戰前站位、地形操控、強化攻擊
- CTA：下載電腦版試玩、觀看實戰玩法

## 7. 版型系統

### 7.1 全站共同版型語言

主要版型模組：
- page-hero-grid
- feature-grid
- split-layout
- feature-split
- cta-layout
- download-layout
- character-grid
- motion-grid
- video-grid
- platform-grid
- note-grid
- stat-strip

### 7.2 容器寬度

主容器變數：
- --container: min(1180px, calc(100vw - 40px))

手機 breakpoint 下會改成：
- min(100vw - 28px, 100%)

### 7.3 卡片語言

網站大量使用統一卡片樣式，核心特徵：
- 大圓角
- 玻璃感或半透明底
- 柔和邊框
- 陰影
- 內部高光漸層
- hover lift
- hover sheen 掃光

主要卡片類型：
- stat-card
- info-card
- roster-card
- skill-card
- art-card
- surface-panel
- contact-panel
- platform-card
- timeline-step
- note-card
- quote-panel

## 8. 首頁設計詳解

首頁是目前設計最特化的一頁。

### 8.1 首頁 Hero 構圖

目前首頁 Hero 採用：
- 亮白編輯式 Hero
- 左側保留角色主視覺面部與頭部區域
- 右側放置文案玻璃面板
- 背景右上有巨大裝飾文字 XUANDUO
- 背景上方有次標文字 TACTICAL FORMATION ARC 01
- Hero 底部右側有 scroll cue

### 8.2 首頁 Hero 的設計目標

首頁 hero 目前要完成的視覺目標：
- 不遮住角色眼睛
- 把文字與角色分區
- 保留海報感
- 看起來像高端二次元作品官網首屏
- 有動態但不廉價

### 8.3 首頁 Hero 的構圖邏輯

目前構圖屬於：
- 角色圖偏左
- 文案版塊偏右
- 臉部區域盡量保亮、不被文字蓋住
- 右側用玻璃卡板承接資訊
- 右上背景字層補足層次

### 8.4 首頁 Hero 的裝飾層

Hero 內的特殊圖層：
- hero-banner-art：主海報圖層
- hero-particles：粒子層
- hero-typography-layer：背景字層
- hero-copy--banner：右側文案玻璃板
- hero-scroll-cue：往下滑提示

### 8.5 首頁 Hero 的視覺語言

目前首頁 hero 呈現的是：
- 輕高級感
- 白底精品感
- 藍色俐落感
- 角色中心的動漫海報式呈現
- 戰術感而不是可愛感

### 8.6 首頁下方內容編排

首頁後續 section 的順序：

1. stat strip
2. 核心玩法 feature grid
3. 角色與陣營 split section
4. 官方試玩影片 showcase
5. 六位角色 character strip
6. 世界觀與下載 CTA 區

首頁偏向：
- 先抓主視覺
- 再用短資訊卡快速建立玩法印象
- 再導向角色、世界、玩法與下載

## 9. 世界頁設計詳解

頁面：
- html/world.html

定位：
- 世界觀／故事背景展示頁

風格特徵：
- 深色幻想底
- 大量敘事文案
- 用群像圖與異獸圖搭配設定說明
- 使用 note cards、feature cards、quote panel 做資訊分層

內容模組：
- page hero：裏世界 / 表世界 / 裂縫危機
- 世界骨架
- 第一章開端
- 族群與地區
- 異象與災禍
- 世界觀核心 quote

核心內容傾向：
- 世界觀資訊密度較高
- 不是百科頁，而是戲劇性導向的世界導覽

## 10. 角色頁設計詳解

頁面：
- html/characters.html

定位：
- 角色資料庫
- 角色立繪展示
- 技能卡展示
- GIF 動態圖庫
- 本地 MP4 技能 / 強化攻擊展示

風格特徵：
- 內容最豐富的一頁
- 素材使用量最大
- 結合角色卡、技能卡、動態圖與影片
- 兼具設定頁與展示頁功能

主要模組：

1. page hero
- 懸舵完整立繪
- 六位角色、三個陣營、技能改地形、強化攻擊條件等 pill tags

2. 角色陣容 grid
- 六位角色 roster-card
- 每張卡含：頭像、角色名、陣營／種族、立繪、介紹文、tag list

3. 技能卡 grid
- 六張技能卡
- 每張卡對應角色代表技能與文字說明

4. GIF 動態圖庫
- 每位角色各一組 motion group
- GIF 依檔名分類展示：idle / attack / skill / grab / hit 等
- 每組都有說明文字，說明動作氣質與定位

5. 本地 MP4 影片區
- 每位角色技能與強化攻擊影片
- video-grid 展示

6. quote panel
- 用一句話總結角色設計核心

角色頁是最適合被其他 AI 拿去做：
- 展示邏輯評論
- 遊戲角色官網優化建議
- 角色商業化／玩家導向導覽優化

## 11. 玩法頁設計詳解

頁面：
- html/gameplay.html

定位：
- 用較清楚的系統解說方式介紹玩法

風格特徵：
- 深色背景
- 比首頁更功能導向
- 用 section heading、metric cards、timeline、bullet list 把規則拆清楚

內容模組：

1. page hero
- 說明三人編隊、站位、高度與強化條件

2. 官方實戰影片
- 主要影片區塊
- 右側 surface panel 說明應該觀察什麼

3. 四大系統
- 隊伍編輯
- 角色能力
- 地形變化

4. 回合流程 timeline
- 先組隊與佈位
- 爭奪高度
- 改地形與推位
- 分配行動點數

5. 地形規則 split section
- 使用技能卡圖加規則 bullet list

6. 回合資源與條件
- 10 點行動
- 強化攻擊覆蓋普通攻擊

7. quote panel

### 11.1 玩法頁影片嵌入策略

玩法頁已做本機預覽 fallback：
- http/https 下才動態建立 YouTube iframe
- file:// 下改顯示 fallback 卡片與 YouTube 外連

這是為了避免本機預覽時的 YouTube error 153。

## 12. 下載頁設計詳解

頁面：
- html/download.html

定位：
- 單一功能明確的 CTA 頁
- 試玩包下載入口與社群入口整理頁

風格特徵：
- 結構簡單
- CTA 清楚
- 搭配平台資訊卡與 QR code

內容模組：

1. page hero
- PC 版試玩下載主 CTA
- Instagram 次 CTA
- 顯示下載路徑 builds/elvka-windows.zip

2. 試玩內容 platform cards
- 三人編隊與戰前部署
- 地形高度與引爆規則
- 10 點行動與強化攻擊

3. 下載之後 section
- contact panel
- QR code
- Instagram / mailto
- timeline 三步驟

4. quote panel

## 13. 動態與互動設計

### 13.1 動態來源

目前動態主要來自以下幾層：

1. CSS keyframes
2. animate.css
3. page-transitions.js
4. site-motion.js
5. particles.js（首頁 hero）
6. hover transition 系統

### 13.2 頁面切換動態

檔案：
- html/assets/js/page-transitions.js

功能：
- 攔截同源站內連結
- 點擊後先讓 body 加上 is-page-leaving
- site-shell 淡出、下沉、縮放、模糊
- 220ms 後切頁

排除情況：
- mailto
- tel
- javascript:
- anchor
- download
- target 非 _self
- 同頁連結
- reduced motion

### 13.3 Scroll reveal 系統

檔案：
- html/assets/js/site-motion.js

功能：
- 使用 IntersectionObserver
- 進場前元素會帶有 data-reveal
- 可套用 fadeInUp / fadeInLeft / fadeInRight / zoomIn 等 animate.css class
- 用於：
  - hero 文案
  - stat cards
  - section headings
  - split layouts
  - grid cards
  - footer panel

### 13.4 Hero 視差

首頁 hero 目前有兩種視差：

1. Scroll-linked parallax
- 根據 scroll 更新：
  - --hero-parallax
  - --hero-copy-shift
  - --hero-overlay-shift

2. Pointer parallax
- 滑鼠在 hero 上移動時，會更新：
  - --hero-pointer-x
  - --hero-pointer-y
- 影響：
  - 主海報圖
  - 背景裝飾層
  - 文案板
  - 背景英文裝飾字

### 13.5 首頁粒子系統

首頁使用：
- html/assets/js/plugins/particles.js

目前粒子效果：
- 藍色點粒子
- 帶連線
- hover 時 grab line 加強
- 整體偏輕，不是爆炸型特效

目的：
- 呼應角色海報中的藍色羽毛／能量感
- 讓 hero 更有呼吸感與大作感

### 13.6 Hover 動態

大量卡片與圖像具備 hover 動態：
- 上浮 lift
- 邊框高亮
- 陰影加強
- 掃光 sheen
- 圖片微放大與飽和度微提升

### 13.7 Header 捲動進度條

Header 底部有一條細 progress line：
- 使用 --scroll-progress 控制 scaleX
- 顏色為 crimson -> gold -> aqua 漸層

### 13.8 首頁 Scroll cue

首頁 hero 右下有：
- Scroll 字樣
- 圓形 chevron icon
- icon 會上下 bob 動畫

## 14. 響應式設計

主要 breakpoint：
- 1080px
- 820px
- 560px

### 14.1 Header 響應式

桌面：
- 水平導覽

820px 以下：
- 變成 mobile nav toggle
- 導覽可展開／收合
- ESC 可關閉
- 點擊站外可關閉

### 14.2 首頁 Hero 響應式

首頁 hero 已做多段調整：
- 平板時仍保留編輯式文案板，但改為單欄收斂
- 主圖位置會往左側或更上方重新取位
- 背景字大小縮小
- 文案面板 padding / gap / heading size 都會縮
- 手機時 CTA 保持在首屏可見範圍內

### 14.3 內容網格響應式

多數 grid 會從：
- 3 欄 -> 2 欄 -> 1 欄

代表區塊：
- feature-grid
- metric-grid
- character-grid
- note-grid
- skill-grid
- motion-grid
- video-grid
- platform-grid
- footer-panel

## 15. 素材資產整理

### 15.1 重要圖片資產

代表性圖片：
- html/assets/images/LOGO.png
- html/assets/images/elvka/xuanduo-poster.jpg
- html/assets/images/elvka/hero-main.jpg
- html/assets/images/elvka/creature.png
- html/assets/images/elvka/ig-qrcode.png

角色立繪：
- html/assets/images/elvka/characters/*.png

角色頭像：
- html/assets/images/elvka/heads/*.png

技能卡：
- html/assets/images/elvka/cards/*.png

### 15.2 GIF 資產

角色 GIF 來源整理至：
- html/assets/media/elvka/gifs/

每位角色各自有子目錄，依原檔名保留 idle / attack / skill / grab / hit 等資訊。

### 15.3 本地影片資產

角色技能與強化攻擊影片位於：
- html/assets/media/elvka/*.mp4

角色頁會直接使用本地 video tag 播放。

## 16. 技術與外部依賴

外部與套件來源：
- Google Fonts
  - Noto Sans TC
  - Noto Serif TC
- Font Awesome 6.7.2 CDN
- animate.css
- particles.js

自製共用腳本：
- html/assets/js/page-transitions.js
- html/assets/js/site-motion.js

## 17. 目前已知限制與注意事項

### 17.1 CSS 結構注意

elvka-refresh.css 裡面有較早期的 hero 定義殘留，後段才是目前真正生效的 hero 區塊與 responsive overrides。

如果其他 AI 要改首頁 hero，應優先改：
- 後段的 .hero-banner 區塊
- 後段 breakpoint 區塊

不要只改前面那一段，否則可能看似改了但實際不生效。

### 17.2 本機預覽限制

YouTube 嵌入在 file:// 預覽下會有 referrer 限制。

目前：
- gameplay.html 已做 fallback
- index.html 首頁影片仍是直接 iframe，不是 fallback 方案

這是設計分析時需要區分的技術限制，不代表部署後一定有同樣問題。

### 17.3 首頁與內頁風格差異

首頁 hero 已進入亮白編輯式精品感方向，但其他內頁仍以深色幻想官網風格為主。

這代表目前站內風格屬於：
- 已部分統一，但尚非完全同一視覺宇宙

對其他 AI 來說，這是一個可分析點：
- 要不要把全站向首頁靠攏
- 或維持首頁亮、內頁深的雙軌系統

## 18. 給其他 AI 的分析重點建議

你可以請其他 AI 從以下角度分析這個網站：

1. 品牌一致性
- 首頁亮白編輯式 hero 與內頁深色幻想風格是否一致

2. 遊戲官網感
- 首頁是否足夠像商業遊戲官網
- CTA 是否清楚
- 角色與玩法資訊的節奏是否合理

3. 視覺層次
- 首頁海報、文案板、背景英文字、粒子與 scroll cue 是否平衡
- 卡片系統是否過多、過密或剛好

4. 動態效果
- scroll reveal、hover、particles、parallax 是否過多或剛好
- 哪些動畫能再提升品質而不顯廉價

5. 響應式設計
- 手機與平板時首頁 hero 是否仍成立
- 角色頁、GIF 區與影片區的資訊密度是否過高

6. 商業展示力
- 如果要面向 Steam、展演、比賽評審，這個站的首頁與下載頁是否夠有效

## 19. 可直接丟給其他 AI 的簡化 Prompt

你可以直接把下面這段貼給其他 AI：

請分析一個名為「艾爾芙卡 ELVKA」的靜態遊戲官網設計。這個網站包含首頁、世界觀頁、角色頁、玩法頁、下載頁。整體以中文為主，字體是 Noto Sans TC 與 Noto Serif TC，內頁多為深色幻想風格，首頁 Hero 則改成亮白編輯式精品感構圖。首頁使用懸舵海報作為主視覺，角色圖偏左保留臉部亮度，右側為玻璃感文案板，並有背景裝飾字「XUANDUO」、粒子特效、滑鼠微視差、scroll cue。全站有 sticky header、mobile nav、scroll reveal、hover 掃光、卡片 lift、頁面切換淡出。角色頁整合角色立繪、技能卡、GIF 動態圖庫與本地 MP4，玩法頁有 YouTube 影片與規則說明，下載頁有 PC 試玩入口與 Instagram / mailto。請從品牌一致性、遊戲官網感、視覺層次、動態品質、響應式設計、商業展示力與可優化方向進行詳細分析。
