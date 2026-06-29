const CACHE = "vx-link-helper-app-v7-20260630-bottom-fill-version";
const ASSETS = [
  "./", "./index.html", "./styles.css?v=20260630-bottom-fill-version", "./app.js?v=20260630-bottom-fill-version", "./manifest.webmanifest?v=20260630-bottom-fill-version",
  "./icons/icon-192.png?v=20260630-bottom-fill-version", "./icons/icon-512.png", "./icons/maskable-192.png", "./icons/maskable-512.png", "../icon128.png"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request)));
});
