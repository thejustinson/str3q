const CACHE_NAME = 'str3q-cache-v1';

self.addEventListener('install', (event) => {
  // Forces the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Tell the active service worker to take control of the page immediately.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // A minimal fetch handler. 
  // For a basic PWA, we attempt to fetch from the network.
  // If the network is offline, we can provide a fallback, 
  // but strictly parsing the request enables "Add to Home Screen" installation.
  event.respondWith(
    fetch(event.request).catch((error) => {
        // Here you could serve a cached offline.html file in the future
        console.warn("Network request failed, user might be offline.", error);
    })
  );
});
