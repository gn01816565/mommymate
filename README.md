# MommyMate - 孕期旅程指南 🤰

AI 驅動的懷孕管理應用，提供個人化的孕期建議和支援。

## ✨ 功能

- **🗓️ 孕期時間軸** - 追蹤懷孕週數和重要里程碑
- **💬 AI 聊天助手** - 由 Google Gemini 提供支援的即時問答
- **🍎 營養指南** - 孕期飲食建議和營養資訊
- **🛒 購物清單** - 孕期必備物品清單
- **💰 預算規劃** - 懷孕和育兒費用規劃
- **🏥 補助指南** - 台灣孕婦補助和福利資訊

## 🚀 技術棧

- **前端：** React 19 + TypeScript + Vite
- **UI：** Tailwind CSS (預設樣式)
- **AI：** Google Gemini API
- **渲染：** React Markdown

## 📦 本地開發

### 前置需求
- Node.js 20+
- Gemini API Key

### 安裝步驟

1. 安裝依賴：
```bash
npm install
```

2. 設定環境變數（`.env.local`）：
```env
GEMINI_API_KEY=your_api_key_here
```

3. 啟動開發伺服器：
```bash
npm run dev
```

4. 瀏覽 `http://localhost:5173`

## 🐳 Docker 部署

### 建立映像
```bash
docker build -t mommymate .
```

### 執行容器
```bash
docker run -p 80:80 mommymate
```

## 🌐 生產部署

應用已部署在：
- **URL：** https://showgan.com/mommymate/
- **基礎設施：** Docker + Nginx + Let's Encrypt

### 部署架構
```
Internet → Nginx (443) → mommymate:80 (Container)
```

## 📝 專案結構

```
mommymate/
├── components/           # React 組件
│   ├── Timeline.tsx     # 時間軸
│   ├── ChatWidget.tsx   # 聊天助手
│   ├── NutritionGuide.tsx
│   ├── ShoppingList.tsx
│   ├── BudgetGuide.tsx
│   ├── SubsidiesGuide.tsx
│   └── DetailView.tsx
├── services/            # API 服務
├── App.tsx             # 主應用
├── constants.ts        # 常數定義
├── types.ts           # TypeScript 類型
├── Dockerfile         # Docker 配置
└── package.json       # 依賴管理
```

## 🔐 環境變數

| 變數 | 說明 | 必填 |
|------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 金鑰 | ✅ |

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

## 🙏 致謝

- Google AI Studio
- React 團隊
- Vite 團隊

---

**Built with ❤️ for expecting mothers**
