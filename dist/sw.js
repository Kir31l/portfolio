var CACHE = 'portfolio-v3';
var SHELL = '/index.html';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.add(SHELL);
    })
  );
});

self.addEventListener('fetch', function(e) {
  // For navigation requests, serve the shell (SPA)
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(function() {
        return caches.match(SHELL);
      })
    );
    return;
  }

  // For all other requests: network-first, fallback to cache
  e.respondWith(
    fetch(e.request)
      .then(function(res) {
        return caches.open(CACHE).then(function(cache) {
          cache.put(e.request, res.clone());
          return res;
        });
      })
      .catch(function() {
        return caches.match(e.request);
      })
  );
});
