// Service worker per la PWA PREMIERE.
//
// Strategia "network-first": ogni volta che l'app si apre (anche dalla
// schermata Home), prova PRIMA a scaricare la versione più recente dei
// file dal server. Solo se non c'è connessione (es. modalità offline),
// usa la copia salvata in cache come riserva.
//
// Questo evita il problema per cui l'app installata mostrava sempre una
// versione vecchia, anche dopo aver pubblicato aggiornamenti: con la
// vecchia strategia "cache-first", la cache veniva controllata prima
// della rete e quindi "vinceva" sempre lei.
//
// IMPORTANTE: ad ogni nuovo aggiornamento pubblicato, cambia il numero
// di versione qui sotto (es. da v2 a v3). Questo costringe i telefoni che
// hanno già installato l'app a scaricare la cache fresca, invece di
// restare bloccati su una versione vecchia anche in caso di problemi di
// rete temporanei.
const CACHE_NAME = "premiere-v4";
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
  // Prende immediatamente il controllo delle pagine già aperte, senza
  // aspettare che vengano chiuse e riaperte.
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Le chiamate API (al backend) non passano mai dalla cache: devono
  // sempre essere fresche in tempo reale.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Network-first: prova prima la rete. Se risponde, aggiorna anche la
  // cache con la versione fresca (così l'eventuale fallback offline futuro
  // è il più aggiornato possibile). Se la rete non risponde, usa la cache.
  event.respondWith(
    fetch(event.request)
      .then((rispostaRete) => {
        const copiaPerCache = rispostaRete.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copiaPerCache));
        return rispostaRete;
      })
      .catch(() => caches.match(event.request))
  );
});
