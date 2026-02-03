// MommyMate API Proxy Server
// 隱藏 Gemini API Key，防止前端暴露

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = 3001;

// 信任 Nginx 代理
app.set('trust proxy', 1);

// CORS 限制：只允許你的網站
const corsOptions = {
  origin: [
    'https://showgan.com',
    'http://localhost:3000',
    'http://192.168.50.86:8086'
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// 速率限制：防止濫用
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分鐘
  max: 50, // 最多 50 次請求
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);

// API Key 檢查
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in .env file');
  process.exit(1);
}

// Proxy endpoint
app.post('/api/gemini', async (req, res) => {
  try {
    const { endpoint, method = 'POST', body } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint is required' });
    }

    // 構建完整 URL（加入 API Key）
    const url = `${endpoint}?key=${GEMINI_API_KEY}`;

    console.log(`[${new Date().toISOString()}] ${method} ${endpoint}`);

    // 轉發請求到 Gemini API
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!GEMINI_API_KEY
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ MommyMate API Proxy running on http://0.0.0.0:${PORT}`);
  console.log(`🔐 API Key: ${GEMINI_API_KEY.substring(0, 10)}...`);
});
