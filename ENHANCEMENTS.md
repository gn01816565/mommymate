# MommyMate 功能增強計畫 🚀

> 深色模式、多語言支援、PWA - 已準備好檔案，等待整合

---

## ✅ 已準備的檔案

### 1. 深色模式
- ✅ `hooks/useDarkMode.ts` - 深色模式 Hook
- ⏳ 待整合到 `App.tsx`

**使用方式：**
```typescript
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDark ? '☀️ 淺色' : '🌙 深色'}
    </button>
  );
}
```

**Tailwind 設定：**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // 啟用 class 模式
  // ...
}
```

**CSS 類別：**
```html
<div class="bg-white dark:bg-gray-900">
  <h1 class="text-gray-900 dark:text-white">標題</h1>
</div>
```

---

### 2. 多語言支援
- ✅ `i18n/translations.ts` - 翻譯檔案（繁中 + 英文）
- ✅ `hooks/useLanguage.ts` - 語言切換 Hook
- ⏳ 待整合到組件

**使用方式：**
```typescript
import { useLanguage } from './hooks/useLanguage';

function Component() {
  const { t, language, switchLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <button onClick={() => switchLanguage('en-US')}>
        {language === 'zh-TW' ? 'English' : '中文'}
      </button>
    </div>
  );
}
```

**已翻譯內容：**
- 應用程式標題和副標題
- 導航選單
- 時間軸介面
- AI 建議
- 語音導覽
- 聊天介面
- 錯誤訊息

---

### 3. PWA 支援
- ✅ `public/manifest.json` - PWA Manifest
- ✅ `public/sw.js` - Service Worker
- ⏳ 待在 `index.html` 註冊

**註冊 Service Worker：**

在 `index.html` 中加入：
```html
<head>
  <link rel="manifest" href="/mommymate/manifest.json">
  <meta name="theme-color" content="#ec4899">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="MommyMate">
</head>
<body>
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/mommymate/sw.js')
          .then(reg => console.log('SW registered:', reg))
          .catch(err => console.log('SW error:', err));
      });
    }
  </script>
</body>
```

**需要的圖示：**
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `icon-chat.png` (96x96)
- `icon-timeline.png` (96x96)

---

## 🔧 整合步驟

### 步驟 1：安裝 Tailwind Dark Mode（如需要）

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

編輯 `tailwind.config.js`：
```javascript
module.exports = {
  content: ["./**/*.{html,tsx,ts}"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 步驟 2：更新 App.tsx

```typescript
import { useDarkMode } from './hooks/useDarkMode';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { t, language, switchLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* 設定按鈕 */}
      <div className="settings">
        <button onClick={toggleDarkMode}>
          {isDark ? '☀️' : '🌙'}
        </button>
        <button onClick={() => switchLanguage(language === 'zh-TW' ? 'en-US' : 'zh-TW')}>
          {language === 'zh-TW' ? '🇺🇸 EN' : '🇹🇼 中'}
        </button>
      </div>

      {/* 原有內容，使用 t() 翻譯 */}
      <h1>{t('app.title')}</h1>
      <p>{t('app.subtitle')}</p>
    </div>
  );
}
```

### 步驟 3：更新組件使用翻譯

在每個組件中：
```typescript
import { useLanguage } from '../hooks/useLanguage';

function Timeline() {
  const { t } = useLanguage();
  
  return (
    <div>
      <label>{t('timeline.selectWeek')}</label>
    </div>
  );
}
```

### 步驟 4：產生 PWA 圖示

可以使用線上工具：
- https://www.pwabuilder.com/imageGenerator
- 上傳 logo
- 生成所需尺寸

---

## 📋 整合檢查清單

### 深色模式
- [ ] 設定 Tailwind `darkMode: 'class'`
- [ ] 在 App.tsx 整合 `useDarkMode`
- [ ] 加入切換按鈕
- [ ] 測試所有組件的深色樣式
- [ ] 加入過渡動畫

### 多語言
- [ ] 在 App.tsx 整合 `useLanguage`
- [ ] 加入語言切換按鈕
- [ ] 更新所有組件使用 `t()`
- [ ] 測試繁中/英文切換
- [ ] 更新錯誤訊息

### PWA
- [ ] 在 `index.html` 註冊 Service Worker
- [ ] 產生所需圖示
- [ ] 測試離線功能
- [ ] 測試安裝到主畫面
- [ ] 測試 iOS Safari

---

## 🧪 測試計畫

### 深色模式測試
- [ ] 切換深色/淺色模式
- [ ] 檢查所有頁面顏色對比
- [ ] 測試系統偏好自動切換
- [ ] 測試本地儲存持久化

### 多語言測試
- [ ] 切換繁中/英文
- [ ] 檢查所有介面翻譯
- [ ] 測試錯誤訊息翻譯
- [ ] 測試瀏覽器語言自動偵測

### PWA 測試
- [ ] Chrome：安裝到桌面
- [ ] iOS Safari：加入主畫面
- [ ] Android：安裝 PWA
- [ ] 測試離線載入
- [ ] 測試快取更新

---

## 📝 後續改進

### 深色模式增強
- 加入自動切換（日落/日出）
- 平滑過渡動畫
- 個別組件顏色微調

### 多語言增強
- 加入更多語言（日文、韓文、英文）
- 動態載入翻譯檔案
- 翻譯編輯介面

### PWA 增強
- 推送通知（孕期提醒）
- 背景同步
- 離線儲存孕期資料
- Share Target API

---

## 💡 實作建議

### 優先順序
1. **深色模式** - 最簡單，效果最明顯
2. **多語言** - 中等複雜度，擴大使用者群
3. **PWA** - 較複雜，提升使用體驗

### 時間估計
- 深色模式：2-3 小時
- 多語言：3-4 小時
- PWA：2-3 小時
- **總計：7-10 小時**

### 分階段部署
**v1.4.0** - 深色模式  
**v1.5.0** - 多語言支援  
**v1.6.0** - PWA 支援

---

**所有基礎檔案已準備好，隨時可以開始整合！** 🚀
