// Service worker minimale: permette l'installazione come PWA
// e mette in cache i file statici dell'app (non i dati, che restano
// sempre aggiornati dal server ad ogni richiesta).

const CACHE_NAME = "premiere-v1";
const FILES_DA_CACHARE = [
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_DA_CACHARE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomi) =>
      Promise.all(nomi.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Le chiamate API (al backend) non vanno mai in cache: devono sempre
  // essere fresche. Solo i file statici dell'app usano la cache.
  if (url.origin !== self.location.origin) {
    return; // lascia passare la richiesta direttamente alla rete
  }

  event.respondWith(
    caches.match(event.request).then((rispostaCache) => {
      return rispostaCache || fetch(event.request);
    })
  );
});
