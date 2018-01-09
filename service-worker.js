let cacheName = 'pwa-grocery-list-v.1.0.5';
let filesToCache = [
    './',
    './index.html',
    './js/main.js',
    './service-worker.js',
    './js/lib/jquery-3.2.1.min.js',
    './js/lib/materialize.min.js',
    './css/materialize.min.css',
    './fonts/roboto/Roboto-Regular.woff2',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v33/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Installer');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {            
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});