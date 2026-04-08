const CACHE_NAME = 'eventos-madrid-v1';

// Archivos que se cachean al instalar
const ARCHIVOS_CACHE = [
    '/eventos-madrid/',
    '/eventos-madrid/index.html',
    '/eventos-madrid/css/style.css',
    '/eventos-madrid/js/app.js',
    '/eventos-madrid/data/eventos.json'
];

// Instalar service worker y cachear archivos
self.addEventListener('install', evento => {
    console.log('🔧 SW: Instalando...');
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 SW: Cacheando archivos');
                return cache.addAll(ARCHIVOS_CACHE);
            })
            .catch(err => console.log('⚠️ SW: Error cacheando:', err))
    );
    self.skipWaiting();
});

// Activar y limpiar caches antiguos
self.addEventListener('activate', evento => {
    console.log('✅ SW: Activado');
    evento.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => {
                        console.log('🗑️ SW: Eliminando cache antiguo:', key);
                        return caches.delete(key);
                    })
            );
        })
    );
    self.clients.claim();
});

// Interceptar requests
self.addEventListener('fetch', evento => {
    // Estrategia: Network first, cache fallback
    evento.respondWith(
        fetch(evento.request)
            .then(response => {
                // Si la red funciona, actualizar cache
                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(evento.request, responseClone);
                });
                return response;
            })
            .catch(() => {
                // Si no hay red, usar cache
                return caches.match(evento.request)
                    .then(response => {
                        if (response) {
                            console.log('📦 SW: Sirviendo desde cache:', evento.request.url);
                            return response;
                        }
                        // Si no hay cache, mostrar página offline
                        if (evento.request.destination === 'document') {
                            return caches.match('/eventos-madrid/');
                        }
                    });
            })
    );
});