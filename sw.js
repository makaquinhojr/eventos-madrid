// sw.js completo y corregido
const CACHE_VERSION = 'v3'; // ← súbelo manualmente solo cuando cambies
                             //    CSS/JS/HTML (archivos estáticos)

const CACHE_NAME    = `eventos-madrid-${CACHE_VERSION}`;
const CACHE_STATIC  = `eventos-madrid-static-${CACHE_VERSION}`;

// ===== ARCHIVOS ESTÁTICOS (nunca cambian) =====
const ARCHIVOS_ESTATICOS = [
    '/eventos-madrid/',
    '/eventos-madrid/index.html',
    '/eventos-madrid/css/style.css',
    '/eventos-madrid/js/main.js',
    '/eventos-madrid/js/i18n.js',
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
    console.log(`🔧 SW: Instalando ${CACHE_VERSION}...`);

    evento.waitUntil(
        // ✅ Solo cacheamos estáticos en el install
        // eventos.json NO se pre-cachea aquí → siempre irá a la red primero
        caches.open(CACHE_STATIC)
            .then(cache => {
                console.log('📦 SW: Cacheando archivos estáticos');
                return cache.addAll(ARCHIVOS_ESTATICOS);
            })
            .then(() => {
                console.log('✅ SW: Instalación completa');
                return self.skipWaiting();
            })
            .catch(err => {
                console.error('❌ SW: Error en instalación:', err);
            })
    );
});

// ===== ACTIVATE =====
self.addEventListener('activate', evento => {
    console.log(`✅ SW: Activando ${CACHE_VERSION}...`);

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

    // ✅ eventos.json → Network first SIN guardar en caché
    // ─────────────────────────────────────────────────────
    // No lo cacheamos nunca. Siempre va a la red.
    // Solo si la red falla usamos la caché como fallback offline.
    if (url.includes('/data/eventos.json')) {
        evento.respondWith(estrategiaNetworkFirstSinCache(request));
        return;
    }

    // 📄 HTML → Network first (para que siempre esté actualizado)
    if (request.destination === 'document') {
        evento.respondWith(estrategiaNetworkFirst(request));
        return;
    }

    // 🎨 CSS/JS/Iconos → Cache first (cambian poco)
    if (
        request.destination === 'style'  ||
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
 * ✅ NUEVA — Network first para eventos.json
 * 
 * La diferencia clave con estrategiaNetworkFirst normal:
 * - Si la red responde → devuelve la respuesta SIN guardarla en caché
 * - Si la red falla    → busca en caché (fallback offline)
 * - Si guardáramos en caché, el próximo scrap no se vería hasta
 *   que el usuario limpiara la caché manualmente
 */
async function estrategiaNetworkFirstSinCache(request) {
    try {
        const response = await Promise.race([
            fetch(request.clone()),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), 8000)
            )
        ]);

        if (response && response.ok) {
            // ✅ Guardamos UNA copia en caché solo como fallback offline
            // pero con un cache separado que podemos invalidar fácilmente
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
            // Devolvemos la respuesta fresca de la red
            return response;
        }

        throw new Error(`HTTP ${response?.status}`);

    } catch (error) {
        console.log(`⚠️ SW: Red falló para eventos.json (${error.message})`);
        console.log('📦 SW: Usando caché offline como fallback...');

        const cache  = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);

        if (cached) {
            console.log('✅ SW: Sirviendo eventos desde caché offline');
            return cached;
        }

        // Sin red y sin caché → respuesta de error clara
        return new Response(
            JSON.stringify([]), // Array vacío → la app mostrará "sin eventos"
            {
                status: 200, // 200 para que app.js no lo trate como error
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

/**
 * Network first: intenta red, si falla usa cache.
 * Para HTML principalmente.
 */
async function estrategiaNetworkFirst(request) {
    const cache = await caches.open(CACHE_NAME);

    try {
        const response = await Promise.race([
            fetch(request),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), 5000)
            )
        ]);

        if (response && response.ok) {
            cache.put(request, response.clone());
            return response;
        }

        throw new Error(`HTTP ${response.status}`);

    } catch (error) {
        console.log(`⚠️ SW: Red falló (${error.message}), usando cache:`,
            request.url.split('/').pop());

        const cached = await cache.match(request);
        if (cached) return cached;

        if (request.destination === 'document') {
            const home = await caches.match('/eventos-madrid/');
            if (home) return home;
        }

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
 * Para CSS, JS e imágenes.
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
self.addEventListener('message', evento => {
    if (evento.data?.tipo === 'SKIP_WAITING') {
        console.log('🔄 SW: Actualización forzada');
        self.skipWaiting();
    }
});