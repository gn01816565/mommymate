#!/bin/bash
# MommyMate 快速部署腳本

echo "🚀 MommyMate 部署開始..."
echo ""

# 檢查 .env 檔案
if [ ! -f ".env" ]; then
    echo "⚠️  警告：.env 檔案不存在！"
    echo "請建立 .env 檔案並設定 GEMINI_API_KEY"
    exit 1
fi

# 檢查 API Key 是否設定
if ! grep -q "GEMINI_API_KEY=AIza" .env; then
    echo "⚠️  警告：GEMINI_API_KEY 未設定或格式不正確"
    echo "請在 .env 檔案中設定有效的 API Key"
    exit 1
fi

echo "✅ .env 檔案檢查通過"
echo ""

# 同步到建立目錄
echo "📦 同步檔案到建立目錄..."
cp -r . ~/tmp/mommymate-build/
echo "✅ 檔案同步完成"
echo ""

# 切換到建立目錄
cd ~/tmp/mommymate-build

# 停止舊容器
echo "🛑 停止舊容器..."
docker-compose down

# 重新建立映像
echo "🔨 建立新映像（無快取）..."
docker-compose build --no-cache

# 啟動容器
echo "🚀 啟動容器..."
docker-compose up -d

# 等待容器啟動
echo "⏳ 等待容器啟動..."
sleep 5

# 檢查容器狀態
if docker ps | grep -q mommymate_app; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "🌐 網址：https://showgan.com/mommymate/"
    echo "🐳 容器：mommymate_app"
    echo "📊 檢查狀態：docker ps | grep mommymate"
    echo ""
else
    echo ""
    echo "❌ 部署失敗！容器未啟動"
    echo "檢查日誌：docker logs mommymate_app"
    exit 1
fi
