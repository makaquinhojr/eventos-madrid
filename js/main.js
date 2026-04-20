/* ========================================
   EVENTOSMADRID - APP.JS COMPLETO
   Apple-style Redesign + Premium Features
   Performance-optimized Vanilla JS
   ======================================== */

// ===== VARIABLES GLOBALES =====
let map;
let allEvents = [];
let allLugares = [];
let currentFilteredEvents = [];
let currentFilteredLugares = [];
let markersLayer;
let lugaresLayer;
let currentView = 'map';
let currentSort = 'date';
let currentDensity = 'comfortable';
let userMarker = null;
let userLocation = null;
let distanceCircle = null;
let maxDistance = 20;
let mostrarLugares = true;
let mostrarLugaresEnLista = true;
let favorites = [];
let currentCalendarDate = new Date();
let charts = {};

// Infinite scroll
let currentPage = 0;
let eventsPerPage = 50;
let isLoadingMore = false;
let scrollObserver = null;

// Performance tracking
let performanceMetrics = {
    loadStart: performance.now(),
    eventsLoaded: 0,
    renderTime: 0
};

// Premium Features
let currentThemePreset = 'default';
let customAccentColor = null;
let heatmapLayer = null;
let heatmapData = [];
let heatmapRadius = 25;
let routePlannerMode = false;
let selectedRouteEvents = [];
let routePolyline = null;
let routeMarkers = [];

// ===== ICONOS Y COLORES =====
const icons = {
    concierto: '🎵',
    fiesta: '🎪',
    mercado: '🛍️',
    cultural: '🎭',
    gastronomia: '🍽️',
    deporte: '⚽',
    infantil: '👶'
};

const colors = {
    concierto: '#7C3AED',
    fiesta: '#DC2626',
    mercado: '#059669',
    cultural: '#2563EB',
    gastronomia: '#D97706',
    deporte: '#16A34A',
    infantil: '#F59E0B'
};

const lugaresIcons = {
    museo: '🏛️',
    monumento: '🗿',
    teatro: '🎭',
    sala: '🎵',
    parque: '🌳',
    galeria: '🖼️',
    mercado: '🛍️'
};

const lugaresColors = {
    museo: '#0891B2',
    monumento: '#7C3AED',
    teatro: '#BE185D',
    sala: '#9333EA',
    parque: '#16A34A',
    galeria: '#EA580C',
    mercado: '#CA8A04'
};

const ZONAS_COORDS = {
    'Centro': { lat: 40.4168, lng: -3.7038, radio: 1.5 },
    'Arganzuela': { lat: 40.3964, lng: -3.7006, radio: 1.8 },
    'Retiro': { lat: 40.4083, lng: -3.6844, radio: 1.8 },
    'Salamanca': { lat: 40.4286, lng: -3.6824, radio: 1.5 },
    'Chamartín': { lat: 40.4536, lng: -3.6772, radio: 2.0 },
    'Tetuán': { lat: 40.4597, lng: -3.7031, radio: 1.5 },
    'Chamberí': { lat: 40.4394, lng: -3.7023, radio: 1.5 },
    'Fuencarral': { lat: 40.4894, lng: -3.7108, radio: 3.0 },
    'Moncloa': { lat: 40.4350, lng: -3.7245, radio: 2.5 },
    'Latina': { lat: 40.4061, lng: -3.7364, radio: 2.0 },
    'Carabanchel': { lat: 40.3828, lng: -3.7364, radio: 2.5 },
    'Usera': { lat: 40.3897, lng: -3.7108, radio: 1.5 },
    'Puente de Vallecas': { lat: 40.3919, lng: -3.6546, radio: 2.0 },
    'Moratalaz': { lat: 40.4061, lng: -3.6394, radio: 1.5 },
    'Ciudad Lineal': { lat: 40.4394, lng: -3.6508, radio: 2.5 },
    'Hortaleza': { lat: 40.4772, lng: -3.6394, radio: 3.0 },
    'Villaverde': { lat: 40.3469, lng: -3.7108, radio: 2.5 },
    'Villa de Vallecas': { lat: 40.3736, lng: -3.6197, radio: 2.5 },
    'Vicálvaro': { lat: 40.4061, lng: -3.6053, radio: 2.0 },
    'San Blas': { lat: 40.4286, lng: -3.6053, radio: 2.5 },
    'Barajas': { lat: 40.4772, lng: -3.5800, radio: 3.0 },
    'Getafe': { lat: 40.3058, lng: -3.7326, radio: 5.0 },
    'Leganés': { lat: 40.3281, lng: -3.7638, radio: 5.0 },
    'Alcorcón': { lat: 40.3494, lng: -3.8244, radio: 5.0 },
    'Móstoles': { lat: 40.3224, lng: -3.8652, radio: 5.0 },
    'Fuenlabrada': { lat: 40.2842, lng: -3.7946, radio: 5.0 },
    'Alcalá de Henares': { lat: 40.4818, lng: -3.3641, radio: 6.0 },
    'Torrejón de Ardoz': { lat: 40.4599, lng: -3.4794, radio: 5.0 },
    'Alcobendas': { lat: 40.5469, lng: -3.6398, radio: 4.0 },
    'Las Rozas': { lat: 40.4930, lng: -3.8740, radio: 5.0 },
    'Pozuelo': { lat: 40.4350, lng: -3.8138, radio: 4.0 },
    'Majadahonda': { lat: 40.4728, lng: -3.8726, radio: 4.0 },
    'Collado Villalba': { lat: 40.6346, lng: -4.0076, radio: 5.0 },
    'Tres Cantos': { lat: 40.5927, lng: -3.7090, radio: 4.0 },
    'San Sebastián de los Reyes': { lat: 40.5487, lng: -3.6271, radio: 4.0 },
    'Coslada': { lat: 40.4233, lng: -3.5645, radio: 3.0 },
    'Rivas Vaciamadrid': { lat: 40.3561, lng: -3.5234, radio: 4.0 },
    'Aranjuez': { lat: 40.0319, lng: -3.6010, radio: 5.0 },
    'Valdemoro': { lat: 40.1908, lng: -3.6742, radio: 4.0 },
    'Parla': { lat: 40.2390, lng: -3.7754, radio: 4.0 },
    'Torrelodones': { lat: 40.5756, lng: -3.9287, radio: 4.0 },
    'Boadilla del Monte': { lat: 40.4067, lng: -3.8760, radio: 4.0 },
    'Arganda del Rey': { lat: 40.3008, lng: -3.4394, radio: 4.0 },
};

// ===== FUNCIÓN T (TRADUCCIÓN) =====
function t(key) {
    if (typeof i18n !== 'undefined') {
        return i18n.t(key);
    }
    return key;
}

// ===== HELPER: INFERIR ZONA =====
function inferirZona(lat, lng) {
    let mejorZona = null;
    let mejorDistancia = Infinity;
    for (const [zona, datos] of Object.entries(ZONAS_COORDS)) {
        const dist = calcularDistancia(lat, lng, datos.lat, datos.lng);
        if (dist <= datos.radio && dist < mejorDistancia) {
            mejorDistancia = dist;
            mejorZona = zona;
        }
    }
    return mejorZona || 'Madrid';
}

function getZonaEvento(evento) {
    return evento.zona || inferirZona(evento.lat, evento.lng);
}

// ===== SISTEMA DE FAVORITOS =====
function loadFavorites() {
    const saved = localStorage.getItem('favorites');
    favorites = saved ? JSON.parse(saved) : [];
    updateFavoritesCount();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

function toggleFavorite(eventoId) {
    const index = favorites.indexOf(eventoId);
    const wasAdded = index === -1;

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(eventoId);
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    saveFavorites();
    renderFavoritesList();

    document.querySelectorAll(`[data-event-id="${eventoId}"]`).forEach(btn => {
        btn.classList.toggle('active', favorites.includes(eventoId));
    });

    mostrarToastConUndo(
        wasAdded ? i18n.t('favorites.added') : i18n.t('favorites.removed'),
        () => toggleFavorite(eventoId)
    );
}

function isFavorite(eventoId) {
    return favorites.includes(eventoId);
}

function updateFavoritesCount() {
    const badge = document.getElementById('favorites-count');
    const bottomBadge = document.getElementById('bottom-favorites-badge');

    if (favorites.length > 0) {
        if (badge) {
            badge.textContent = favorites.length;
            badge.style.display = 'flex';
        }
        if (bottomBadge) {
            bottomBadge.textContent = favorites.length;
            bottomBadge.style.display = 'flex';
        }
    } else {
        if (badge) badge.style.display = 'none';
        if (bottomBadge) bottomBadge.style.display = 'none';
    }
}

function renderFavoritesList() {
    const container = document.getElementById('favorites-list');
    const emptyState = document.getElementById('favorites-empty');

    if (!container || !emptyState) return;

    if (favorites.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const favoritosEventos = allEvents.filter(e => favorites.includes(e.id));

    container.innerHTML = favoritosEventos.map(evento => {
        const emoji = icons[evento.tipo] || '📍';
        const color = colors[evento.tipo] || '#6B7280';
        const fecha = formatDate(evento.fecha);

        return `
            <div class="favorite-item" style="animation: fadeUp 0.3s ease-out;">
                <div class="favorite-item-icon ${evento.tipo}" style="background:linear-gradient(135deg, ${color}dd 0%, ${color} 100%);">
                    ${emoji}
                </div>
                <div class="favorite-item-info">
                    <div class="favorite-item-title">${evento.nombre}</div>
                    <div class="favorite-item-meta">
                        <span>📅 ${fecha}</span>
                        <span>📍 ${evento.lugar}</span>
                    </div>
                </div>
                <button class="btn-remove-favorite" onclick="toggleFavorite(${evento.id})" aria-label="Quitar de favoritos">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }).join('');
}

// ===== COMPARTIR NATIVO =====
async function compartirEventoNativo(eventoId) {
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;

    const url = generarUrlCompartir(evento);
    const texto = generarTextoCompartir(evento);

    if (navigator.share) {
        try {
            await navigator.share({
                title: evento.nombre,
                text: texto,
                url: url
            });
            mostrarToast('✅ ' + i18n.t('event.link_copied'));
        } catch (err) {
            if (err.name !== 'AbortError') {
                compartirEvento(eventoId);
            }
        }
    } else {
        compartirEvento(eventoId);
    }
}

function generarUrlCompartir(evento) {
    const base = window.location.origin + window.location.pathname;
    return `${base}?evento=${evento.id}`;
}

function generarTextoCompartir(evento) {
    const fecha = formatDate(evento.fecha);
    const precio = evento.precio === 'gratis'
        ? i18n.t('badge.free')
        : (evento.precio_desde || i18n.t('badge.paid'));
    const emoji = icons[evento.tipo] || '📍';
    return `${emoji} *${evento.nombre}*\n📅 ${fecha}\n📍 ${evento.lugar}\n💰 ${precio}`;
}

function compartirEvento(eventoId) {
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;

    const url = generarUrlCompartir(evento);
    const texto = generarTextoCompartir(evento);
    const emoji = icons[evento.tipo] || '📍';

    document.getElementById('modal-compartir')?.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-compartir';
    modal.className = 'modal-compartir-overlay';
    modal.innerHTML = `
        <div class="modal-compartir">
            <div class="modal-compartir-header">
                <span>${emoji} ${i18n.t('share.title_event')}</span>
                <button class="modal-compartir-close" onclick="cerrarModalCompartir()" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-compartir-nombre">${evento.nombre}</div>
            <div class="modal-compartir-acciones">
                <a class="modal-compartir-btn whatsapp"
                   href="https://wa.me/?text=${encodeURIComponent(texto + '\n\n🗺️ Ver en EventosMadrid: ' + url)}"
                   target="_blank" onclick="cerrarModalCompartir()">
                    <i class="fab fa-whatsapp"></i>
                    <span>${i18n.t('event.share_whatsapp')}</span>
                </a>
                <a class="modal-compartir-btn twitter"
                   href="https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}"
                   target="_blank" onclick="cerrarModalCompartir()">
                    <i class="fab fa-x-twitter"></i>
                    <span>${i18n.t('event.share_twitter')}</span>
                </a>
                <button class="modal-compartir-btn copiar" onclick="copiarLinkEvento('${url}', this)">
                    <i class="fas fa-link"></i>
                    <span>${i18n.t('event.copy_link')}</span>
                </button>
            </div>
        </div>
    `;

    modal.addEventListener('click', e => {
        if (e.target === modal) cerrarModalCompartir();
    });

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));
}

function cerrarModalCompartir() {
    const modal = document.getElementById('modal-compartir');
    if (!modal) return;
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 200);
}

async function copiarLinkEvento(url, btn) {
    try {
        await navigator.clipboard.writeText(url);
        const original = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check"></i><span>${i18n.t('event.link_copied')}</span>`;
        btn.classList.add('copiado');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copiado');
        }, 2000);
    } catch {
        mostrarToast('❌ No se pudo copiar', 'error');
    }
}

function compartirLugar(lugarId) {
    const lugar = allLugares.find(l => l.id === lugarId);
    if (!lugar) return;

    const url = `${window.location.origin}${window.location.pathname}?lugar=${lugarId}`;
    const emoji = lugaresIcons[lugar.categoria] || '📍';
    const texto = `${emoji} *${lugar.nombre}*\n📍 ${lugar.lugar}\n🕐 ${lugar.horario || 'Ver horarios'}`;

    document.getElementById('modal-compartir')?.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-compartir';
    modal.className = 'modal-compartir-overlay';
    modal.innerHTML = `
        <div class="modal-compartir">
            <div class="modal-compartir-header">
                <span>${emoji} ${i18n.t('share.title_place')}</span>
                <button class="modal-compartir-close" onclick="cerrarModalCompartir()" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-compartir-nombre">${lugar.nombre}</div>
            <div class="modal-compartir-acciones">
                <a class="modal-compartir-btn whatsapp"
                   href="https://wa.me/?text=${encodeURIComponent(texto + '\n\n🗺️ Ver en EventosMadrid: ' + url)}"
                   target="_blank" onclick="cerrarModalCompartir()">
                    <i class="fab fa-whatsapp"></i>
                    <span>${i18n.t('event.share_whatsapp')}</span>
                </a>
                <a class="modal-compartir-btn twitter"
                   href="https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}"
                   target="_blank" onclick="cerrarModalCompartir()">
                    <i class="fab fa-x-twitter"></i>
                    <span>${i18n.t('event.share_twitter')}</span>
                </a>
                <button class="modal-compartir-btn copiar" onclick="copiarLinkEvento('${url}', this)">
                    <i class="fas fa-link"></i>
                    <span>${i18n.t('event.copy_link')}</span>
                </button>
            </div>
        </div>
    `;

    modal.addEventListener('click', e => {
        if (e.target === modal) cerrarModalCompartir();
    });

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));
}

// ===== HELPERS DE EVENTOS =====
function esLinkUtil(url) {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    if (!url.startsWith('http://') && !url.startsWith('https://')) return false;

    const urlLower = url.toLowerCase();
    if (urlLower.includes('madrid.es/portales/munimadrid')) return true;

    const urlsGenericas = [
        'madrid.es', 'esmadrid.com',
        'timeout.es/madrid', 'datos.madrid.es'
    ];

    for (const generica of urlsGenericas) {
        if (urlLower.includes(generica)) {
            if (
                url.endsWith(generica) ||
                url.endsWith(generica + '/') ||
                url.includes('/agenda-eventos-madrid') ||
                (url.includes('/agenda') && url.split('/').length <= 4)
            ) return false;
        }
    }

    if (url.match(/\/(evento|event|actividad|show)\/[\w-]+/i)) return true;
    return !urlLower.includes('madrid.es') || url.length > 50;
}

function getLinkHTML(evento) {
    if (esLinkUtil(evento.url)) {
        return `<a href="${evento.url}" target="_blank" class="popup-link">${i18n.t('event.more_info')} →</a>`;
    }
    const busqueda = encodeURIComponent(`${evento.nombre} Madrid`);
    return `<a href="https://www.google.com/search?q=${busqueda}" target="_blank" class="popup-link popup-link-google">🔍 ${i18n.t('event.search_google')}</a>`;
}

function getBotonMasInfo(evento) {
    const busqueda = encodeURIComponent(`${evento.nombre} Madrid`);
    if (esLinkUtil(evento.url)) {
        return `<a href="${evento.url}" target="_blank" class="event-btn event-btn-secondary">
                    <i class="fas fa-external-link-alt"></i> ${i18n.t('event.more_info')}
                </a>`;
    }
    return `<a href="https://www.google.com/search?q=${busqueda}" target="_blank" class="event-btn event-btn-google">
                <i class="fas fa-search"></i> ${i18n.t('event.search_google')}
            </a>`;
}

function generarLinkCalendar(evento) {
    const formatearFechaCalendar = (fechaStr) => {
        if (!fechaStr) return null;
        const fecha = new Date(fechaStr + 'T00:00:00');
        if (isNaN(fecha.getTime())) return null;
        return fecha.toISOString().replace(/-|:|\.d{3}/g, '').slice(0, 8);
    };

    const inicio = formatearFechaCalendar(evento.fecha);
    if (!inicio) return null;
    const fin = formatearFechaCalendar(evento.fecha_fin) || inicio;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: evento.nombre,
        dates: `${inicio}/${fin}`,
        details: `${evento.descripcion || ''}\n\nMás info: ${evento.url || ''}`,
        location: evento.lugar || 'Madrid'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function comoLlegar(eventoId) {
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;
    comoLlegarCoords(evento.lat, evento.lng, evento.lugar);
}

function comoLlegarCoords(lat, lng, nombre) {
    let url;
    if (userLocation) {
        url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${lat},${lng}`;
    } else {
        url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(nombre)}`;
    }
    window.open(url, '_blank');
}

// ===== PROCESAMIENTO DE URL =====
function procesarUrlEvento() {
    const params = new URLSearchParams(window.location.search);

    const lugarId = params.get('lugar');
    if (lugarId) {
        const lugar = allLugares.find(l => l.id === lugarId);
        if (lugar) {
            mostrarToast(`🏛️ ${lugar.nombre.substring(0, 35)}`);
            map.setView([lugar.lat, lugar.lng], 16, { animate: false });

            setTimeout(() => {
                lugaresLayer.eachLayer(marker => {
                    if (marker.lugarId === lugarId) {
                        marker.openPopup();
                    }
                });
            }, 500);
        }
        return;
    }

    const eventoId = parseInt(params.get('evento'));
    if (!eventoId) return;

    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;

    mostrarToast(`🔍 ${evento.nombre.substring(0, 35)}...`);
    map.setView([evento.lat, evento.lng], 15, { animate: false });

    let intentos = 0;
    const maxIntentos = 20;

    const intervalo = setInterval(() => {
        intentos++;
        let markerEncontrado = null;

        markersLayer.eachLayer(marker => {
            if (marker.eventoId === eventoId) {
                markerEncontrado = marker;
            }
        });

        if (markerEncontrado) {
            clearInterval(intervalo);
            markersLayer.zoomToShowLayer(markerEncontrado, () => {
                setTimeout(() => {
                    markerEncontrado.openPopup();
                    mostrarToast(`📍 ${evento.nombre.substring(0, 35)}`);
                }, 150);
            });
        } else if (intentos >= maxIntentos) {
            clearInterval(intervalo);
            mostrarToast(`📍 ${evento.lugar}`);
        }
    }, 200);
}

// ===== INICIALIZACIÓN DEL MAPA =====
function initMap() {
    map = L.map('map').setView([40.4168, -3.7038], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    markersLayer = L.markerClusterGroup({
        chunkedLoading: true,
        chunkInterval: 100,
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        animate: true,
        animateAddingMarkers: false,
    }).addTo(map);

    lugaresLayer = L.layerGroup().addTo(map);
}

// ===== CARGA DE EVENTOS =====
async function loadEvents() {
    try {
        const [eventosRes, lugaresRes] = await Promise.all([
            fetch('data/eventos.json'),
            fetch('data/lugares.json')
        ]);

        const events = await eventosRes.json();
        const lugares = await lugaresRes.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        allEvents = events.filter(e => {
            if (!e.nombre || e.nombre.trim() === '') return false;
            const eventDate = new Date(e.fecha_fin || e.fecha);
            return eventDate >= today;
        }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        allLugares = lugares;

        performanceMetrics.eventsLoaded = allEvents.length;

        updateCounter(allEvents.length);
        displayEvents(allEvents);
        displayLugares(allLugares);
        actualizarEstadisticas(allEvents);
        iniciarBannerHoy();
        ocultarLoader(allEvents.length);
        procesarUrlEvento();

        loadFavorites();
        renderFavoritesList();

        if (currentView === 'calendar') {
            renderCalendar();
        }

        performanceMetrics.renderTime = performance.now() - performanceMetrics.loadStart;
        console.log(`⚡ Performance: ${performanceMetrics.eventsLoaded} eventos cargados en ${Math.round(performanceMetrics.renderTime)}ms`);

    } catch (error) {
        console.error('❌ Error cargando datos:', error);
        ocultarLoader(0);
    }
}

// ===== DISPLAY EVENTOS (MAPA) =====
function displayEvents(events) {
    markersLayer.clearLayers();

    events.forEach(event => {
        const color = colors[event.tipo] || '#6B7280';
        const emoji = icons[event.tipo] || '📍';

        const icon = L.divIcon({
            html: `
                <div class="custom-marker" style="
                    background: ${color};
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    border: 3px solid white;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                    cursor: pointer;
                    transform: translate(-50%, -50%);
                ">${emoji}</div>
            `,
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const marker = L.marker([event.lat, event.lng], { icon, riseOnHover: true });
        marker.eventoId = event.id;

        const dateText = formatearFechaSafe(event.fecha, event.fecha_fin);
        const descripcion = limpiarDescripcion(event.descripcion, 150);
        const linkHTML = getLinkHTML(event);
        const zona = getZonaEvento(event);

        const calendarLink = generarLinkCalendar(event);
        const calendarHTML = calendarLink
            ? `<a href="${calendarLink}" target="_blank" class="popup-link popup-link-calendar">📅 ${i18n.t('event.add_calendar')}</a>`
            : '';

        const distanciaHTML = userLocation
            ? `<p><strong>🚶</strong> ${getDistanciaHTML(event)}</p>`
            : '';

        const popupAccionesExtra = `
            <div class="popup-acciones-extra">
                <button class="popup-btn-extra" onclick="comoLlegar(${event.id})">
                    <i class="fas fa-route"></i> ${i18n.t('event.how_to_get')}
                </button>
                <button class="popup-btn-extra compartir" onclick="compartirEventoNativo(${event.id})">
                    <i class="fas fa-share-alt"></i> ${i18n.t('event.share')}
                </button>
            </div>
        `;

        marker.bindPopup(`
            <div class="popup-evento">
                <h3>${event.nombre}</h3>
                <p><strong>📅</strong> ${dateText}</p>
                <p><strong>📍</strong> ${event.lugar}</p>
                <p><strong>🗺️</strong> ${i18n.t('zone.' + zona, zona)}</p>
                <p><strong>💰</strong> ${
                    event.precio === 'gratis'
                        ? `<strong style="color:#30D158;">${i18n.t('badge.free')}</strong>`
                        : event.precio_desde
                            ? i18n.t('badge.from') + ' ' + event.precio_desde
                            : i18n.t('badge.paid')
                }</p>
                ${distanciaHTML}
                ${descripcion
                    ? `<p style="color:var(--text-secondary);font-size:13px;margin-top:8px;line-height:1.4;">${descripcion}</p>`
                    : ''}
                <div class="popup-actions">
                    ${linkHTML}
                    ${calendarHTML}
                </div>
                ${popupAccionesExtra}
            </div>
        `);

        markersLayer.addLayer(marker);
    });

    currentFilteredEvents = events;

    if (currentView === 'list') {
        renderListView(events);
    } else if (currentView === 'calendar') {
        renderCalendar();
    }

    actualizarEstadisticas(events);
    initCharts();
}

// ===== DISPLAY LUGARES =====
function displayLugares(lugares) {
    lugaresLayer.clearLayers();

    if (!mostrarLugares) return;

    lugares.forEach(lugar => {
        const color = lugaresColors[lugar.categoria] || '#6B7280';
        const emoji = lugaresIcons[lugar.categoria] || '📍';

        const icon = L.divIcon({
            html: `<div class="lugar-marker" style="background:${color};">${emoji}</div>`,
            className: '',
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            popupAnchor: [0, -20]
        });

        const marker = L.marker([lugar.lat, lugar.lng], { icon, riseOnHover: true });
        marker.lugarId = lugar.id;

        const precioHTML = lugar.precio === 'gratis'
            ? `<strong style="color:#30D158;">${i18n.t('badge.free')}</strong>`
            : lugar.precio_desde || i18n.t('badge.paid');

        const distanciaHTML = userLocation
            ? `<p><strong>🚶</strong> ${getDistanciaHTMLCoords(lugar.lat, lugar.lng)}</p>`
            : '';

        marker.bindPopup(`
            <div class="popup-evento popup-lugar">
                <div class="popup-lugar-badge">
                    ${emoji} ${categoriaNombre(lugar.categoria)}
                </div>
                <h3>${lugar.nombre}</h3>
                <p><strong>📍</strong> ${lugar.lugar}</p>
                <p><strong>🗺️</strong> ${i18n.t('zone.' + (lugar.zona || inferirZona(lugar.lat, lugar.lng)))}</p>
                <p><strong>💰</strong> ${precioHTML}</p>
                <p><strong>🕐</strong> ${lugar.horario || 'Consultar horario'}</p>
                ${distanciaHTML}
                ${lugar.descripcion
                    ? `<p style="color:var(--text-secondary);font-size:13px;margin-top:8px;line-height:1.4;">${lugar.descripcion}</p>`
                    : ''}
                <div class="popup-actions">
                    <a href="${lugar.url}" target="_blank" class="popup-link">${i18n.t('event.more_info')} →</a>
                </div>
                <div class="popup-acciones-extra">
                    <button class="popup-btn-extra" onclick="comoLlegarCoords(${lugar.lat}, ${lugar.lng}, '${lugar.nombre.replace(/'/g, "\\'")}')">
                        <i class="fas fa-route"></i> ${i18n.t('event.how_to_get')}
                    </button>
                    <button class="popup-btn-extra compartir" onclick="compartirLugar('${lugar.id}')">
                        <i class="fas fa-share-alt"></i> ${i18n.t('event.share')}
                    </button>
                </div>
            </div>
        `);

        lugaresLayer.addLayer(marker);
    });

    currentFilteredLugares = lugares;
    if (currentView === 'list') {
        renderLugaresList(lugares);
    }
}

function toggleLugares() {
    mostrarLugares = !mostrarLugares;
    const btn = document.getElementById('btn-toggle-lugares');
    if (mostrarLugares) {
        displayLugares(currentFilteredLugares.length ? currentFilteredLugares : allLugares);
        if (btn) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        }
        mostrarToast('🏛️ Lugares visibles');
    } else {
        lugaresLayer.clearLayers();
        if (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        }
        mostrarToast('🏛️ Lugares ocultos');
    }
}

function categoriaNombre(categoria) {
    const nombres = {
        museo: 'Museo',
        monumento: 'Monumento',
        teatro: 'Teatro',
        sala: 'Sala',
        parque: 'Parque',
        galeria: 'Galería',
        mercado: 'Mercado'
    };
    return nombres[categoria] || 'Lugar de interés';
}

// ===== CAMBIO DE VISTA =====
function switchView(view) {
    currentView = view;

    // Actualizar clase en body para CSS
    document.body.classList.remove('view-map', 'view-list', 'view-calendar');
    document.body.classList.add(`view-${view}`);

    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.removeAttribute('aria-current');
    });

    const desktopBtn = document.getElementById(`view-${view}-btn`);
    if (desktopBtn) {
        desktopBtn.classList.add('active');
        desktopBtn.setAttribute('aria-selected', 'true');
        desktopBtn.setAttribute('aria-current', 'page');
    }

    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
    });

    const bottomBtn = document.getElementById(`bottom-nav-${view}`);
    if (bottomBtn) {
        bottomBtn.classList.add('active');
        bottomBtn.setAttribute('aria-current', 'page');
    }

    document.querySelectorAll('.view-container').forEach(c => {
        c.classList.remove('active');
    });

    if (view === 'map') {
        const mapEl = document.getElementById('map');
        if (mapEl) {
            mapEl.classList.add('active');
            setTimeout(() => map && map.invalidateSize(), 100);
        }
    } else if (view === 'list') {
        const listEl = document.getElementById('list-view');
        if (listEl) {
            listEl.classList.add('active');
            currentPage = 0;
            renderListView(currentFilteredEvents.length
                ? currentFilteredEvents
                : allEvents);
            renderLugaresList(currentFilteredLugares.length
                ? currentFilteredLugares
                : allLugares);
        }
    } else if (view === 'calendar') {
        const calEl = document.getElementById('calendar-view');
        if (calEl) {
            calEl.classList.add('active');
            renderCalendar();
        }
    }
}

// ===== VISTA LISTA CON AGRUPACIÓN POR FECHAS =====
function renderListView(events) {
    const listContainer = document.getElementById('events-list');
    const skeletonList = document.getElementById('skeleton-list');

    if (!listContainer) return;

    if (events.length === 0) {
        if (skeletonList) skeletonList.style.display = 'none';
        listContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No se encontraron eventos</h3>
                <p>Prueba a cambiar los filtros</p>
                <button class="event-btn event-btn-primary" onclick="clearFilters()" style="margin-top:24px;">
                    <i class="fas fa-redo"></i> Limpiar filtros
                </button>
            </div>
        `;
        return;
    }

    const sortedEvents = [...events].sort((a, b) => {
        switch (currentSort) {
            case 'date':
                return new Date(a.fecha) - new Date(b.fecha);
            case 'name':
                return a.nombre.localeCompare(b.nombre);
            case 'type':
                return a.tipo.localeCompare(b.tipo);
            case 'distance':
                if (!userLocation) return 0;
                return calcularDistancia(userLocation.lat, userLocation.lng, a.lat, a.lng) -
                       calcularDistancia(userLocation.lat, userLocation.lng, b.lat, b.lng);
            default:
                return 0;
        }
    });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);
    const finSemana = new Date(hoy);
    finSemana.setDate(hoy.getDate() + 7);

    const grupos = {
        'Hoy': [],
        'Mañana': [],
        'Esta semana': [],
        'Más adelante': []
    };

    sortedEvents.forEach(evento => {
        const fechaEvento = new Date(evento.fecha);
        fechaEvento.setHours(0, 0, 0, 0);

        if (fechaEvento.getTime() === hoy.getTime()) {
            grupos['Hoy'].push(evento);
        } else if (fechaEvento.getTime() === manana.getTime()) {
            grupos['Mañana'].push(evento);
        } else if (fechaEvento <= finSemana) {
            grupos['Esta semana'].push(evento);
        } else {
            grupos['Más adelante'].push(evento);
        }
    });

    const eventsToShow = sortedEvents.slice(0, (currentPage + 1) * eventsPerPage);

    listContainer.innerHTML = Object.entries(grupos)
        .filter(([_, eventos]) => eventos.length > 0)
        .map(([grupo, eventos]) => {
            const eventosGrupo = eventos.filter(e => eventsToShow.includes(e));
            if (eventosGrupo.length === 0) return '';

            // Traducir nombres de grupos
            const grupoTraducido = {
                'Hoy': t('list.group.today'),
                'Mañana': t('list.group.tomorrow'),
                'Esta semana': t('list.group.this_week'),
                'Más adelante': t('list.group.later')
            }[grupo] || grupo;

            return `
                <div class="event-group">
                    <div class="event-group-header">
                        <h3>${grupoTraducido}</h3>
                        <span class="event-group-count">${eventosGrupo.length}</span>
                    </div>
                    <div class="events-list">
                        ${eventosGrupo.map(evento => renderEventCard(evento)).join('')}
                    </div>
                </div>
            `;
        })
        .join('');

    if (skeletonList) skeletonList.style.display = 'none';

    const subtitle = document.getElementById('list-subtitle');
    if (subtitle) {
        const totalShown = eventsToShow.length;
        const totalEvents = sortedEvents.length;
        subtitle.textContent = t('common.showing').replace('{shown}', totalShown).replace('{total}', totalEvents);
    }
}

// ===== RENDERIZAR TARJETA INDIVIDUAL =====
function renderEventCard(evento) {
    const fechaEvento = new Date(evento.fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const esHoy = fechaEvento.toDateString() === hoy.toDateString();
    const esMañana = fechaEvento.toDateString() === new Date(hoy.getTime() + 86400000).toDateString();

    let proximidadBadge = '';
    if (esHoy) proximidadBadge = `<span class="event-badge hoy">🔥 ${i18n.t('badge.today')}</span>`;
    else if (esMañana) proximidadBadge = `<span class="event-badge hoy">⚡ ${i18n.t('badge.tomorrow')}</span>`;

    const precioBadge = evento.precio === 'gratis'
        ? `<span class="event-badge gratis">💚 ${i18n.t('badge.free')}</span>`
        : `<span class="event-badge pago">💰 ${evento.precio_desde ? i18n.t('badge.from') + ' ' + evento.precio_desde : i18n.t('badge.paid')}</span>`;

    const zona = getZonaEvento(evento);
    const zonaBadge = `<span class="event-badge zona">📍 ${i18n.t('zone.' + zona, zona)}</span>`;

    const fechaTexto = evento.fecha_fin
        ? `${formatDate(evento.fecha)} - ${formatDate(evento.fecha_fin)}`
        : formatDate(evento.fecha);

    const distanciaItem = userLocation ? `
        <div class="event-meta-item distancia">
            ${getDistanciaHTML(evento)}
        </div>
    ` : '';

    const botonMasInfo = getBotonMasInfo(evento);
    const calendarLink = generarLinkCalendar(evento);
    const botonCalendar = calendarLink
        ? `<a href="${calendarLink}" target="_blank" class="event-btn event-btn-calendar" title="${i18n.t('event.add_calendar')}">
                <i class="fas fa-calendar-plus"></i>
           </a>`
        : '';

    const descripcion = limpiarDescripcion(evento.descripcion, 200);

    const botonComoLlegar = `
        <button class="event-btn event-btn-llegar" onclick="comoLlegar(${evento.id})" title="${i18n.t('event.how_to_get')}">
            <i class="fas fa-route"></i>
        </button>
    `;

    const botonCompartir = `
        <button class="event-btn event-btn-compartir" onclick="compartirEventoNativo(${evento.id})" title="${i18n.t('event.share')}">
            <i class="fas fa-share-alt"></i>
        </button>
    `;

    const botonFavorito = `
        <button class="btn-favorite ${isFavorite(evento.id) ? 'active' : ''}"
                data-event-id="${evento.id}"
                onclick="toggleFavorite(${evento.id})"
                title="${i18n.t('favorites.title')}"
                aria-label="${isFavorite(evento.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}">
            <i class="fas fa-heart"></i>
        </button>
    `;

    const emoji = icons[evento.tipo] || '📍';
    const color = colors[evento.tipo] || '#6B7280';
    const densityClass = currentDensity === 'compact' ? 'compact' : '';

    return `
        <div class="event-card ${densityClass}">
            <div class="event-icon ${evento.tipo}" style="background:linear-gradient(135deg, ${color}dd 0%, ${color} 100%);">
                ${emoji}
            </div>
            <div class="event-info">
                <div class="event-title">
                    ${evento.nombre}
                    ${proximidadBadge}
                    ${precioBadge}
                    ${zonaBadge}
                </div>
                <div class="event-meta">
                    <div class="event-meta-item">
                        <i class="fas fa-calendar"></i>
                        ${fechaTexto}
                    </div>
                    <div class="event-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        ${evento.lugar}
                    </div>
                    ${distanciaItem}
                </div>
                ${descripcion
                    ? `<div class="event-description">${descripcion}</div>`
                    : `<div class="event-description sin-descripcion">
                           📍 ${evento.lugar} · ${evento.precio === 'gratis' ? i18n.t('badge.free') : evento.precio_desde || i18n.t('badge.paid')}
                       </div>`
                }
            </div>
            <div class="event-actions">
                <button class="event-btn event-btn-primary" onclick="verEnMapa(${evento.id})">
                    <i class="fas fa-map-marked-alt"></i> ${i18n.t('event.view_map')}
                </button>
                ${botonMasInfo}
                <div class="event-actions-row">
                    ${botonCalendar}
                    ${botonComoLlegar}
                    ${botonCompartir}
                    ${botonFavorito}
                </div>
            </div>
        </div>
    `;
}

// ===== RENDERIZAR LUGARES EN LISTA =====
function renderLugaresList(lugares) {
    const lugaresSection = document.getElementById('lugares-section');
    const lugaresList = document.getElementById('lugares-list');

    if (!lugares || lugares.length === 0 || !mostrarLugaresEnLista) {
        if (lugaresSection) lugaresSection.style.display = 'none';
        return;
    }

    if (lugaresSection) lugaresSection.style.display = 'block';

    const sortedLugares = [...lugares].sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.nombre.localeCompare(b.nombre);
            case 'distance':
                if (!userLocation) return 0;
                return calcularDistancia(userLocation.lat, userLocation.lng, a.lat, a.lng) -
                       calcularDistancia(userLocation.lat, userLocation.lng, b.lat, b.lng);
            default:
                return a.nombre.localeCompare(b.nombre);
        }
    });

    if (lugaresList) {
        lugaresList.innerHTML = sortedLugares.map(lugar => {
            const emoji = lugaresIcons[lugar.categoria] || '📍';
            const color = lugaresColors[lugar.categoria] || '#6B7280';
            const categoriaNom = categoriaNombre(lugar.categoria);
            const zona = lugar.zona || inferirZona(lugar.lat, lugar.lng);

            const precioBadge = lugar.precio === 'gratis'
                ? `<span class="event-badge gratis">💚 ${i18n.t('badge.free')}</span>`
                : `<span class="event-badge pago">💰 ${lugar.precio_desde || i18n.t('badge.paid')}</span>`;

            const zonaBadge = `<span class="event-badge zona">📍 ${i18n.t('zone.' + zona, zona)}</span>`;
            const categoriaBadge = `<span class="lugar-categoria-badge" style="background:${color}20;color:${color};">${emoji} ${categoriaNom}</span>`;

            const distanciaItem = userLocation ? `
                <div class="event-meta-item distancia">
                    ${getDistanciaHTMLCoords(lugar.lat, lugar.lng)}
                </div>
            ` : '';

            return `
                <div class="lugar-card">
                    <div class="lugar-icon" style="background:linear-gradient(135deg, ${color}dd 0%, ${color} 100%);">
                        ${emoji}
                    </div>
                    <div class="event-info">
                        <div class="event-title">
                            ${lugar.nombre}
                            ${categoriaBadge}
                            ${precioBadge}
                            ${zonaBadge}
                        </div>
                        <div class="event-meta">
                            <div class="event-meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                ${lugar.lugar}
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-clock"></i>
                                ${lugar.horario || 'Consultar horario'}
                            </div>
                            ${distanciaItem}
                        </div>
                        ${lugar.descripcion
                            ? `<div class="event-description">${limpiarDescripcion(lugar.descripcion, 200)}</div>`
                            : ''}
                    </div>
                    <div class="event-actions">
                        <button class="event-btn event-btn-primary" onclick="verLugarEnMapa('${lugar.id}')">
                            <i class="fas fa-map-marked-alt"></i> ${i18n.t('event.view_map')}
                        </button>
                        <a href="${lugar.url}" target="_blank" class="event-btn event-btn-secondary">
                            <i class="fas fa-external-link-alt"></i> ${i18n.t('event.more_info')}
                        </a>
                        <div class="event-actions-row">
                            <button class="event-btn event-btn-llegar"
                                    onclick="comoLlegarCoords(${lugar.lat}, ${lugar.lng}, '${lugar.nombre.replace(/'/g, "\\'")}')"
                                    title="${i18n.t('event.how_to_get')}">
                                <i class="fas fa-route"></i>
                            </button>
                            <button class="event-btn event-btn-compartir"
                                    onclick="compartirLugar('${lugar.id}')"
                                    title="${i18n.t('event.share')}">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function verEnMapa(eventoId) {
    switchView('map');
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;
    map.setView([evento.lat, evento.lng], 15);
    markersLayer.eachLayer(marker => {
        if (marker.eventoId === eventoId) {
            markersLayer.zoomToShowLayer(marker, () => marker.openPopup());
        }
    });
}

function verLugarEnMapa(lugarId) {
    switchView('map');
    const lugar = allLugares.find(l => l.id === lugarId);
    if (!lugar) return;
    map.setView([lugar.lat, lugar.lng], 16);
    setTimeout(() => {
        lugaresLayer.eachLayer(marker => {
            if (marker.lugarId === lugarId) {
                marker.openPopup();
            }
        });
    }, 300);
}

// ===== FILTROS =====
let filterDebounceTimer = null;

function applyFilters() {
    clearTimeout(filterDebounceTimer);
    filterDebounceTimer = setTimeout(() => {
        applyFiltersImmediate();
    }, 150);
}

function applyFiltersImmediate() {
    const searchEl = document.getElementById('search');
    const search = searchEl ? searchEl.value.toLowerCase().trim() : '';
    const dateFilter = document.getElementById('filtro-fecha')?.value || 'todos';
    const zonaFilter = document.getElementById('filtro-zona')?.value || 'todas';
    const precioMax = parseInt(document.getElementById('filtro-precio-max')?.value || 100);

    const types = Array.from(document.querySelectorAll(
        '.chip input[value="concierto"], .chip input[value="fiesta"], ' +
        '.chip input[value="mercado"], .chip input[value="cultural"], ' +
        '.chip input[value="gastronomia"], .chip input[value="deporte"], ' +
        '.chip input[value="infantil"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    const prices = Array.from(document.querySelectorAll(
        '.chip input[value="gratis"], .chip input[value="pago"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    const lugarCategorias = Array.from(document.querySelectorAll('.lugar-categoria-cb'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    let filtered = allEvents.filter(e => {
        if (types.length && !types.includes(e.tipo)) return false;
        if (prices.length && !prices.includes(e.precio)) return false;
        if (userLocation && !isEventInDistance(e)) return false;

        if (search) {
            const zona = getZonaEvento(e);
            const haystack = [e.nombre, e.descripcion || '', e.lugar, zona].join(' ').toLowerCase();
            if (!haystack.includes(search)) return false;
        }

        if (zonaFilter !== 'todas' && getZonaEvento(e) !== zonaFilter) return false;

        if (precioMax < 100) {
            if (e.precio === 'gratis') return true;
            if (precioMax === 0) return false;
            if (e.precio_desde) {
                const num = parseFloat(e.precio_desde.replace('€', ''));
                if (!isNaN(num) && num > precioMax) return false;
            }
        }

        return true;
    });

    if (dateFilter !== 'todos') {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        filtered = filtered.filter(e => {
            const fechaInicio = new Date(e.fecha + 'T00:00:00');
            const fechaFin = e.fecha_fin ? new Date(e.fecha_fin + 'T00:00:00') : fechaInicio;

            switch (dateFilter) {
                case 'hoy':
                    return fechaInicio <= hoy && fechaFin >= hoy;
                case 'finde': {
                    const dia = hoy.getDay();
                    let ini, fin;
                    if (dia === 6) {
                        ini = new Date(hoy);
                        fin = new Date(hoy);
                        fin.setDate(hoy.getDate() + 1);
                    } else if (dia === 0) {
                        ini = fin = new Date(hoy);
                    } else {
                        const diasHastaSabado = 6 - dia;
                        ini = new Date(hoy);
                        ini.setDate(hoy.getDate() + diasHastaSabado);
                        fin = new Date(ini);
                        fin.setDate(ini.getDate() + 1);
                    }
                    return fechaInicio <= fin && fechaFin >= ini;
                }
                case 'semana': {
                    const semanaFin = new Date(hoy);
                    semanaFin.setDate(hoy.getDate() + 7);
                    return fechaInicio <= semanaFin && fechaFin >= hoy;
                }
                case 'mes': {
                    const mesFin = new Date(hoy);
                    mesFin.setDate(hoy.getDate() + 30);
                    return fechaInicio <= mesFin && fechaFin >= hoy;
                }
                default:
                    return true;
            }
        });
    }

    let filteredLugares = allLugares.filter(l => {
        if (lugarCategorias.length === 0) return false;
        if (!lugarCategorias.includes(l.categoria)) return false;

        if (search) {
            const zona = l.zona || inferirZona(l.lat, l.lng);
            const haystack = [
                l.nombre, l.descripcion || '',
                l.lugar, zona,
                categoriaNombre(l.categoria)
            ].join(' ').toLowerCase();
            if (!haystack.includes(search)) return false;
        }

        if (zonaFilter !== 'todas') {
            const zonaLugar = l.zona || inferirZona(l.lat, l.lng);
            if (zonaLugar !== zonaFilter) return false;
        }

        return true;
    });

    currentFilteredEvents = filtered;
    currentFilteredLugares = filteredLugares;
    currentPage = 0;

    displayEvents(filtered);
    displayLugares(filteredLugares);
    updateCounter(filtered.length);
    actualizarEstadisticas(filtered);
    actualizarContadorFiltros();
    mostrarZonaActiva(zonaFilter);
    renderActivePills();
}

// ===== PILLS DE FILTROS ACTIVOS =====
function renderActivePills() {
    const container = document.getElementById('active-filters');
    if (!container) return;

    const pills = [];

    const dateFilter = document.getElementById('filtro-fecha')?.value;
    if (dateFilter && dateFilter !== 'todos') {
        const labels = {
            'hoy': '🔥 Hoy',
            'finde': '🎉 Fin de semana',
            'semana': '📅 Próximos 7 días',
            'mes': '📆 Este mes'
        };
        pills.push({
            label: labels[dateFilter] || dateFilter,
            remove: () => {
                const el = document.getElementById('filtro-fecha');
                if (el) el.value = 'todos';
                applyFilters();
            }
        });
    }

    const zonaFilter = document.getElementById('filtro-zona')?.value;
    if (zonaFilter && zonaFilter !== 'todas') {
        pills.push({
            label: `📍 ${i18n.t('zone.' + zonaFilter, zonaFilter)}`,
            remove: () => {
                const el = document.getElementById('filtro-zona');
                if (el) el.value = 'todas';
                applyFilters();
            }
        });
    }

    const allTypes = ['concierto', 'fiesta', 'mercado', 'cultural', 'gastronomia', 'deporte', 'infantil'];
    const activeTypes = Array.from(document.querySelectorAll('.chip input[type="checkbox"]'))
        .filter(cb => allTypes.includes(cb.value) && !cb.checked);

    if (activeTypes.length > 0 && activeTypes.length < allTypes.length) {
        pills.push({
            label: `🎭 ${activeTypes.length} tipo${activeTypes.length > 1 ? 's' : ''} oculto${activeTypes.length > 1 ? 's' : ''}`,
            remove: () => {
                document.querySelectorAll('.chip input[type="checkbox"]').forEach(cb => {
                    if (allTypes.includes(cb.value)) cb.checked = true;
                });
                applyFilters();
            }
        });
    }

    const precioMax = parseInt(document.getElementById('filtro-precio-max')?.value || 100);
    if (precioMax < 100) {
        pills.push({
            label: precioMax === 0 ? '💚 Solo gratis' : `💰 Hasta ${precioMax}€`,
            remove: () => {
                const slider = document.getElementById('filtro-precio-max');
                if (slider) {
                    slider.value = 100;
                    slider.dispatchEvent(new Event('input'));
                }
            }
        });
    }

    const search = document.getElementById('search')?.value;
    if (search && search.trim()) {
        pills.push({
            label: `🔍 "${search.substring(0, 20)}${search.length > 20 ? '...' : ''}"`,
            remove: () => {
                const el = document.getElementById('search');
                if (el) el.value = '';
                applyFilters();
            }
        });
    }

    if (pills.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = pills.map((pill, index) => `
        <div class="filter-pill" style="animation-delay: ${index * 0.05}s;">
            ${pill.label}
            <button class="remove-filter"
                    onclick="event.preventDefault(); (${pill.remove.toString()})();"
                    aria-label="Quitar filtro">
                ×
            </button>
        </div>
    `).join('');
}

function mostrarZonaActiva(zona) {
    // Mantenida por compatibilidad
}

function actualizarContadorFiltros() {
    const badge = document.getElementById('filtros-count-badge');
    if (!badge) return;

    let count = 0;

    const zona = document.getElementById('filtro-zona')?.value;
    if (zona && zona !== 'todas') count++;

    const fecha = document.getElementById('filtro-fecha')?.value;
    if (fecha && fecha !== 'todos') count++;

    const tiposDesactivados = Array.from(
        document.querySelectorAll('.chip input[type="checkbox"]')
    ).filter(cb => !cb.checked).length;
    if (tiposDesactivados > 0) count++;

    const precioMax = parseInt(document.getElementById('filtro-precio-max')?.value || 100);
    if (precioMax < 100) count++;

    const search = document.getElementById('search')?.value;
    if (search && search.trim()) count++;

    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function clearFilters() {
    const searchEl = document.getElementById('search');
    if (searchEl) searchEl.value = '';

    const filtroFecha = document.getElementById('filtro-fecha');
    if (filtroFecha) filtroFecha.value = 'todos';

    const filtroZona = document.getElementById('filtro-zona');
    if (filtroZona) filtroZona.value = 'todas';

    const slider = document.getElementById('filtro-precio-max');
    if (slider) {
        slider.value = 100;
        slider.dispatchEvent(new Event('input'));
    }

    document.querySelectorAll('.chip input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });

    const selectAllCb = document.getElementById('lugares-select-all');
    if (selectAllCb) {
        selectAllCb.checked = true;
        selectAllCb.indeterminate = false;
    }

    document.querySelectorAll('.quick-filter').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });

    applyFilters();
}

// ===== QUICK FILTERS =====
function initQuickFilters() {
    const quickFilters = document.querySelectorAll('.quick-filter');

    quickFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            const isActive = btn.classList.contains('active');

            btn.classList.toggle('active');
            btn.setAttribute('aria-pressed', (!isActive).toString());

            switch (filter) {
                case 'hoy': {
                    const el = document.getElementById('filtro-fecha');
                    if (el) el.value = isActive ? 'todos' : 'hoy';
                    break;
                }
                case 'finde': {
                    const el = document.getElementById('filtro-fecha');
                    if (el) el.value = isActive ? 'todos' : 'finde';
                    break;
                }
                case 'gratis':
                    document.querySelectorAll('.chip input[value="pago"]').forEach(cb => {
                        cb.checked = isActive;
                    });
                    break;
                case 'infantil': {
                    const infantilCb = document.querySelector('.chip input[value="infantil"]');
                    if (infantilCb) infantilCb.checked = !isActive;
                    break;
                }
            }

            applyFilters();
        });
    });
}

// ===== SLIDERS =====
function initSliderPrecio() {
    const slider = document.getElementById('filtro-precio-max');
    const label = document.getElementById('precio-valor-label');
    if (!slider || !label) return;

    function actualizarSlider() {
        const val = parseInt(slider.value);
        slider.style.setProperty('--pct', val + '%');

        if (val >= 100) {
            label.textContent = i18n.t('filters.price.any');
        } else if (val === 0) {
            label.textContent = 'Solo ' + i18n.t('badge.free').toLowerCase();
        } else {
            label.textContent = `hasta ${val}€`;
        }
        applyFilters();
    }

    slider.addEventListener('input', actualizarSlider);
    actualizarSlider();
}

function initDistanceFilter() {
    const slider = document.getElementById('filtro-distancia');
    const label = document.getElementById('distancia-valor-label');
    const section = document.getElementById('distance-filter-section');
    const info = document.getElementById('distancia-info');

    if (!slider || !label || !section) return;

    function updateDistanceFilterVisibility() {
        if (userLocation) {
            section.style.display = 'block';
            if (info) {
                info.classList.add('success');
                info.innerHTML = '<i class="fas fa-check-circle"></i> Filtrando eventos cercanos';
            }
        } else {
            section.style.display = 'none';
        }
    }

    function actualizarSlider() {
        const val = parseInt(slider.value);
        maxDistance = val;
        slider.style.setProperty('--pct', ((val - 1) / 19 * 100) + '%');
        if (label) label.textContent = `${val} km`;

        if (userLocation) {
            updateDistanceCircle();
            applyFilters();

            if (info) {
                const count = currentFilteredEvents.length;
                info.innerHTML = `<i class="fas fa-check-circle"></i> ${count} ${count === 1 ? 'evento' : 'eventos'} a menos de ${val} km`;
            }
        }
    }

    slider.addEventListener('input', actualizarSlider);
    updateDistanceFilterVisibility();
    actualizarSlider();
    window.addEventListener('geolocationChanged', updateDistanceFilterVisibility);
}

function updateDistanceCircle() {
    if (distanceCircle) {
        map.removeLayer(distanceCircle);
        distanceCircle = null;
    }

    if (!userLocation) return;

    distanceCircle = L.circle([userLocation.lat, userLocation.lng], {
        color: '#0A84FF',
        fillColor: '#0A84FF',
        fillOpacity: 0.1,
        radius: maxDistance * 1000,
        weight: 2,
        dashArray: '5, 5',
        className: 'distance-circle'
    }).addTo(map);
}

function isEventInDistance(evento) {
    if (!userLocation) return true;
    const distancia = calcularDistancia(
        userLocation.lat, userLocation.lng,
        evento.lat, evento.lng
    );
    return distancia <= maxDistance;
}

// ===== GEOLOCALIZACIÓN =====
function initGeolocate() {
    const btn = document.getElementById('btn-geolocate');
    if (!btn) return;

    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            desactivarGeolocalizacion();
            return;
        }
        if (!navigator.geolocation) {
            mostrarToast('Tu navegador no soporta geolocalización', 'error');
            return;
        }
        btn.classList.add('loading');
        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        mostrarToast('📍 Buscando tu ubicación...');

        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            enableHighAccuracy: true, timeout: 8000, maximumAge: 60000
        });
    });
}

function onGeoSuccess(position) {
    const { latitude, longitude } = position.coords;
    const btn = document.getElementById('btn-geolocate');

    userLocation = { lat: latitude, lng: longitude };

    if (btn) {
        btn.classList.remove('loading');
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
        btn.setAttribute('aria-label', 'Desactivar ubicación');
    }

    map.setView([latitude, longitude], 14);
    colocarMarkerUsuario(latitude, longitude);
    updateDistanceCircle();

    window.dispatchEvent(new Event('geolocationChanged'));

    displayEvents(currentFilteredEvents.length ? currentFilteredEvents : allEvents);
    displayLugares(currentFilteredLugares.length ? currentFilteredLugares : allLugares);

    applyFilters();
    mostrarToast('✅ Ubicación encontrada', 'success');

    if ('vibrate' in navigator) {
        navigator.vibrate(100);
    }
}

function onGeoError(error) {
    const btn = document.getElementById('btn-geolocate');
    if (btn) {
        btn.classList.remove('loading');
        btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
    }

    const mensajes = {
        1: '❌ Permiso denegado',
        2: '❌ Posición no disponible',
        3: '❌ Tiempo de espera agotado'
    };

    mostrarToast(mensajes[error.code] || '❌ Error desconocido', 'error');
}

function colocarMarkerUsuario(lat, lng) {
    if (userMarker) map.removeLayer(userMarker);
    const icon = L.divIcon({
        html: '<div class="user-marker"></div>',
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    userMarker = L.marker([lat, lng], { icon, zIndexOffset: 1000 })
        .bindPopup('<div class="popup-evento"><h3>📍 Tu ubicación</h3><p>Estás aquí</p></div>')
        .addTo(map);
}

function desactivarGeolocalizacion() {
    const btn = document.getElementById('btn-geolocate');
    if (btn) {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
        btn.setAttribute('aria-label', 'Activar mi ubicación');
    }

    if (userMarker) { map.removeLayer(userMarker); userMarker = null; }
    if (distanceCircle) { map.removeLayer(distanceCircle); distanceCircle = null; }

    userLocation = null;
    window.dispatchEvent(new Event('geolocationChanged'));
    map.setView([40.4168, -3.7038], 12);

    displayEvents(allEvents);
    displayLugares(allLugares);
    applyFilters();

    mostrarToast('📍 Geolocalización desactivada');
}

// ===== TOAST CON UNDO =====
let currentUndoCallback = null;

function mostrarToastConUndo(mensaje, undoCallback, tipo = 'normal') {
    document.querySelector('.geo-toast')?.remove();

    const toast = document.createElement('div');
    toast.className = `geo-toast ${tipo === 'error' ? 'error' : tipo === 'success' ? 'success' : ''}`;

    if (undoCallback) {
        toast.innerHTML = `
            <span>${mensaje}</span>
            <button onclick="ejecutarUndo()" style="background:none;border:none;color:inherit;font-weight:700;margin-left:12px;cursor:pointer;text-decoration:underline;">
                DESHACER
            </button>
        `;
        currentUndoCallback = undoCallback;
    } else {
        toast.textContent = mensaje;
    }

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.remove();
            currentUndoCallback = null;
        }, 300);
    }, 5000);
}

function ejecutarUndo() {
    if (currentUndoCallback) {
        currentUndoCallback();
        document.querySelector('.geo-toast')?.remove();
        currentUndoCallback = null;
    }
}

function mostrarToast(mensaje, tipo = 'normal') {
    mostrarToastConUndo(mensaje, null, tipo);
}

// ===== HELPERS DE DISTANCIA =====
function calcularDistancia(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatearDistancia(km) {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function getDistanciaHTML(evento) {
    return getDistanciaHTMLCoords(evento.lat, evento.lng);
}

function getDistanciaHTMLCoords(lat, lng) {
    if (!userLocation) return '';
    const distancia = calcularDistancia(userLocation.lat, userLocation.lng, lat, lng);
    const texto = formatearDistancia(distancia);
    const color = distancia < 1 ? '#30D158' : distancia < 5 ? '#FF9F0A' : '#FF453A';
    return `<span class="distancia-badge" style="color:${color}">
        <i class="fas fa-walking"></i> ${texto}
    </span>`;
}

// ===== ESTADÍSTICAS =====
function actualizarEstadisticas(eventos) {
    const stats = {
        concierto: 0, fiesta: 0, mercado: 0,
        cultural: 0, gastronomia: 0,
        deporte: 0, infantil: 0, gratis: 0
    };
    eventos.forEach(evento => {
        if (stats[evento.tipo] !== undefined) stats[evento.tipo]++;
        if (evento.precio === 'gratis') stats.gratis++;
    });
    animarContador('stat-conciertos', stats.concierto);
    animarContador('stat-fiestas', stats.fiesta);
    animarContador('stat-mercados', stats.mercado);
    animarContador('stat-cultural', stats.cultural);
    animarContador('stat-gastronomia', stats.gastronomia);
    animarContador('stat-deporte', stats.deporte);
    animarContador('stat-infantil', stats.infantil);
    animarContador('stat-gratis', stats.gratis);
}

function animarContador(elementId, valorFinal) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    const duracion = 1000;
    const pasos = 60;
    const incremento = valorFinal / pasos;
    let valorActual = 0;
    const intervalo = setInterval(() => {
        valorActual += incremento;
        if (valorActual >= valorFinal) {
            elemento.textContent = valorFinal;
            clearInterval(intervalo);
        } else {
            elemento.textContent = Math.floor(valorActual);
        }
    }, duracion / pasos);
}

function updateCounter(count) {
    const counter = document.getElementById('event-count');
    if (counter) counter.textContent = count;
}

// ===== BANNER HOY =====
function iniciarBannerHoy() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const eventosHoy = allEvents.filter(e => {
        const fechaInicio = new Date(e.fecha + 'T00:00:00');
        const fechaFin = e.fecha_fin ? new Date(e.fecha_fin + 'T00:00:00') : fechaInicio;
        return fechaInicio <= hoy && fechaFin >= hoy;
    });

    const badge = document.getElementById('hoy-badge');
    const count = document.getElementById('hoy-badge-count');

    if (eventosHoy.length === 0) {
        if (badge) badge.style.display = 'none';
        return;
    }

    if (count) count.textContent = eventosHoy.length;
    if (badge) badge.style.display = 'flex';
}

// ===== CHARTS =====
function initCharts() {
    Object.values(charts).forEach(chart => chart?.destroy());

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#EBEBF5' : '#3A3A3C';
    const gridColor = isDark ? '#2C2C2E' : '#E5E5EA';

    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = gridColor;

    const tiposData = {
        labels: [
            i18n.t('stats.concerts'),
            i18n.t('stats.parties'),
            i18n.t('stats.markets'),
            i18n.t('stats.cultural'),
            i18n.t('stats.gastro'),
            i18n.t('stats.sports'),
            i18n.t('stats.kids')
        ],
        datasets: [{
            label: 'Eventos',
            data: [
                currentFilteredEvents.filter(e => e.tipo === 'concierto').length,
                currentFilteredEvents.filter(e => e.tipo === 'fiesta').length,
                currentFilteredEvents.filter(e => e.tipo === 'mercado').length,
                currentFilteredEvents.filter(e => e.tipo === 'cultural').length,
                currentFilteredEvents.filter(e => e.tipo === 'gastronomia').length,
                currentFilteredEvents.filter(e => e.tipo === 'deporte').length,
                currentFilteredEvents.filter(e => e.tipo === 'infantil').length,
            ],
            backgroundColor: [
                colors.concierto, colors.fiesta, colors.mercado,
                colors.cultural, colors.gastronomia, colors.deporte, colors.infantil
            ]
        }]
    };

    const ctxTipos = document.getElementById('chart-tipos');
    if (ctxTipos) {
        charts.tipos = new Chart(ctxTipos, {
            type: 'doughnut',
            data: tiposData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    const zonasCounts = {};
    currentFilteredEvents.forEach(e => {
        const zona = getZonaEvento(e);
        zonasCounts[zona] = (zonasCounts[zona] || 0) + 1;
    });

    const topZonas = Object.entries(zonasCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const zonasData = {
        labels: topZonas.map(z => i18n.t('zone.' + z[0], z[0])),
        datasets: [{
            label: 'Eventos',
            data: topZonas.map(z => z[1]),
            backgroundColor: '#0A84FF',
            borderColor: '#0A84FF',
            borderWidth: 1
        }]
    };

    const ctxZonas = document.getElementById('chart-zonas');
    if (ctxZonas) {
        charts.zonas = new Chart(ctxZonas, {
            type: 'bar',
            data: zonasData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }
        });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const timelineData = [];
    const timelineLabels = [];

    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const count = currentFilteredEvents.filter(e => {
            const eventStart = new Date(e.fecha);
            const eventEnd = e.fecha_fin ? new Date(e.fecha_fin) : eventStart;
            eventStart.setHours(0, 0, 0, 0);
            eventEnd.setHours(0, 0, 0, 0);
            return date >= eventStart && date <= eventEnd;
        }).length;

        timelineLabels.push(date.getDate() + '/' + (date.getMonth() + 1));
        timelineData.push(count);
    }

    const ctxTimeline = document.getElementById('chart-timeline');
    if (ctxTimeline) {
        charts.timeline = new Chart(ctxTimeline, {
            type: 'line',
            data: {
                labels: timelineLabels,
                datasets: [{
                    label: 'Eventos activos',
                    data: timelineData,
                    borderColor: '#0A84FF',
                    backgroundColor: 'rgba(10, 132, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
            }
        });
    }
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const monthNames = [
        i18n.t('months.january'), i18n.t('months.february'), i18n.t('months.march'), i18n.t('months.april'),
        i18n.t('months.may'), i18n.t('months.june'), i18n.t('months.july'), i18n.t('months.august'),
        i18n.t('months.september'), i18n.t('months.october'), i18n.t('months.november'), i18n.t('months.december')
    ];

    const monthYearEl = document.getElementById('calendar-month-year');
    if (monthYearEl) {
        monthYearEl.textContent = `${monthNames[month]} ${year}`;
    }

    // Update weekday headers dynamically
    const weekdayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const weekdayEls = document.querySelectorAll('.calendar-weekdays .weekday');
    weekdayEls.forEach((el, index) => {
        if (weekdayKeys[index]) {
            el.textContent = i18n.t('calendar.weekdays.' + weekdayKeys[index]);
        }
    });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;

    const daysInMonth = lastDay.getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const grid = document.getElementById('calendar-grid');
    if (!grid) return;

    grid.innerHTML = '';

    for (let i = startDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        const cell = createCalendarDay(day, month - 1, year, true);
        grid.appendChild(cell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = createCalendarDay(day, month, year, false);
        grid.appendChild(cell);
    }

    const remainingCells = 42 - (startDay + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        const cell = createCalendarDay(day, month + 1, year, true);
        grid.appendChild(cell);
    }
}

function createCalendarDay(day, month, year, isOtherMonth) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    cell.setAttribute('role', 'button');
    cell.setAttribute('tabindex', '0');

    if (isOtherMonth) cell.classList.add('other-month');

    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date.toDateString() === today.toDateString()) {
        cell.classList.add('today');
    }

    const eventsOnDay = allEvents.filter(e => {
        const eventStart = new Date(e.fecha);
        const eventEnd = e.fecha_fin ? new Date(e.fecha_fin) : eventStart;
        eventStart.setHours(0, 0, 0, 0);
        eventEnd.setHours(0, 0, 0, 0);
        return date >= eventStart && date <= eventEnd;
    });

    cell.innerHTML = `
        <div class="calendar-day-number">${day}</div>
        ${eventsOnDay.length > 0 ? `
            <div class="calendar-day-events-count">
                <i class="fas fa-circle" style="font-size:4px;"></i>
                ${eventsOnDay.length} ${eventsOnDay.length === 1 ? i18n.t('calendar.event') : i18n.t('calendar.events')}
            </div>
            <div class="calendar-day-dots">
                ${eventsOnDay.slice(0, 5).map(e =>
                    `<div class="calendar-dot ${e.tipo}"></div>`
                ).join('')}
            </div>
        ` : ''}
    `;

    if (!isOtherMonth && eventsOnDay.length > 0) {
        cell.addEventListener('click', (e) => showDayEvents(date, eventsOnDay, e));
        cell.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') showDayEvents(date, eventsOnDay, e);
        });
    }

    return cell;
}

function showDayEvents(date, events, e) {
    const container = document.getElementById('calendar-day-events');
    const title = document.getElementById('calendar-day-title');
    const list = document.getElementById('calendar-day-list');

    if (!container || !title || !list) return;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const langLocale = i18n.getLanguage() === 'es' ? 'es-ES' : 
                      i18n.getLanguage() === 'en' ? 'en-US' :
                      i18n.getLanguage() === 'fr' ? 'fr-FR' :
                      i18n.getLanguage() === 'pt' ? 'pt-PT' :
                      i18n.getLanguage() === 'de' ? 'de-DE' :
                      i18n.getLanguage() === 'it' ? 'it-IT' :
                      i18n.getLanguage() === 'zh' ? 'zh-CN' :
                      i18n.getLanguage() === 'ja' ? 'ja-JP' :
                      i18n.getLanguage() === 'ko' ? 'ko-KR' : 'es-ES';
    title.textContent = date.toLocaleDateString(langLocale, options);

    list.innerHTML = events.map(evento => renderEventCard(evento)).join('');

    container.style.display = 'block';
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    if (e && e.currentTarget) {
        e.currentTarget.classList.add('selected');
    }
}

function getCurrentLocale() {
    const lang = i18n?.getLanguage() || 'es';
    const locales = {
        'es': 'es-ES', 'en': 'en-US', 'fr': 'fr-FR', 'pt': 'pt-PT',
        'de': 'de-DE', 'it': 'it-IT', 'zh': 'zh-CN', 'ja': 'ja-JP', 'ko': 'ko-KR'
    };
    return locales[lang] || 'es-ES';
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(getCurrentLocale(), { day: 'numeric', month: 'short' });
}

function formatearFechaSafe(fechaInicio, fechaFin) {
    const fecha1 = parsearFecha(fechaInicio);
    if (!fecha1) return i18n?.t('common.date_tbd') || 'Fecha a confirmar';

    const locale = getCurrentLocale();
    const opciones = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const textoFecha1 = fecha1.toLocaleDateString(locale, opciones);

    if (fechaFin) {
        const fecha2 = parsearFecha(fechaFin);
        if (fecha2) {
            if (fecha1.getMonth() === fecha2.getMonth() &&
                fecha1.getFullYear() === fecha2.getFullYear()) {
                return `${fecha1.getDate()}-${fecha2.getDate()} ${fecha2.toLocaleDateString(locale, { month: 'short', year: 'numeric' })}`;
            }
            return `${textoFecha1} - ${fecha2.toLocaleDateString(locale, opciones)}`;
        }
    }
    return textoFecha1;
}

function parsearFecha(fechaStr) {
    if (!fechaStr) return null;
    try {
        const s = String(fechaStr).split(' ')[0];
        const fecha = new Date(s + 'T00:00:00');
        if (isNaN(fecha.getTime())) return null;
        return fecha;
    } catch (e) {
        return null;
    }
}

function limpiarDescripcion(descripcion, maxLength = 150) {
    if (!descripcion) return '';
    let texto = descripcion
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();
    if (texto.length < 10) return '';
    if (texto.length > maxLength) {
        const ultimoEspacio = texto.lastIndexOf(' ', maxLength);
        texto = ultimoEspacio > maxLength * 0.8
            ? texto.substring(0, ultimoEspacio) + '...'
            : texto.substring(0, maxLength) + '...';
    }
    return texto;
}

function ocultarLoader(numEventos) {
    const loader = document.getElementById('loader');
    const count = document.getElementById('loader-count');
    if (count) count.textContent = `✅ ${numEventos} eventos cargados`;
    setTimeout(() => {
        if (loader) loader.classList.add('oculto');
    }, 600);
}

// ===== COLLAPSIBLE GROUPS =====
function initCollapseGroups() {
    const headers = document.querySelectorAll('.filter-group-header');

    headers.forEach(header => {
        // Manejar caso especial: lugares-header-filter -> lugares-content
        let groupId = header.id.replace('-header-filter', '-content');
        // Caso normal: eventos-header -> eventos-content
        groupId = groupId.replace('-header', '-content');
        const content = document.getElementById(groupId);

        if (!content) return;

        header.addEventListener('click', () => {
            const isCollapsed = content.classList.contains('collapsed');
            content.classList.toggle('collapsed');
            const icon = header.querySelector('i');
            if (icon) icon.classList.toggle('collapsed');
            header.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
        });
    });
}

// ===== LUGARES SELECT ALL =====
function initLugaresSelectAll() {
    const selectAllCb = document.getElementById('lugares-select-all');
    const categoriaCbs = document.querySelectorAll('.lugar-categoria-cb');

    if (!selectAllCb) return;

    selectAllCb.addEventListener('change', () => {
        categoriaCbs.forEach(cb => {
            cb.checked = selectAllCb.checked;
        });
        applyFilters();
    });

    categoriaCbs.forEach(cb => {
        cb.addEventListener('change', () => {
            const allChecked = Array.from(categoriaCbs).every(c => c.checked);
            const noneChecked = Array.from(categoriaCbs).every(c => !c.checked);

            if (allChecked) {
                selectAllCb.checked = true;
                selectAllCb.indeterminate = false;
            } else if (noneChecked) {
                selectAllCb.checked = false;
                selectAllCb.indeterminate = false;
            } else {
                selectAllCb.indeterminate = true;
            }

            applyFilters();
        });
    });
}

// ===== LUGARES LIST TOGGLE =====
function initLugaresListToggle() {
    const toggleBtn = document.getElementById('lugares-toggle-btn');
    const lugaresHeader = document.getElementById('lugares-header-filter');

    if (!toggleBtn || !lugaresHeader) return;

    toggleBtn.addEventListener('click', () => {
        const content = document.getElementById('lugares-content');
        if (content) {
            content.classList.toggle('collapsed');
            toggleBtn.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', content.classList.contains('collapsed') ? 'false' : 'true');
            
            // Guardar estado de categorías en localStorage
            const checkboxes = content.querySelectorAll('.lugar-categoria-cb');
            const categorias = {};
            checkboxes.forEach(cb => {
                categorias[cb.value] = cb.checked;
            });
            localStorage.setItem('lugares_categorias', JSON.stringify(categorias));
            
            // Aplicar filtros inmediatamente
            applyFilters();
        }
    });
}

// ===== SETTINGS PANEL =====
function initSettingsPanel() {
    const settingsToggle = document.getElementById('settings-toggle');
    const bottomNavSettings = document.getElementById('bottom-nav-settings');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettings = document.getElementById('close-settings');

    if (!settingsPanel) return;

    // Event listeners para abrir settings
    const openSettings = () => {
        settingsPanel.classList.add('active');
        settingsPanel.setAttribute('aria-modal', 'true');
        
        // Inicializar features premium al abrir settings
        initPremiumFeatures();
    };

    if (settingsToggle) {
        settingsToggle.addEventListener('click', openSettings);
    }

    if (bottomNavSettings) {
        bottomNavSettings.addEventListener('click', openSettings);
    }

    if (closeSettings) {
        closeSettings.addEventListener('click', () => {
            settingsPanel.classList.remove('active');
            settingsPanel.setAttribute('aria-modal', 'false');
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = (savedTheme === 'dark');

        themeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            mostrarToast(i18n.t(newTheme === 'dark' ? 'toast.theme_dark' : 'toast.theme_light'));
            const statsPanel = document.getElementById('stats-panel');
            if (statsPanel && statsPanel.classList.contains('active')) {
                initCharts();
            }
        });
    }

    const contrastToggle = document.getElementById('contrast-toggle');
    if (contrastToggle) {
        const savedContrast = localStorage.getItem('contrast') || 'normal';
        document.documentElement.setAttribute('data-contrast', savedContrast);
        contrastToggle.checked = (savedContrast === 'high');

        contrastToggle.addEventListener('change', (e) => {
            const newContrast = e.target.checked ? 'high' : 'normal';
            document.documentElement.setAttribute('data-contrast', newContrast);
            localStorage.setItem('contrast', newContrast);
            mostrarToast(e.target.checked
                ? '♿ Alto contraste activado'
                : '♿ Alto contraste desactivado');
        });
    }

    const largeTextToggle = document.getElementById('large-text-toggle');
    if (largeTextToggle) {
        const savedLargeText = localStorage.getItem('largeText') === 'true';
        document.documentElement.setAttribute('data-large-text', savedLargeText);
        largeTextToggle.checked = savedLargeText;

        largeTextToggle.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-large-text', e.target.checked);
            localStorage.setItem('largeText', e.target.checked);
            mostrarToast(e.target.checked
                ? '🔍 Textos grandes activados'
                : '🔍 Textos normales');
        });
    }

    const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
    if (reduceMotionToggle) {
        const savedReduceMotion = localStorage.getItem('reduceMotion') === 'true';
        document.documentElement.setAttribute('data-reduce-motion', savedReduceMotion);
        reduceMotionToggle.checked = savedReduceMotion;

        reduceMotionToggle.addEventListener('change', (e) => {
            document.documentElement.setAttribute('data-reduce-motion', e.target.checked);
            localStorage.setItem('reduceMotion', e.target.checked);
            mostrarToast(e.target.checked
                ? '🎬 Animaciones reducidas'
                : '✨ Animaciones normales');
        });
    }

    const langSelect = document.getElementById('lang-select');
    if (langSelect && typeof i18n !== 'undefined') {
        langSelect.value = i18n.getLanguage();

        langSelect.addEventListener('change', (e) => {
            i18n.setLanguage(e.target.value);
            mostrarToast(i18n.t('toast.lang_changed'));
            // Recargar eventos y lugares para actualizar popups con nuevo idioma
            displayEvents(currentFilteredEvents);
            displayLugares(currentFilteredLugares.length ? currentFilteredLugares : allLugares);
        });
    }

    const translateToggle = document.getElementById('translate-events-toggle');
    if (translateToggle) {
        const saved = localStorage.getItem('translateEvents') === 'true';
        translateToggle.checked = saved;
        if (typeof i18n !== 'undefined') {
            i18n.translateEvents = saved;
        }

        translateToggle.addEventListener('change', (e) => {
            if (typeof i18n !== 'undefined') {
                i18n.translateEvents = e.target.checked;
            }
            localStorage.setItem('translateEvents', e.target.checked);
            mostrarToast(i18n.t(e.target.checked ? 'toast.translate_on' : 'toast.translate_off'));
            displayEvents(currentFilteredEvents);
        });
    }

    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        const saved = localStorage.getItem('notifications');
        notificationsToggle.checked = saved !== 'false';

        notificationsToggle.addEventListener('change', (e) => {
            localStorage.setItem('notifications', e.target.checked);
            mostrarToast(i18n.t(e.target.checked
                ? 'toast.notifications_on'
                : 'toast.notifications_off'));
        });
    }

    const saveSearchesToggle = document.getElementById('save-searches-toggle');
    if (saveSearchesToggle) {
        const saved = localStorage.getItem('saveSearches');
        saveSearchesToggle.checked = saved !== 'false';

        saveSearchesToggle.addEventListener('change', (e) => {
            localStorage.setItem('saveSearches', e.target.checked);
            mostrarToast(i18n.t(e.target.checked
                ? 'toast.searches_on'
                : 'toast.searches_off'));
        });
    }

    const clearCacheBtn = document.getElementById('btn-clear-cache');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas limpiar todos los datos?')) {
                const theme = localStorage.getItem('theme');
                const lang = localStorage.getItem('language');
                localStorage.clear();
                localStorage.setItem('theme', theme || 'dark');
                localStorage.setItem('language', lang || 'es');
                mostrarToast(i18n.t('toast.data_cleared'));
                setTimeout(() => window.location.reload(), 1000);
            }
        });
    }
}

// ===== VIEW DENSITY TOGGLE =====
function initViewDensity() {
    const comfortableBtn = document.getElementById('density-comfortable');
    const compactBtn = document.getElementById('density-compact');

    if (!comfortableBtn || !compactBtn) return;

    comfortableBtn.addEventListener('click', () => {
        currentDensity = 'comfortable';
        comfortableBtn.classList.add('active');
        compactBtn.classList.remove('active');
        comfortableBtn.setAttribute('aria-pressed', 'true');
        compactBtn.setAttribute('aria-pressed', 'false');
        renderListView(currentFilteredEvents);
    });

    compactBtn.addEventListener('click', () => {
        currentDensity = 'compact';
        compactBtn.classList.add('active');
        comfortableBtn.classList.remove('active');
        compactBtn.setAttribute('aria-pressed', 'true');
        comfortableBtn.setAttribute('aria-pressed', 'false');
        renderListView(currentFilteredEvents);
    });
}

// ===== INFINITE SCROLL =====
function initInfiniteScroll() {
    const sentinel = document.getElementById('scroll-sentinel');
    if (!sentinel) return;

    scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isLoadingMore) {
                loadMoreEvents();
            }
        });
    }, { rootMargin: '100px' });

    scrollObserver.observe(sentinel);
}

function loadMoreEvents() {
    if (isLoadingMore) return;

    const totalEvents = currentFilteredEvents.length;
    const currentlyShown = (currentPage + 1) * eventsPerPage;

    if (currentlyShown >= totalEvents) return;

    isLoadingMore = true;
    currentPage++;

    const skeletonList = document.getElementById('skeleton-list');
    if (skeletonList) skeletonList.style.display = 'flex';

    setTimeout(() => {
        renderListView(currentFilteredEvents);
        isLoadingMore = false;
        if (skeletonList) skeletonList.style.display = 'none';
    }, 300);
}

// ===== SCROLL TO TOP FAB =====
function initScrollToTop() {
    const fab = document.getElementById('fab-scroll-top');
    const listView = document.getElementById('list-view');

    if (!fab || !listView) return;

    listView.addEventListener('scroll', () => {
        if (listView.scrollTop > 500) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    });

    fab.addEventListener('click', () => {
        listView.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== SWIPE GESTURES =====
function initSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    const views = ['map', 'list', 'calendar'];

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartX - touchEndX;
        const currentViewIndex = views.indexOf(currentView);

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentViewIndex < views.length - 1) {
                switchView(views[currentViewIndex + 1]);
            } else if (diff < 0 && currentViewIndex > 0) {
                switchView(views[currentViewIndex - 1]);
            }
        }
    }
}

// ===== PULL TO REFRESH =====
function initPullToRefresh() {
    if (window.innerWidth > 640) return;

    let touchStartY = 0;
    let touchEndY = 0;
    let isPulling = false;

    const listView = document.getElementById('list-view');
    if (!listView) return;

    listView.addEventListener('touchstart', e => {
        if (listView.scrollTop === 0) {
            touchStartY = e.touches[0].clientY;
            isPulling = true;
        }
    }, { passive: true });

    listView.addEventListener('touchmove', e => {
        if (!isPulling) return;
        touchEndY = e.touches[0].clientY;
    }, { passive: true });

    listView.addEventListener('touchend', () => {
        if (!isPulling) return;
        const pullDistance = touchEndY - touchStartY;

        if (pullDistance > 100) {
            mostrarToast('🔄 Actualizando eventos...');
            if ('vibrate' in navigator) navigator.vibrate(50);
            setTimeout(() => {
                loadEvents();
                mostrarToast('✅ Eventos actualizados', 'success');
            }, 1000);
        }
        isPulling = false;
    });
}

/* ================================================================
   PREMIUM FEATURES - TEMAS + HEATMAP + RUTAS
   ================================================================ */

// ===== SISTEMA DE TEMAS PERSONALIZADOS =====
function initThemeSystem() {
    console.log('🎨 Inicializando sistema de temas...');
    
    const themeCards = document.querySelectorAll('.theme-card');
    const customColorToggle = document.getElementById('custom-color-toggle');
    const customColorSection = document.getElementById('custom-color-picker-section');
    const accentColorPicker = document.getElementById('accent-color-picker');

    if (!themeCards.length) {
        console.warn('⚠️ No se encontraron theme cards');
        return;
    }

    const savedTheme = localStorage.getItem('themePreset') || 'default';
    const savedCustomColor = localStorage.getItem('customAccentColor');

    if (savedCustomColor) {
        if (customColorToggle) customColorToggle.checked = true;
        if (customColorSection) customColorSection.style.display = 'block';
        if (accentColorPicker) accentColorPicker.value = savedCustomColor;
        applyCustomColor(savedCustomColor);
    } else {
        applyThemePreset(savedTheme);
    }

    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const preset = card.dataset.themePreset;
            
            if (customColorToggle && customColorToggle.checked) {
                customColorToggle.checked = false;
                if (customColorSection) customColorSection.style.display = 'none';
                localStorage.removeItem('customAccentColor');
            }

            themeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            applyThemePreset(preset);
            
            localStorage.setItem('themePreset', preset);
            mostrarToast(`✨ Tema "${card.querySelector('.theme-name').textContent}" activado`);
            
            const statsPanel = document.getElementById('stats-panel');
            if (statsPanel && statsPanel.classList.contains('active')) {
                setTimeout(() => initCharts(), 100);
            }
        });
    });

    if (customColorToggle) {
        customColorToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (customColorSection) customColorSection.style.display = 'block';
                themeCards.forEach(c => c.classList.remove('active'));
                if (accentColorPicker) applyCustomColor(accentColorPicker.value);
                mostrarToast('🎨 Color personalizado activado');
            } else {
                if (customColorSection) customColorSection.style.display = 'none';
                localStorage.removeItem('customAccentColor');
                applyThemePreset('default');
                const defaultCard = document.querySelector('[data-theme-preset="default"]');
                if (defaultCard) defaultCard.classList.add('active');
                mostrarToast('🎨 Tema por defecto restaurado');
            }
        });
    }

    if (accentColorPicker) {
        accentColorPicker.addEventListener('input', (e) => {
            applyCustomColor(e.target.value);
        });

        accentColorPicker.addEventListener('change', (e) => {
            localStorage.setItem('customAccentColor', e.target.value);
            mostrarToast('🎨 Color guardado');
        });
    }

    console.log('✅ Sistema de temas inicializado');
}

function applyThemePreset(preset) {
    console.log('🎨 Aplicando tema:', preset);
    currentThemePreset = preset;
    document.documentElement.setAttribute('data-theme-preset', preset);
    customAccentColor = null;
    
    setTimeout(() => {
        const accentColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent').trim();
        console.log('✅ Color de acento:', accentColor);
    }, 100);
}

function applyCustomColor(color) {
    console.log('🎨 Aplicando color custom:', color);
    customAccentColor = color;
    const root = document.documentElement;
    
    root.removeAttribute('data-theme-preset');
    
    const rgb = hexToRgb(color);
    const hoverColor = lightenColor(color, 20);
    
    root.style.setProperty('--accent', color);
    root.style.setProperty('--accent-hover', hoverColor);
    root.style.setProperty('--accent-subtle', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 10, g: 132, b: 255 };
}

function lightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
}

// ===== MODO EXPLORACIÓN INTERACTIVA (HEATMAP) =====
function initHeatmapMode() {
    console.log('🌈 Inicializando heatmap...');
    
    const heatmapToggle = document.getElementById('heatmap-toggle');
    const heatmapControls = document.getElementById('heatmap-controls');
    const heatmapRadiusSlider = document.getElementById('heatmap-radius');

    if (!heatmapToggle) {
        console.warn('⚠️ Toggle de heatmap no encontrado');
        return;
    }

    heatmapToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            if (heatmapControls) heatmapControls.style.display = 'block';
            activateHeatmap();
            mostrarToast('🌈 Mapa de calor activado');
        } else {
            if (heatmapControls) heatmapControls.style.display = 'none';
            deactivateHeatmap();
            mostrarToast('🌈 Mapa de calor desactivado');
        }
    });

    if (heatmapRadiusSlider) {
        heatmapRadiusSlider.addEventListener('input', (e) => {
            heatmapRadius = parseInt(e.target.value);
            if (heatmapLayer) {
                updateHeatmap();
            }
        });
    }

    console.log('✅ Heatmap inicializado');
}

function activateHeatmap() {
    if (!map) return;

    const eventos = currentFilteredEvents.length > 0 ? currentFilteredEvents : allEvents;
    
    if (eventos.length === 0) {
        mostrarToast('⚠️ No hay eventos para mostrar', 'error');
        const toggle = document.getElementById('heatmap-toggle');
        if (toggle) toggle.checked = false;
        return;
    }

    if (!heatmapLayer) {
        heatmapLayer = L.layerGroup().addTo(map);
    }

    const coordMap = {};
    eventos.forEach(evento => {
        const key = `${evento.lat.toFixed(3)},${evento.lng.toFixed(3)}`;
        coordMap[key] = coordMap[key] || { lat: evento.lat, lng: evento.lng, count: 0 };
        coordMap[key].count++;
    });

    const maxCount = Math.max(...Object.values(coordMap).map(p => p.count));
    
    Object.values(coordMap).forEach(point => {
        const intensity = point.count / maxCount;
        const radius = heatmapRadius * 30 * (0.5 + intensity);
        
        L.circle([point.lat, point.lng], {
            radius: radius,
            fillColor: getHeatColor(intensity),
            fillOpacity: 0.3 + (intensity * 0.3),
            stroke: false,
            interactive: false,
            className: 'heatmap-circle'
        }).addTo(heatmapLayer);
    });

    showHeatmapLegend();
    console.log(`✅ Heatmap creado con ${Object.keys(coordMap).length} puntos`);
}

function updateHeatmap() {
    deactivateHeatmap();
    activateHeatmap();
}

function getHeatColor(intensity) {
    if (intensity < 0.25) return '#3498DB';
    if (intensity < 0.5) return '#2ECC71';
    if (intensity < 0.75) return '#F39C12';
    return '#E74C3C';
}

function deactivateHeatmap() {
    if (heatmapLayer) {
        map.removeLayer(heatmapLayer);
        heatmapLayer = null;
    }
    hideHeatmapLegend();
}

function showHeatmapLegend() {
    let legend = document.querySelector('.heatmap-legend');
    if (!legend) {
        legend = document.createElement('div');
        legend.className = 'heatmap-legend';
        legend.innerHTML = `
            <div class="heatmap-legend-title">Densidad de eventos</div>
            <div class="heatmap-gradient"></div>
            <div class="heatmap-labels">
                <span>Baja</span>
                <span>Alta</span>
            </div>
        `;
        document.body.appendChild(legend);
    }
    legend.classList.add('active');
}

function hideHeatmapLegend() {
    const legend = document.querySelector('.heatmap-legend');
    if (legend) {
        legend.classList.remove('active');
    }
}

// ===== PLANIFICADOR DE RUTAS =====
function initRoutePlanner() {
    console.log('🗺️ Inicializando planificador de rutas...');
    
    const routePlannerBtn = document.getElementById('route-planner-btn');
    const routePanel = document.getElementById('route-panel');
    const closeRoute = document.getElementById('close-route');
    const optimizeRouteBtn = document.getElementById('optimize-route');
    const exportRouteBtn = document.getElementById('export-route');
    const clearRouteBtn = document.getElementById('clear-route');

    if (!routePlannerBtn) {
        console.warn('❌ Botón de planificador no encontrado');
        return;
    }

    routePlannerBtn.addEventListener('click', () => {
        routePlannerMode = !routePlannerMode;
        
        if (routePlannerMode) {
            routePlannerBtn.classList.add('active');
            document.body.classList.add('route-mode');
            
            if (routePanel) {
                routePanel.classList.add('active');
                routePanel.setAttribute('aria-modal', 'true');
            }
            
            enableRouteSelection();
            mostrarToast('🗺️ Click en eventos para añadir a tu ruta', 'success');
        } else {
            routePlannerBtn.classList.remove('active');
            document.body.classList.remove('route-mode');
            disableRouteSelection();
            mostrarToast('🗺️ Modo planificador desactivado');
        }
    });

    if (closeRoute) {
        closeRoute.addEventListener('click', () => {
            routePlannerMode = false;
            routePlannerBtn.classList.remove('active');
            document.body.classList.remove('route-mode');
            disableRouteSelection();
            
            if (routePanel) {
                routePanel.classList.remove('active');
                routePanel.setAttribute('aria-modal', 'false');
            }
        });
    }

    if (optimizeRouteBtn) {
        optimizeRouteBtn.addEventListener('click', optimizeRoute);
    }

    if (exportRouteBtn) {
        exportRouteBtn.addEventListener('click', exportRoute);
    }

    if (clearRouteBtn) {
        clearRouteBtn.addEventListener('click', clearRoute);
    }

    console.log('✅ Planificador de rutas inicializado');
}

function enableRouteSelection() {
    markersLayer.eachLayer(marker => {
        marker.off('click');
        marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            const eventoId = marker.eventoId;
            addEventToRoute(eventoId);
        });
    });
}

function disableRouteSelection() {
    markersLayer.eachLayer(marker => {
        marker.off('click');
    });
}

function addEventToRoute(eventoId) {
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;

    if (selectedRouteEvents.find(e => e.id === eventoId)) {
        mostrarToast('⚠️ Este evento ya está en tu ruta', 'error');
        return;
    }

    selectedRouteEvents.push(evento);
    updateRoutePanel();
    updateRouteOnMap();
    
    mostrarToast(`✅ "${evento.nombre.substring(0, 30)}..." añadido a la ruta`);
    
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

function removeEventFromRoute(eventoId) {
    selectedRouteEvents = selectedRouteEvents.filter(e => e.id !== eventoId);
    updateRoutePanel();
    updateRouteOnMap();
    mostrarToast('🗑️ Evento eliminado de la ruta');
}

function updateRoutePanel() {
    const routeEventsList = document.getElementById('route-events-list');
    const routeEmpty = document.getElementById('route-empty');
    const routeEventsCount = document.getElementById('route-events-count');
    const routeCount = document.getElementById('route-count');
    const optimizeBtn = document.getElementById('optimize-route');
    const exportBtn = document.getElementById('export-route');

    if (!routeEventsList) return;

    const count = selectedRouteEvents.length;
    
    if (routeEventsCount) routeEventsCount.textContent = count;
    
    if (routeCount) {
        if (count > 0) {
            routeCount.textContent = count;
            routeCount.style.display = 'flex';
        } else {
            routeCount.style.display = 'none';
        }
    }

    if (count === 0) {
        routeEventsList.innerHTML = '';
        if (routeEmpty) routeEmpty.style.display = 'block';
        if (optimizeBtn) optimizeBtn.disabled = true;
        if (exportBtn) exportBtn.disabled = true;
        return;
    }

    if (routeEmpty) routeEmpty.style.display = 'none';
    if (optimizeBtn) optimizeBtn.disabled = count < 2;
    if (exportBtn) exportBtn.disabled = false;

    let totalDistance = 0;
    let totalTime = 0;

    routeEventsList.innerHTML = selectedRouteEvents.map((evento, index) => {
        let distanceText = '-';
        
        if (index > 0) {
            const prevEvento = selectedRouteEvents[index - 1];
            const distance = calcularDistancia(
                prevEvento.lat, prevEvento.lng,
                evento.lat, evento.lng
            );
            totalDistance += distance;
            const timeMinutes = Math.round((distance * 30) + 15);
            totalTime += timeMinutes;
            distanceText = formatearDistancia(distance);
        }

        return `
            <div class="route-event-item" style="animation-delay: ${index * 0.05}s;">
                <div class="route-event-number">${index + 1}</div>
                <div class="route-event-info">
                    <div class="route-event-name">${evento.nombre}</div>
                    <div class="route-event-time">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(evento.fecha)}
                    </div>
                </div>
                <div class="route-event-distance">${distanceText}</div>
                <button class="route-event-remove" 
                        onclick="removeEventFromRoute(${evento.id})"
                        aria-label="Eliminar de ruta">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }).join('');

    const totalDistanceEl = document.getElementById('route-total-distance');
    const totalTimeEl = document.getElementById('route-total-time');
    
    if (totalDistanceEl) {
        totalDistanceEl.textContent = totalDistance > 0 
            ? formatearDistancia(totalDistance) 
            : '0 km';
    }
    
    if (totalTimeEl) {
        totalTimeEl.textContent = totalTime > 0 
            ? `${totalTime} min` 
            : '0 min';
    }
}

function updateRouteOnMap() {
    routeMarkers.forEach(marker => map.removeLayer(marker));
    routeMarkers = [];
    
    if (routePolyline) {
        map.removeLayer(routePolyline);
        routePolyline = null;
    }

    if (selectedRouteEvents.length === 0) return;

    selectedRouteEvents.forEach((evento, index) => {
        const icon = L.divIcon({
            html: `<div class="route-marker">${index + 1}</div>`,
            className: '',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        const marker = L.marker([evento.lat, evento.lng], { icon })
            .addTo(map)
            .bindPopup(`
                <div class="popup-evento">
                    <h3>🗺️ Parada ${index + 1}</h3>
                    <p><strong>📍</strong> ${evento.nombre}</p>
                    <p><strong>📅</strong> ${formatDate(evento.fecha)}</p>
                </div>
            `);
        
        routeMarkers.push(marker);
    });

    if (selectedRouteEvents.length >= 2) {
        const latlngs = selectedRouteEvents.map(e => [e.lat, e.lng]);
        routePolyline = L.polyline(latlngs, {
            color: getComputedStyle(document.documentElement)
                .getPropertyValue('--accent').trim(),
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 5',
            className: 'route-line'
        }).addTo(map);

        map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
    }
}

function optimizeRoute() {
    if (selectedRouteEvents.length < 2) return;

    const optimized = [selectedRouteEvents[0]];
    const remaining = selectedRouteEvents.slice(1);

    while (remaining.length > 0) {
        const current = optimized[optimized.length - 1];
        let nearestIndex = 0;
        let minDistance = Infinity;

        remaining.forEach((evento, index) => {
            const distance = calcularDistancia(
                current.lat, current.lng,
                evento.lat, evento.lng
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearestIndex = index;
            }
        });

        optimized.push(remaining[nearestIndex]);
        remaining.splice(nearestIndex, 1);
    }

    selectedRouteEvents = optimized;
    updateRoutePanel();
    updateRouteOnMap();
    
    mostrarToast('✨ Ruta optimizada - Distancia mínima calculada', 'success');
}

function exportRoute() {
    if (selectedRouteEvents.length === 0) return;

    const routeText = selectedRouteEvents.map((evento, index) => 
        `${index + 1}. ${evento.nombre}\n   📅 ${formatDate(evento.fecha)}\n   📍 ${evento.lugar}\n`
    ).join('\n');

    const fullText = `🗺️ MI RUTA EN EVENTOSMADRID\n\n${routeText}\n🌐 Creada en: ${window.location.href}`;

    showExportModal(fullText);
}

function showExportModal(text) {
    const modal = document.createElement('div');
    modal.className = 'route-export-modal';
    modal.innerHTML = `
        <div class="route-export-content">
            <div class="route-export-header">
                <h3>📤 Compartir ruta</h3>
                <button class="close-panel" onclick="this.closest('.route-export-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="route-export-options">
                <button class="route-export-btn" onclick="shareViaWhatsApp('${encodeURIComponent(text)}')">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </button>
                <button class="route-export-btn" onclick="copyRouteText(\`${text.replace(/`/g, '\\`')}\`)">
                    <i class="fas fa-copy"></i>
                    <span>Copiar texto</span>
                </button>
                <button class="route-export-btn" onclick="downloadRouteJSON()">
                    <i class="fas fa-download"></i>
                    <span>Descargar JSON</span>
                </button>
            </div>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));
}

function shareViaWhatsApp(text) {
    window.open(`https://wa.me/?text=${text}`, '_blank');
    document.querySelector('.route-export-modal')?.remove();
}

async function copyRouteText(text) {
    try {
        await navigator.clipboard.writeText(text);
        mostrarToast('✅ Ruta copiada al portapapeles', 'success');
        document.querySelector('.route-export-modal')?.remove();
    } catch {
        mostrarToast('❌ No se pudo copiar', 'error');
    }
}

function downloadRouteJSON() {
    const routeData = {
        eventos: selectedRouteEvents,
        fecha_creacion: new Date().toISOString(),
        total_eventos: selectedRouteEvents.length
    };

    const blob = new Blob([JSON.stringify(routeData, null, 2)], { 
        type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ruta-eventos-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    mostrarToast('💾 Ruta descargada', 'success');
    document.querySelector('.route-export-modal')?.remove();
}

function clearRoute() {
    if (selectedRouteEvents.length === 0) return;

    if (confirm('¿Seguro que quieres limpiar la ruta?')) {
        selectedRouteEvents = [];
        updateRoutePanel();
        updateRouteOnMap();
        mostrarToast('🗑️ Ruta limpiada');
    }
}

// ===== INICIALIZACIÓN DE FEATURES PREMIUM =====
function initPremiumFeatures() {
    console.log('🚀 Inicializando features premium...');
    
    initThemeSystem();
    initHeatmapMode();
    initRoutePlanner();
    
    console.log('✅ Todas las features premium inicializadas');
}

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedContrast = localStorage.getItem('contrast') || 'normal';
    document.documentElement.setAttribute('data-contrast', savedContrast);

    const savedLargeText = localStorage.getItem('largeText') === 'true';
    document.documentElement.setAttribute('data-large-text', savedLargeText);

    const savedReduceMotion = localStorage.getItem('reduceMotion') === 'true';
    document.documentElement.setAttribute('data-reduce-motion', savedReduceMotion);

    initMap();
    loadEvents();
    initGeolocate();
    initSliderPrecio();
    initDistanceFilter();
    initCollapseGroups();
    initLugaresSelectAll();
    initLugaresListToggle();
    initSettingsPanel();
    initQuickFilters();
    initViewDensity();
    initInfiniteScroll();
    initScrollToTop();
    initSwipeGestures();
    initPullToRefresh();

    const fabFilters = document.getElementById('fab-filters');
    if (fabFilters) {
        fabFilters.addEventListener('click', () => {
            const panel = document.getElementById('filters-panel');
            if (panel) {
                panel.classList.add('active');
                panel.setAttribute('aria-modal', 'true');
            }
        });
    }

    const closePanel = document.getElementById('close-panel');
    if (closePanel) {
        closePanel.addEventListener('click', () => {
            const panel = document.getElementById('filters-panel');
            if (panel) {
                panel.classList.remove('active');
                panel.setAttribute('aria-modal', 'false');
            }
        });
    }

    const statsToggle = document.getElementById('stats-toggle');
    if (statsToggle) {
        statsToggle.addEventListener('click', () => {
            const panel = document.getElementById('stats-panel');
            if (panel) {
                panel.classList.add('active');
                panel.setAttribute('aria-modal', 'true');
                setTimeout(() => initCharts(), 100);
            }
        });
    }

    const closeStats = document.getElementById('close-stats');
    if (closeStats) {
        closeStats.addEventListener('click', () => {
            const panel = document.getElementById('stats-panel');
            if (panel) {
                panel.classList.remove('active');
                panel.setAttribute('aria-modal', 'false');
            }
        });
    }

    const favToggle = document.getElementById('favorites-toggle');
    if (favToggle) {
        favToggle.addEventListener('click', () => {
            const panel = document.getElementById('favorites-panel');
            if (panel) {
                panel.classList.add('active');
                panel.setAttribute('aria-modal', 'true');
            }
        });
    }

    const closeFav = document.getElementById('close-favorites');
    if (closeFav) {
        closeFav.addEventListener('click', () => {
            const panel = document.getElementById('favorites-panel');
            if (panel) {
                panel.classList.remove('active');
                panel.setAttribute('aria-modal', 'false');
            }
        });
    }

    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view) switchView(view);
        });
    });

    const bottomNavFavorites = document.getElementById('bottom-nav-favorites');
    if (bottomNavFavorites) {
        bottomNavFavorites.addEventListener('click', () => {
            const panel = document.getElementById('favorites-panel');
            if (panel) {
                panel.classList.add('active');
                panel.setAttribute('aria-modal', 'true');
            }
        });
    }

    const btnToggleLugares = document.getElementById('btn-toggle-lugares');
    if (btnToggleLugares) {
        btnToggleLugares.addEventListener('click', toggleLugares);
    }

    const btnClear = document.getElementById('btn-clear');
    if (btnClear) {
        btnClear.addEventListener('click', clearFilters);
    }

    const calPrev = document.getElementById('calendar-prev');
    if (calPrev) {
        calPrev.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
    }

    const calNext = document.getElementById('calendar-next');
    if (calNext) {
        calNext.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
    }

    const sortBy = document.getElementById('sort-by');
    if (sortBy) {
        sortBy.addEventListener('change', e => {
            currentSort = e.target.value;
            if (currentSort === 'distance' && !userLocation) {
                mostrarToast('📍 Activa tu ubicación primero', 'error');
                e.target.value = 'date';
                currentSort = 'date';
                return;
            }
            currentPage = 0;
            renderListView(currentFilteredEvents);
            renderLugaresList(currentFilteredLugares);
        });
    }

    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.addEventListener('input', applyFilters);

    const filtroFecha = document.getElementById('filtro-fecha');
    if (filtroFecha) filtroFecha.addEventListener('change', applyFilters);

    const filtroZona = document.getElementById('filtro-zona');
    if (filtroZona) filtroZona.addEventListener('change', applyFilters);

    document.querySelectorAll('.chip input').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });

    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        cerrarModalCompartir();
        document.querySelectorAll(
            '.filters-panel.active, .stats-panel.active, ' +
            '.favorites-panel.active, .settings-panel.active'
        ).forEach(panel => {
            const closeBtn = panel.querySelector('.close-panel');
            if (closeBtn) closeBtn.click();
        });
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/eventos-madrid/sw.js')
            .then(reg => console.log('✅ SW registrado:', reg.scope))
            .catch(err => console.log('❌ SW error:', err));
    });
}
// ===== EXPORTACIONES GLOBALES PARA INLINE HANDLERS =====
window.toggleFavorite = toggleFavorite;
window.cerrarModalCompartir = cerrarModalCompartir;
window.copiarLinkEvento = copiarLinkEvento;
window.compartirEvento = compartirEvento;
window.compartirEventoNativo = compartirEventoNativo;
window.compartirLugar = compartirLugar;
window.comoLlegar = comoLlegar;
window.comoLlegarCoords = comoLlegarCoords;
window.clearFilters = clearFilters;
window.verEnMapa = verEnMapa;
window.verLugarEnMapa = verLugarEnMapa;
window.ejecutarUndo = ejecutarUndo;
window.removeEventFromRoute = removeEventFromRoute;
window.shareViaWhatsApp = shareViaWhatsApp;
window.copyRouteText = copyRouteText;
window.downloadRouteJSON = downloadRouteJSON;
