const CACHE_NAME = "qr-reader-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./js/html5-qrcode.min.js",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png"
];

// Instala o service worker e armazena arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Recupera arquivos do cache ou faz uma nova requisição
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza o cache e remove versões antigas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
