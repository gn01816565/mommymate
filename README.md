# MommyMate - AI 驅動的孕期旅程指南 🤰

> 陪伴您與寶寶的每一天

一個結合 Google Gemini AI 技術的懷孕管理應用，提供個人化的孕期建議、AI 聊天助手和語音導覽。

**🌐 線上體驗：** https://showgan.com/mommymate/

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

---

## ✨ 功能特色

### 🤖 AI 驅動功能
- **💬 AI 本週建議** - 根據懷孕週數提供個人化建議
- **🗣️ AI 聊天助手** - 24/7 即時問答，專業孕期知識
- **🎵 語音導覽** - AI 語音朗讀，溫柔陪伴

### 📱 實用工具
- **🗓️ 孕期時間軸** - 40 週完整追蹤
- **🍎 營養指南** - 飲食建議與營養資訊
- **🛒 購物清單** - 孕期必備物品整理
- **💰 預算規劃** - 懷孕與育兒費用規劃
- **🏥 補助指南** - 台灣孕婦補助與福利

### 🔐 安全特性
- **API Key 完全隱藏** - 使用後端 Proxy，前端不暴露
- **CORS 保護** - 限制來源訪問
- **速率限制** - 防止濫用（15分鐘/50次）
- **請求日誌** - 完整追蹤記錄

---

## 🏗️ 技術架構

### 前端
- **框架：** React 19 + TypeScript
- **建構工具：** Vite 6
- **樣式：** Tailwind CSS
- **渲染：** React Markdown

### 後端
- **API Proxy：** Node.js + Express
- **AI 服務：** Google Gemini API
  - `gemini-2.5-flash` - 文字生成
  - `gemini-2.5-flash-preview-tts` - 語音合成

### 部署
- **容器化：** Docker + Docker Compose
- **反向代理：** Nginx
- **SSL：** Let's Encrypt

### 安全架構

```
使用者
    ↓
Nginx (HTTPS 443)
    ↓ /mommymate/
前端 React (mommymate_app:8086)
    ↓ /mommymate/api/
API Proxy (mommymate_api_proxy:3001)
    ↓ [API Key 在這裡]
Google Gemini API
```

**優點：**
- ✅ API Key 不暴露在前端 JavaScript
- ✅ CORS 限制只允許你的網域
- ✅ 速率限制防止濫用
- ✅ 集中式日誌記錄

---

## 🚀 快速開始

### 1. 前置需求

- **Node.js** 20+ 
- **Docker** & **Docker Compose**
- **Gemini API Key** - 從 [AI Studio](https://aistudio.google.com/apikey) 取得（免費）

### 2. 本地開發

```bash
# 1. Clone 專案
git clone https://github.com/gn01816565/mommymate.git
cd mommymate

# 2. 安裝依賴
npm install

# 3. 設定環境變數
cp .env.example .env
# 編輯 .env，填入你的 GEMINI_API_KEY

# 4. 啟動開發伺服器
npm run dev

# 5. 瀏覽 http://localhost:3000
```

### 3. Docker 部署（推薦）

```bash
# 1. 設定環境變數
echo "GEMINI_API_KEY=your_key_here" > .env

# 2. 建立並啟動服務
docker-compose up -d

# 3. 檢查狀態
docker-compose ps

# 4. 查看日誌
docker-compose logs -f
```

**服務：**
- **前端：** http://localhost:8086
- **API Proxy：** http://localhost:3001

### 4. 生產部署

使用提供的部署腳本：

```bash
# 一鍵部署
./deploy.sh
```

腳本會自動：
1. ✅ 檢查 .env 檔案
2. ✅ 同步檔案
3. ✅ 停止舊容器
4. ✅ 建立新映像
5. ✅ 啟動服務
6. ✅ 驗證健康狀態

---

## 📁 專案結構

```
mommymate/
├── components/              # React 元件
│   ├── Timeline.tsx        # 孕期時間軸
│   ├── DetailView.tsx      # 週數詳細資訊
│   ├── ChatWidget.tsx      # AI 聊天助手
│   ├── NutritionGuide.tsx  # 營養指南
│   ├── ShoppingList.tsx    # 購物清單
│   ├── BudgetGuide.tsx     # 預算規劃
│   └── SubsidiesGuide.tsx  # 補助指南
│
├── services/               # 服務層
│   ├── apiProxy.ts        # API 代理封裝
│   └── geminiServiceSecure.ts  # Gemini 安全服務
│
├── api-server/            # 後端 API Proxy
│   ├── server.js         # Express 伺服器
│   ├── package.json
│   └── Dockerfile
│
├── App.tsx               # 主應用程式
├── constants.ts          # 常數定義（40 週資料）
├── types.ts             # TypeScript 類型
├── vite.config.ts       # Vite 配置
├── docker-compose.yml   # Docker Compose 配置
├── deploy.sh           # 部署腳本
├── CHANGELOG.md        # 版本歷史
├── SECURITY.md         # 安全性文檔
└── README.md           # 本文件
```

---

## ⚙️ 配置說明

### 環境變數

**`.env` 檔案：**

```env
# Gemini API Key（必填）
GEMINI_API_KEY=your_api_key_here
```

**取得 API Key：**
1. 前往 [Google AI Studio](https://aistudio.google.com/apikey)
2. 點擊「Create API Key」
3. 選擇「Create new project」
4. 複製 API Key

**免費額度：**
- 每日 1,500 次請求
- 每分鐘 15 次請求
- 完全足夠個人使用 ✅

### Docker Compose 配置

**服務架構：**

```yaml
services:
  mommymate:        # 前端 React 應用
  api-proxy:        # 後端 API 代理
```

**Port 對應：**
- 前端：`127.0.0.1:8086:80`
- API：`127.0.0.1:3001:3001`

---

## 🔐 安全性最佳實踐

### ✅ 已實施的安全措施

1. **API Key 保護**
   - 🔒 Key 只存在後端環境變數
   - 🔒 前端完全看不到
   - 🔒 `.gitignore` 排除 `.env`

2. **CORS 保護**
   - 🛡️ 只允許特定網域
   - 🛡️ 拒絕跨域濫用

3. **速率限制**
   - ⏱️ 15 分鐘內最多 50 次請求
   - ⏱️ 防止 DDoS 和濫用

4. **請求日誌**
   - 📊 記錄所有 API 呼叫
   - 📊 便於監控和分析

### 📝 安全檢查清單

**部署前：**
- [ ] 確認 `.env` 不在版本控制中
- [ ] 檢查 API Key 權限設定
- [ ] 驗證 CORS 設定正確
- [ ] 測試速率限制運作

**運行時：**
- [ ] 定期檢查 API 使用量
- [ ] 監控異常請求
- [ ] 定期更新依賴套件

---

## 📊 API 使用量監控

### 查看後端日誌

```bash
# 即時日誌
docker logs -f mommymate_api_proxy

# 最近 50 行
docker logs --tail=50 mommymate_api_proxy

# 搜尋特定內容
docker logs mommymate_api_proxy | grep "POST"
```

### 健康檢查

```bash
# API Proxy 健康狀態
curl http://localhost:3001/health

# 容器狀態
docker ps | grep mommymate
```

---

## 🧪 測試

### 功能測試

1. **本週建議**
   - 點選任一懷孕週數
   - 點「取得 AI 建議」
   - 應顯示詳細建議文字

2. **AI 聊天助手**
   - 點右下角聊天圖示
   - 輸入問題
   - 驗證 AI 回答

3. **語音導覽**
   - 點「生成語音導覽」
   - 驗證語音播放

### 錯誤訊息測試

當 API 額度用完時，應顯示：

```
⚠️ API 使用額度已達上限

您今天的免費額度已用完，請明天再試。
或考慮升級至付費版本以獲得更多額度。
```

---

## 🐛 故障排除

### 問題 1：API Key 無效

**錯誤訊息：**
```
🔐 API 認證失敗
```

**解決方案：**
1. 檢查 `.env` 檔案中的 API Key
2. 確認 Key 未過期
3. 重新建立 Docker 容器

### 問題 2：CORS 錯誤

**錯誤訊息：**
```
Access-Control-Allow-Origin
```

**解決方案：**
1. 檢查 `api-server/server.js` 中的 CORS 設定
2. 確認網域在允許清單中

### 問題 3：容器無法啟動

**解決方案：**
```bash
# 查看詳細錯誤
docker-compose logs

# 重建容器
docker-compose down
docker-compose up -d --build
```

---

## 📈 版本歷史

### v1.3.2 (2026-02-03) - 最新版本
- 🔧 修復 Express proxy 設定
- 🔧 修復 rate limiter 錯誤
- 🔧 調整監聽位址為 0.0.0.0

### v1.3.1 (2026-02-03)
- ✨ 新增友善錯誤訊息
- ✨ 額度用完時顯示明確提示
- ✨ 不同錯誤類型顯示不同圖示

### v1.3.0 (2026-02-03)
- 🔐 **重大更新：API Key 安全保護**
- ✅ 建立後端 API Proxy
- ✅ 前端完全隱藏 API Key
- ✅ CORS 保護
- ✅ 速率限制
- ✅ 請求日誌

### v1.2.0 (2026-02-03)
- ❌ 移除圖片生成功能（需付費）
- ✅ 保留語音導覽
- ✅ 優化 UI

### v1.1.0 (2026-02-03)
- 🎉 初始公開版本
- ✅ 40 週孕期追蹤
- ✅ AI 本週建議
- ✅ AI 聊天助手
- ✅ 營養/購物/預算/補助指南

完整版本歷史請參閱 [CHANGELOG.md](./CHANGELOG.md)

---

## 🤝 貢獻指南

歡迎貢獻！請遵循以下步驟：

1. **Fork 專案**
2. **建立分支** (`git checkout -b feature/AmazingFeature`)
3. **提交變更** (`git commit -m 'Add some AmazingFeature'`)
4. **推送分支** (`git push origin feature/AmazingFeature`)
5. **開啟 Pull Request**

### 開發準則

- 遵循 TypeScript 類型安全
- 保持組件小而專注
- 撰寫清晰的 commit 訊息
- 更新相關文檔

---

## 📄 授權條款

本專案採用 **MIT License** 授權 - 詳見 [LICENSE](./LICENSE) 檔案

**簡單來說：**
- ✅ 可以自由使用、修改、分發
- ✅ 可以用於商業用途
- ⚠️ 需保留版權聲明
- ⚠️ 作者不承擔任何責任

---

## 🙏 致謝

### 技術支援
- [Google AI Studio](https://aistudio.google.com) - Gemini API
- [React](https://reactjs.org) - UI 框架
- [Vite](https://vitejs.dev) - 建構工具
- [Tailwind CSS](https://tailwindcss.com) - 樣式框架

### 靈感來源
感謝所有孕期媽媽的寶貴意見與回饋 ❤️

---

## 📧 聯絡方式

- **網站：** https://showgan.com
- **GitHub：** [@gn01816565](https://github.com/gn01816565)
- **專案：** [mommymate](https://github.com/gn01816565/mommymate)

---

## 🌟 專案狀態

![GitHub stars](https://img.shields.io/github/stars/gn01816565/mommymate?style=social)
![GitHub forks](https://img.shields.io/github/forks/gn01816565/mommymate?style=social)

**目前狀態：** 🟢 活躍開發中

**最後更新：** 2026-02-03

---

**Built with ❤️ for expecting mothers**

*陪伴每一位準媽媽，迎接新生命的到來* 🍼
