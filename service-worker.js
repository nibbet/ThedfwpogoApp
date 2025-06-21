self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('dfwfest-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './app.js',
        './tabs.json',
        './tabs/info.md',
        './tabs/day1.md',
        './tabs/day2.md',
        './manifest.json',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});