const CACHE_NAME = 'selfdev-rpg-v5';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    if (cached) return cached;
    try {
      const resp = await fetch(e.request);
      const cache = await caches.open(CACHE_NAME);
      if (e.request.method === 'GET' && resp && resp.status === 200) {
        cache.put(e.request, resp.clone());
      }
      return resp;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});