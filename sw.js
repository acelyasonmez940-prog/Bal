const CACHE_NAME = "bal-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/first.html",
  "/menu.html",
  "/letter.html",
  "/mood.html",
  "/photos.html",
  "/surprise.html",
  "/style.css",
  "/manifest.json",
  "/8F7DB8E2-7BE0-4218-9B37-461D76A1C620.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
