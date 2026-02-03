# MommyMate 更新記錄

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
