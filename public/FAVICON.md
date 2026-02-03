# Favicon 生成指南

## ✅ 目前狀態

已創建 SVG favicon (`favicon.svg`)，支援所有現代瀏覽器。

## 📱 如需生成 PNG 版本

### 選項 1：線上工具（推薦）

1. 前往 https://realfavicongenerator.net/
2. 上傳 `public/favicon.svg`
3. 下載生成的 favicon 套件
4. 解壓並放到 `public/` 資料夾

### 選項 2：使用 Node.js 工具

```bash
npm install -g sharp-cli

# 生成 32x32
sharp -i public/favicon.svg -o public/favicon-32.png resize 32 32

# 生成 16x16  
sharp -i public/favicon.svg -o public/favicon-16.png resize 16 16

# 生成 Apple Touch Icon (180x180)
sharp -i public/favicon.svg -o public/apple-touch-icon.png resize 180 180
```

### 選項 3：使用 ImageMagick

```bash
brew install imagemagick librsvg

# 生成各種尺寸
convert public/favicon.svg -resize 32x32 public/favicon-32.png
convert public/favicon.svg -resize 16x16 public/favicon-16.png
convert public/favicon.svg -resize 180x180 public/apple-touch-icon.png
```

## 🎨 當前 Favicon 設計

- **顏色：** 粉紅色漸層 (#ec4899 → #f472b6)
- **圖案：** 愛心 + 星星裝飾
- **風格：** 簡約、溫暖

## 📝 更新後記得

如果生成了 PNG 版本，更新 `index.html`：

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

## 💡 注意

目前使用 SVG 已經足夠！Chrome、Firefox、Safari、Edge 都支援 SVG favicon。
