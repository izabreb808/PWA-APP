const CACHE_NAME = "bookfinder-cache-v1";

const FILES_TO_CACHE = [
  "home.html",
  "book.html",
  "toRead.html",
  "login.html",
  "offline.html",
  "manifest.json",
  "../style.css",
  "../backend/search.js",
  "../backend/book.js",
  "../backend/indexedDB.js",
  "../backend/toRead.js",
  "../icons/icon.png",
  "../icons/book.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => {
        return caches.match("offline.html");
      });
    })
  );
});

