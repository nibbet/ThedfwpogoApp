self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pogo-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/news.md',
        '/events.md',
        '/rewards.md',
        'https://cdn.jsdelivr.net/npm/marked/marked.min.js'
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