// Service Worker for PWA
const CACHE_NAME = 'mommymate-v1.5.1';
const urlsToCache = [
  './',
  './index.html',
  './favicon.svg'
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// 啟用 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 攔截請求
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // 只處理 http/https 請求
  if (!url.startsWith('http')) {
    return;
  }
  
  // 只快取 GET 請求
  if (event.request.method !== 'GET') {
    return;
  }

  // API 請求不快取
  if (url.includes('/api/')) {
    return;
  }

  // Network First 策略（優先使用網路）
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 檢查是否為有效回應
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 複製回應並快取
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          })
          .catch((err) => {
            // 忽略快取錯誤（例如 chrome-extension）
            console.log('Cache put failed:', err.message);
          });

        return response;
      })
      .catch(() => {
        // 網路失敗時使用快取
        return caches.match(event.request);
      })
  );
});
