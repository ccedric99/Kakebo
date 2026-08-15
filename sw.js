/* Kakebo-Planer — Service Worker
   Strategie: die App-Hülle liegt im Cache und wird zuerst ausgeliefert.
   Dadurch startet die App ohne Netz. Im Hintergrund wird still aktualisiert.
   Nutzerdaten liegen nicht hier, sondern in localStorage. */

const VERSION = 'kakebo-v4';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // Das Dokument selbst: erst das Netz, dann der Zwischenspeicher.
  // Damit ist eine neue Fassung sofort beim ersten Start da, sobald das Gerät
  // online ist. Ohne Netz greift der letzte gespeicherte Stand — die App
  // startet also weiterhin im Flugmodus.
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put('./index.html', copy));
        }
        return res;
      }).catch(() => caches.match('./index.html', { ignoreSearch: true })
                       .then(hit => hit || caches.match('./')))
    );
    return;
  }

  // Alles Übrige (Icons, Manifest): erst Zwischenspeicher, still auffrischen.
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
