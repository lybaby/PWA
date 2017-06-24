var cacheStorageKey = 'minimal-pwa-2';

var cacheList = [
  '/',
  "test.html",
  "app.css",
  "1.jpg"
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      return cache.addAll(cacheList)
    }).then(function() {
      return self.skipWaiting()
    })
  )
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
  
      caches.keys().then(cacheNames => {
        return   Promise.all(cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        }));
      }
    ).then(() => {
      return self.clients.claim()
    }))
});