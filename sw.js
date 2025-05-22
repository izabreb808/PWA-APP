const CACHE_NAME = "bookfinder-cache-v1";
const OFFLINE_URL = "offline.html";

const FILES_TO_CACHE = [
  "frontend/home.html",
  "frontend/book.html",
  "frontend/toRead.html",
  "frontend/login.html",
  "style.css",
  "backend/search.js",
  "backend/book.js",
  "backend/favorites.js",
  "backend/db.js",
  "icons/icon.png",
  "icons/book.png",
  "manifest.json",
  OFFLINE_URL
];

// Install SW and cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate SW and clean up old caches
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

// Fetch handler
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Dla HTML fallback offline
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});
