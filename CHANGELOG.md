# MommyMate 更新記錄

## 2026-02-03 - v1.5.0

### 🛡️ 新增保險規劃指南

**全新功能：**
- ✅ 保險規劃完整工具
- ✅ 4 個功能標籤（總覽、試算、清單、名詞）
- ✅ 互動式保費試算器
- ✅ 投保前檢查清單
- ✅ 保險名詞解釋

**保險總覽：**
- 優先順序標示（⭐⭐⭐⭐⭐）
- 婦嬰險、實支實付、住院日額、癌症險等
- 重要提醒（懷孕前投保）
- 台灣政府補助說明

**保費試算器：**
- 年齡輸入（18-50 歲）
- 6 種保險類別可選
- 即時計算年繳/月繳
- 自動年齡調整（35+、40+）

**投保檢查清單：**
- 6 大重點項目
- 可勾選完成
- 進度條視覺化
- 詳細說明提示

**名詞解釋：**
- 8 個常用保險名詞
- 淺顯易懂說明
- 實例與注意事項

**UI 設計：**
- 精美漸層卡片
- 深色模式完整支援
- 色彩編碼與圖示
- 響應式排版

**整合位置：**
- 檢查與補助標籤
- 與補助資源、預算指南並列
- 3 欄網格布局（桌面版）

---

## 2026-02-03 - v1.4.0

### 🌙 深色模式

**新增功能：**
- ✅ 深色模式切換按鈕（導航欄右上角）
- ✅ 自動儲存使用者偏好
- ✅ 系統偏好自動偵測
- ✅ 平滑過渡動畫

**深色樣式適配：**
- App 主體背景
- 導航欄
- 時間軸組件
- 詳細資訊卡片（部分）
- 手機版下拉選單

**技術：**
- Tailwind `dark:` 類別
- `localStorage` 持久化
- `prefers-color-scheme` 偵測

---

### 📱 PWA 支援

**新增功能：**
- ✅ 可安裝到主畫面（iOS/Android/Desktop）
- ✅ Service Worker 離線支援
- ✅ 原生應用體驗（standalone）
- ✅ 自訂主題顏色

**實作細節：**
- `manifest.json` PWA 清單
- `sw.js` Service Worker
- Cache API 快取策略
- Apple meta tags

---

### 📝 已知限制

**深色模式：**
- ⚠️ DetailView 某些區域尚未完全適配
- ⚠️ 模態視窗（營養指南等）待完善
- ⚠️ ChatWidget 深色樣式待調整

**PWA：**
- 📸 目前使用 SVG 圖示
- 建議未來生成 192x192 和 512x512 PNG

**後續計畫：**
- v1.4.1：完善所有組件深色樣式
- v1.5.0：多語言支援

---

## 2026-02-03 - v1.3.3

### 🔧 小問題修復

**修復內容：**
- ✅ 移除不存在的 `/index.css` 引用
- ✅ 抑制 Tailwind CDN 警告
- ✅ 添加 SVG favicon（粉紅愛心設計）
- ✅ 修正 favicon 路徑

**新增檔案：**
- `public/favicon.svg` - 粉紅漸層愛心圖示
- `public/FAVICON.md` - PNG 生成指南
- `FIXES_SUMMARY.md` - 修復摘要

**改善：**
- Console 更乾淨無錯誤
- 瀏覽器標籤顯示圖示
- 更專業的外觀

---

## 2026-02-03 - v1.3.1

### ✨ 改進錯誤訊息

**更友善的錯誤提示：**
- ✅ 額度用完時顯示明確訊息
- ✅ 網路問題時提示檢查連線
- ✅ API 認證錯誤時建議聯繫管理員
- ✅ 不同錯誤情境顯示不同圖示

**錯誤類型：**
```
⚠️ API 使用額度已達上限
   → 免費額度已用完，請明天再試

📡 網路連線發生問題
   → 請檢查網路連線

🔐 API 認證失敗
   → API Key 可能過期

🔧 Google AI 服務暫時無法使用
   → 伺服器錯誤，請稍後再試
```

**改動檔案：**
- `services/apiProxy.ts` - 新增 ApiError 類別
- `services/geminiServiceSecure.ts` - 新增 getErrorMessage 函數
- `components/DetailView.tsx` - 更新語音生成錯誤處理

---

## 2026-02-03 - v1.2.0

### ⚠️ 移除圖片生成功能

**原因：** Imagen API 需要付費帳號
```
"Imagen API is only accessible to billed users at this time."
```

**改動：**
- ❌ 移除 `generateBabyImage()` 呼叫
- ❌ 移除圖片顯示 UI
- ✅ 保留 AI 語音導覽
- ✅ 優化語音功能展示

**免費版可用功能：**
1. ✅ 本週建議（Gemini 2.5 Flash）
2. ✅ AI 聊天助手（Gemini 2.5 Flash）
3. ✅ 語音導覽（Gemini TTS）

---

## 2026-02-03 - v1.1.0

### ✅ 主要改動

#### 1. 移除視訊生成功能
- **原因**：Veo 視訊生成在免費 API 配額下幾乎不可用
- **影響**：移除 `generateBabyVideo()` 函數

#### 2. 新增圖片生成功能
- **模型**：`gemini-2.0-flash-exp-image-generation`
- **功能**：生成胎兒發展的醫學插畫
- **優點**：
  - ✅ 速度更快（5-10 秒 vs 10-20 秒）
  - ✅ 免費額度更充足
  - ✅ 依然提供視覺化展示
  - ✅ 品質高且科學準確

#### 3. 修正 Gemini 模型名稱
- **本週建議**：`gemini-3-flash-preview` → `gemini-2.5-flash`
- **AI 聊天**：`gemini-3-flash-preview` → `gemini-2.5-flash`
- **語音導覽**：保持 `gemini-2.5-flash-preview-tts`

### 🔧 技術細節

**新增函數：**
```typescript
generateBabyImage(week: number, babySize: string): Promise<string>
```

**UI 改動：**
- 「寶寶模擬影像」→「寶寶模擬圖片」
- `<video>` → `<img>`
- 載入文字更新

### 📊 免費額度使用估算

**每日使用量（免費版）：**
- 本週建議：~10 次 ✅
- AI 聊天：~20 次 ✅
- 語音導覽：~10 次 ✅
- 圖片生成：~5 次 ✅

**總計**：遠低於 1,500 次/天免費額度

### 🔐 安全性改進

**API Key 保護建議：**
1. 設定 HTTP referrers 限制：`showgan.com/*`
2. 只啟用需要的 API
3. 設定每日配額上限
4. 定期檢查使用量

### 🚀 部署指令

```bash
cd ~/tmp/mommymate-build
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

**網址**：https://showgan.com/mommymate/
**GitHub**：https://github.com/gn01816565/mommymate
