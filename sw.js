var CACHE = 'portfolio-v2';

var urls = [
  './',
  'index.html',
  'css/style.css',
  'js/effects.js',
  'favicon.svg',
  'html/certificates.html',
  'html/shuttle.html',
  'html/dimple.html',
  'html/retrievals.html',
  'html/sort.html'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(urls);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        return caches.open(CACHE).then(function(cache) {
          cache.put(e.request, res.clone());
          return res;
        });
      });
    })
  );
});
