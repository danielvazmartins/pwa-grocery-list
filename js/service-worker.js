let cacheName = 'pwa-grocery-list-v.2.0.2';
let filesToCache = [
    './',
    '/index.html',
    '/js/main.js',
    '/js/service-worker.js',
    '/js/lib/jquery-3.2.1.min.js',
    '/js/lib/materialize.min.js',
    '/css/materialize.min.css',
    '/fonts/roboto/Roboto-Regular.woff2',
    '/fonts/roboto/*'
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