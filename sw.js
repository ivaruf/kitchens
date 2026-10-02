// Kitchens service worker: a versioned precache, so a recipe still opens on a
// tablet in a kitchen with bad wifi, and a deploy never lands mid-cook.
//
// UPDATE MODEL ("opt-in", hub CLAUDE.md §3). Bump VERSION on every committed
// batch that deploys. The page registers with { updateViaCache: 'none' } and
// calls reg.update() at launch; the new worker precaches the list below and
// then WAITS. js/update.js shows the button on the home screen, and only that
// tap posts SKIP_WAITING — #home is hidden for the whole of a cook, so the
// control does not exist while a dish is on the stove.
//
// GET_VERSION lets the page print which build is actually serving it.
//
// The cache name carries the slug, and the cleanup deletes only names that
// carry it: every game here shares one origin and so one CacheStorage, and a
// sloppy filter evicts a neighbour's offline copy.

const VERSION = 'v0.8.0'; // don't have it? stand-ins on every ingredient's card
const CACHE = `kitchens-${VERSION}`;

// Every shipped file. A file missing here works online and vanishes offline;
// a file listed but not deployed fails the install outright.
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/main.js',
  './js/update.js',
  './js/screen.js',
  './js/store.js',
  './js/pantry.js',
  './js/recipes.js',
  './js/art.js',
  './js/cookalong.js',
  './js/kitchens.js',
  './js/vietnam.js',
  './js/i18n.js',
  './js/sets.js',
  './js/swaps/greek.js',
  './js/swaps/vietnam.js',
  './js/nb.js',
  './js/nb/greek-pantry.js',
  './js/nb/greek-recipes-1.js',
  './js/nb/greek-recipes-2.js',
  './js/nb/vietnam.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icons/icon-maskable-512.png',
];

self.addEventListener('install', (event) => {
  // No skipWaiting() here: the new worker waits for the player's tap.
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('message', (event) => {
  const msg = event.data || {};
  if (msg.type === 'SKIP_WAITING') self.skipWaiting();
  if (msg.type === 'GET_VERSION' && event.ports[0]) event.ports[0].postMessage({ version: VERSION });
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          // 'kitchens-' only. Every other game's cache on this origin is theirs.
          keys.filter((k) => k.startsWith('kitchens-') && k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  // Cache-first out of one versioned precache, so every module in a session
  // comes from one deploy.
  event.respondWith(
    caches.match(request, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(request)
        .then((res) => {
          if (res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
        .catch(() => (request.mode === 'navigate' ? caches.match('./index.html') : undefined));
    }),
  );
});
