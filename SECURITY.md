# 🔐 MommyMate 安全性改進

## v1.3.0 - API Key 保護

### ⚠️ 發現的問題

**v1.2.0 及之前版本：**
- ❌ API Key 直接編譯到前端 JavaScript
- ❌ 任何人打開開發者工具都能看到
- ❌ 可以被複製和濫用

### ✅ 解決方案

**v1.3.0 架構：**

```
前端 React (https://showgan.com/mommymate/)
    ↓
Nginx 反向代理 (/mommymate/api/)
    ↓
後端 API Proxy (Node.js Express - Port 3001)
    ↓
Gemini API (使用 API Key)
```

**安全特性：**
1. ✅ **API Key 完全隱藏**
   - 只存在後端環境變數
   - 前端完全看不到

2. ✅ **CORS 保護**
   - 只允許 showgan.com 來源
   - 拒絕其他網站呼叫

3. ✅ **速率限制**
   - 15 分鐘內最多 50 次請求
   - 防止 DDoS 和濫用

4. ✅ **請求日誌**
   - 記錄所有 API 呼叫
   - 便於監控和分析

## 📊 架構圖

### 之前（不安全）
```
使用者 → React App (含 API Key) → Gemini API
              ↑
         可以看到 Key
```

### 現在（安全）
```
使用者 → React App (無 Key)
              ↓
         Nginx Proxy
              ↓
         API Server (有 Key)
              ↓
         Gemini API
```

## 🔧 技術實作

### 1. 後端 API Proxy

**檔案：** `api-server/server.js`

**功能：**
- Express.js 伺服器
- CORS 限制來源
- 速率限制（express-rate-limit）
- 統一轉發 Gemini API 請求

### 2. Nginx 路由配置

**位置：** `/Volumes/Crucial X9/docker/showgan/nginx.conf`

```nginx
location ^~ /mommymate/api/ {
    proxy_pass http://host.docker.internal:3001/api/;
    ...
}
```

### 3. 前端安全服務

**檔案：**
- `services/apiProxy.ts` - API 呼叫封裝
- `services/geminiServiceSecure.ts` - 安全版 Gemini 服務

**改動：**
- 移除 `process.env.API_KEY`
- 改為呼叫 `/mommymate/api/gemini`
- 由後端處理認證

## 🚀 部署步驟

### 1. 啟動 API Proxy

```bash
cd /Volumes/Crucial\ X9/docker/mommymate
docker-compose up -d api-proxy
```

### 2. 重啟 Nginx

```bash
cd /Volumes/Crucial\ X9/docker/showgan
docker-compose restart nginx
```

### 3. 重新建立前端

```bash
cd /Volumes/Crucial\ X9/docker/mommymate
./deploy.sh
```

## 📈 監控

### 檢查 API Proxy 狀態

```bash
curl http://localhost:3001/health
```

### 查看日誌

```bash
docker logs mommymate_api_proxy
```

## 🔐 額外安全建議

### 1. API Key 限制（建議設定）

前往：https://aistudio.google.com/apikey

- **HTTP referrers:** `showgan.com/*`
- **API restrictions:** 只啟用 Generative Language API
- **Quota limits:** 100 requests/day

### 2. 定期更換 API Key

建議每 3-6 個月更換一次

### 3. 監控使用量

定期檢查 Google Cloud Console 的 API 使用量

## 📝 更新記錄

- **2026-02-03 v1.3.0** - 實作後端 API Proxy，完全隱藏 API Key
- **2026-02-03 v1.2.0** - 移除圖片生成，優化語音功能
- **2026-02-03 v1.1.0** - 初始版本，API Key 暴露問題

---

**安全性等級：** 🟢 安全（從 🔴 高風險 提升）
