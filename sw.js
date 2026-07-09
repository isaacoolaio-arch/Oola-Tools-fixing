const CACHE = 'toolfix-v12';
const ASSETS = [
  './', './index.html', './data.js', './manifest.json',
  './img/drill.webp', './img/drill-plate.webp',
  './img/grinder-disc.webp', './img/grinder-plate.webp',
  './img/welder.webp',
  './img/disc-label.webp',
  './sketches.js'
];

self.addEventListener('install', e => {
  // addAll() is atomic — one bad asset kills the whole precache and with it
  // the offline mode. Cache each asset independently instead.
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first for HTML (so updates land), cache-first for everything else.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isHTML = e.request.mode === 'navigate' ||
                 e.request.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const copy = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return r;
        })
        .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }))
    );
  }
});
