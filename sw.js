/**
 * VibroClock - Service Worker
 * Enables PWA installation and offline application caching.
 */

const CACHE_NAME = 'vibroclock-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './src/style.css',
  './src/app.js',
  './manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
