# MommyMate v1.3.2 Release Notes 🎉

> 重大安全性升級：API Key 完全隱藏，從高風險到安全的完整改進

**發布日期：** 2026-02-03  
**線上體驗：** https://showgan.com/mommymate/

---

## 🔐 安全性升級（重大更新）

### 問題
v1.2.0 及之前版本將 API Key 直接編譯到前端 JavaScript，任何人打開開發者工具都能看到並複製。

### 解決方案
實作完整的後端 API Proxy 架構：

```
使用者 → Nginx → 前端 React → API Proxy → Gemini API
                                    ↑
                              API Key 在這裡
```

### 安全特性
- ✅ **API Key 完全隱藏** - 只存在後端環境變數
- ✅ **CORS 保護** - 限制來源訪問
- ✅ **速率限制** - 15分鐘/50次請求，防止 DDoS
- ✅ **請求日誌** - 完整追蹤記錄
- ✅ **Express Proxy 修復** - `trust proxy` 設定

**風險等級：🔴 高 → 🟢 低**

---

## ✨ 功能改進

### 友善錯誤訊息
不同錯誤類型顯示不同提示：

**額度用完：**
```
⚠️ API 使用額度已達上限
您今天的免費額度已用完，請明天再試。
```

**網路問題：**
```
📡 網路連線發生問題
請檢查您的網路連線後再試。
```

**認證錯誤：**
```
🔐 API 認證失敗
API Key 可能已過期或無效。
```

### 優化錯誤處理
- 新增 `ApiError` 類別
- 集中式錯誤訊息管理
- 更好的用戶體驗

---

## 📝 文檔更新

### 新增文檔
- **README.md** - 完整重寫（60 行 → 400+ 行）
  - 功能特色
  - 安全架構圖
  - 快速開始指南
  - Docker 部署步驟
  - 故障排除
  - 版本歷史

- **SECURITY.md** - 安全性專門文檔
  - 安全措施說明
  - 架構圖
  - 監控指引

- **CHANGELOG.md** - 完整版本歷史
  - v1.1.0 → v1.3.2 所有變更

- **.env.example** - 環境變數範例
  - 清楚的設定指引

- **deploy.sh** - 一鍵部署腳本
  - 自動化部署流程

---

## 🏗️ 架構變更

### 新架構
雙容器部署：
1. **mommymate_app** (port 8086) - 前端 React 應用
2. **mommymate_api_proxy** (port 3001) - 後端 API 代理

### 技術細節
- Express.js API Proxy
- CORS + Rate Limiting
- 請求日誌
- Health Check endpoint

---

## 🧪 測試

### 已驗證功能
- ✅ 本週建議（Gemini 2.5 Flash）
- ✅ AI 聊天助手
- ✅ 語音導覽（Gemini TTS）
- ✅ 營養/購物/預算/補助指南
- ✅ 友善錯誤訊息
- ✅ API Key 完全不可見

### 安全性測試
- ✅ 前端 JavaScript 找不到 API Key
- ✅ CORS 保護運作正常
- ✅ 速率限制生效
- ✅ 錯誤處理友善

---

## 📦 升級指南

### 從 v1.2.0 升級

1. **拉取最新程式碼**
   ```bash
   git pull origin main
   git checkout v1.3.2
   ```

2. **設定環境變數**
   ```bash
   cp .env.example .env
   # 編輯 .env，填入你的 GEMINI_API_KEY
   ```

3. **部署**
   ```bash
   ./deploy.sh
   ```

### 全新安裝
參考 [README.md](./README.md) 的快速開始指南

---

## 🐛 已知問題

### 次要警告（不影響功能）
- ⚠️ Console 中的 CSS 警告（index.css）
- ⚠️ Tailwind CDN 警告
- ⚠️ favicon.ico 404

**這些都不影響核心功能，將在未來版本修復。**

---

## 📊 統計

- **16 個檔案修改**
- **1340+ 行新增**
- **99 行刪除**
- **12 個新檔案**

---

## 🙏 感謝

感謝所有測試和回饋的使用者！

---

## 🔗 相關連結

- **GitHub:** https://github.com/gn01816565/mommymate
- **線上體驗:** https://showgan.com/mommymate/
- **文檔:** [README.md](./README.md)
- **安全性:** [SECURITY.md](./SECURITY.md)
- **版本歷史:** [CHANGELOG.md](./CHANGELOG.md)

---

**Built with ❤️ for expecting mothers**
