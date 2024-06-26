var CACHE_VERSION = 'v1';
var CACHE_FILES = [
    'index.html',
    'style.css',
    'cherry.jpg',
    'lightgold.jpg'
];

self.addEventListener('install', event => {
    console.log('Service Worker installed');
    event.waitUntil(
        caches
        .open(CACHE_VERSION)
        .then(cache => {
            console.log('Service Worker caching files');
            cache.addAll(CACHE_FILES)
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated');
    event.waitUntil(
        caches.keys().then(keyNames => {
            return Promise.all(
                keyNames.map(key => {
                    if(key !== CACHE_VERSION) {
                        console.log('Service Worker clearing old caches');
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('Service Worker fetching');
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
