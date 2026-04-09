const CACHE_NAME = 'eventos-madrid-v2';
const CACHE_STATIC = 'eventos-madrid-static-v2';

// ===== ARCHIVOS ESTÁTICOS (nunca cambian) =====
const ARCHIVOS_ESTATICOS = [
    '/eventos-madrid/',
    '/eventos-madrid/index.html',
    '/eventos-madrid/css/style.css',
    '/eventos-madrid/js/app.js',
];

// ===== ARCHIVOS DINÁMICOS (se actualizan) =====
const ARCHIVOS_DINAMICOS = [
    '/eventos-madrid/data/eventos.json',
];

// ===== DOMINIOS EXTERNOS (no cachear — CORS) =====
const DOMINIOS_EXTERNOS = [
    'unpkg.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdnjs.cloudflare.com',
    'tile.openstreetmap.org',
    'calendar.google.com',
    'ticketmaster.com',
    'api-sports.io',
];

function esExterno(url) {
    return DOMINIOS_EXTERNOS.some(dominio => url.includes(dominio));
}

function esSoloOrigen(request) {
    try {
        return new URL(request.url).origin === self.location.origin;
    } catch {
        return false;
    }
}

// ===== INSTALL =====
self.addEventListener('install', evento => {
    console.log('🔧 SW: Instalando v2...');

    evento.waitUntil(
        Promise.all([
            // Cachear estáticos
            caches.open(CACHE_STATIC).then(cache => {
                console.log('📦 SW: Cacheando archivos estáticos');
                return cache.addAll(ARCHIVOS_ESTATICOS);
            }),
            // Pre-cachear eventos.json si está disponible
            caches.open(CACHE_NAME).then(cache => {
                return Promise.all(
                    ARCHIVOS_DINAMICOS.map(url =>
                        fetch(url)
                            .then(res => {
                                if (res.ok) cache.put(url, res);
                            })
                            .catch(() => {
                                console.log('⚠️ SW: No se pudo pre-cachear:', url);
                            })
                    )
                );
            })
        ])
        .then(() => {
            console.log('✅ SW: Instalación completa');
            // skipWaiting DESPUÉS de cachear
            return self.skipWaiting();
        })
        .catch(err => {
            console.error('❌ SW: Error en instalación:', err);
        })
    );
});

// ===== ACTIVATE =====
self.addEventListener('activate', evento => {
    console.log('✅ SW: Activando...');

    evento.waitUntil(
        caches.keys()
            .then(keys => {
                const cachesValidos = [CACHE_NAME, CACHE_STATIC];
                return Promise.all(
                    keys
                        .filter(key => !cachesValidos.includes(key))
                        .map(key => {
                            console.log('🗑️ SW: Eliminando cache antiguo:', key);
                            return caches.delete(key);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// ===== FETCH =====
self.addEventListener('fetch', evento => {
    const { request } = evento;
    const url = request.url;

    // ❌ Ignorar requests que no son GET
    if (request.method !== 'GET') return;

    // ❌ Ignorar dominios externos (CORS)
    if (esExterno(url)) return;

    // ❌ Ignorar si no es del mismo origen
    if (!esSoloOrigen(request)) return;

    // 📊 eventos.json → Network first con fallback a cache
    if (url.includes('/data/eventos.json')) {
        evento.respondWith(estrategiaNetworkFirst(request));
        return;
    }

    // 📄 HTML → Network first (para que siempre esté actualizado)
    if (request.destination === 'document') {
        evento.respondWith(estrategiaNetworkFirst(request));
        return;
    }

    // 🎨 CSS/JS/Iconos → Cache first (cambian poco)
    if (
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'image'
    ) {
        evento.respondWith(estrategiaCacheFirst(request));
        return;
    }

    // 🔄 Resto → Network first
    evento.respondWith(estrategiaNetworkFirst(request));
});

// ===== ESTRATEGIAS =====

/**
 * Network first: intenta red, si falla usa cache.
 * Ideal para datos que cambian (eventos.json, HTML)
 */
async function estrategiaNetworkFirst(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        // Timeout de 5 segundos para no bloquear
        const response = await Promise.race([
            fetch(request),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), 5000)
            )
        ]);

        if (response && response.ok) {
            // Actualizar cache con la respuesta nueva
            cache.put(request, response.clone());
            return response;
        }

        // Respuesta no OK → intentar cache
        throw new Error(`HTTP ${response.status}`);

    } catch (error) {
        console.log(`⚠️ SW: Red falló (${error.message}), usando cache:`,
            request.url.split('/').pop());

        const cached = await cache.match(request);
        if (cached) return cached;

        // Último recurso: página principal
        if (request.destination === 'document') {
            const home = await caches.match('/eventos-madrid/');
            if (home) return home;
        }

        // Sin red y sin cache → respuesta de error
        return new Response(
            JSON.stringify({
                error: 'Sin conexión',
                mensaje: 'No hay eventos en cache'
            }),
            {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

/**
 * Cache first: usa cache si existe, si no va a la red.
 * Ideal para estáticos (CSS, JS, imágenes)
 */
async function estrategiaCacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response && response.ok) {
            const cache = await caches.open(CACHE_STATIC);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.log('⚠️ SW: Sin cache y sin red para:', request.url);
        return new Response('', { status: 408 });
    }
}

// ===== MENSAJE DESDE LA APP =====
// Permite forzar actualización desde app.js:
// navigator.serviceWorker.controller.postMessage({ tipo: 'SKIP_WAITING' })
self.addEventListener('message', evento => {
    if (evento.data?.tipo === 'SKIP_WAITING') {
        console.log('🔄 SW: Actualización forzada');
        self.skipWaiting();
    }
});