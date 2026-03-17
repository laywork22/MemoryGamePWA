const CACHE_NAME = "memory-game-score-v2";

//fase installazione
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: sto salvando i file in cache...")
            return cache.addAll([
                "/",
                "/index.html",
                "/css/style.css",
                "/js/memory_game.js",
                "/manifest.json",
                "/icon.png"
            ]);
        })
    );
});

//fase fetch(intercettiamo le richieste)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((rispostaSalvata) => {
            if (rispostaSalvata) {
                return rispostaSalvata;
            }

            return fetch(event.request);
        })
    )
})