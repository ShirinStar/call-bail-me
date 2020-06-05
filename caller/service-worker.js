const cacheName = 'cache-v1';
console.log('yay');
const precacheResources = [
  '/',
  'index.html',
  'style.css',
  'https://draketalley.com/caller/manifest.json'
];

self.addEventListener('install', event => {
  console.log('service worker installed');
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(precacheResources)));
});

self.addEventListener('activate', ev => {
  console.log('service worker active');
});

self.addEventListener('fetch', ev => {
  console.log('fetch intercepted for: ', ev.request.url);
  ev.respondWith(caches.match(ev.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(ev.request);
    }));
});
