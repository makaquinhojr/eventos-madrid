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
let userMarker = null;
let userLocation = null;
let mostrarLugares = true;
let mostrarLugaresEnLista = true;

const icons = {
    concierto:   '🎵',
    fiesta:      '🎪',
    mercado:     '🛍️',
    cultural:    '🎭',
    gastronomia: '🍽️',
    deporte:     '⚽',
    infantil:    '👶'
};

const colors = {
    concierto:   '#7C3AED',
    fiesta:      '#DC2626',
    mercado:     '#059669',
    cultural:    '#2563EB',
    gastronomia: '#D97706',
    deporte:     '#16A34A',
    infantil:    '#F59E0B'
};

// ===== ICONOS Y COLORES DE LUGARES =====
const lugaresIcons = {
    museo:      '🏛️',
    monumento:  '🗿',
    teatro:     '🎭',
    sala:       '🎵',
    parque:     '🌳',
    galeria:    '🖼️',
    mercado:    '🛍️'
};

const lugaresColors = {
    museo:      '#0891B2',
    monumento:  '#7C3AED',
    teatro:     '#BE185D',
    sala:       '#9333EA',
    parque:     '#16A34A',
    galeria:    '#EA580C',
    mercado:    '#CA8A04'
};

// ===== ZONAS POR COORDENADAS =====
const ZONAS_COORDS = {
    'Centro':                     { lat: 40.4168, lng: -3.7038, radio: 1.5 },
    'Arganzuela':                 { lat: 40.3964, lng: -3.7006, radio: 1.8 },
    'Retiro':                     { lat: 40.4083, lng: -3.6844, radio: 1.8 },
    'Salamanca':                  { lat: 40.4286, lng: -3.6824, radio: 1.5 },
    'Chamartín':                  { lat: 40.4536, lng: -3.6772, radio: 2.0 },
    'Tetuán':                     { lat: 40.4597, lng: -3.7031, radio: 1.5 },
    'Chamberí':                   { lat: 40.4394, lng: -3.7023, radio: 1.5 },
    'Fuencarral':                 { lat: 40.4894, lng: -3.7108, radio: 3.0 },
    'Moncloa':                    { lat: 40.4350, lng: -3.7245, radio: 2.5 },
    'Latina':                     { lat: 40.4061, lng: -3.7364, radio: 2.0 },
    'Carabanchel':                { lat: 40.3828, lng: -3.7364, radio: 2.5 },
    'Usera':                      { lat: 40.3897, lng: -3.7108, radio: 1.5 },
    'Puente de Vallecas':         { lat: 40.3919, lng: -3.6546, radio: 2.0 },
    'Moratalaz':                  { lat: 40.4061, lng: -3.6394, radio: 1.5 },
    'Ciudad Lineal':              { lat: 40.4394, lng: -3.6508, radio: 2.5 },
    'Hortaleza':                  { lat: 40.4772, lng: -3.6394, radio: 3.0 },
    'Villaverde':                 { lat: 40.3469, lng: -3.7108, radio: 2.5 },
    'Villa de Vallecas':          { lat: 40.3736, lng: -3.6197, radio: 2.5 },
    'Vicálvaro':                  { lat: 40.4061, lng: -3.6053, radio: 2.0 },
    'San Blas':                   { lat: 40.4286, lng: -3.6053, radio: 2.5 },
    'Barajas':                    { lat: 40.4772, lng: -3.5800, radio: 3.0 },
    'Getafe':                     { lat: 40.3058, lng: -3.7326, radio: 5.0 },
    'Leganés':                    { lat: 40.3281, lng: -3.7638, radio: 5.0 },
    'Alcorcón':                   { lat: 40.3494, lng: -3.8244, radio: 5.0 },
    'Móstoles':                   { lat: 40.3224, lng: -3.8652, radio: 5.0 },
    'Fuenlabrada':                { lat: 40.2842, lng: -3.7946, radio: 5.0 },
    'Alcalá de Henares':          { lat: 40.4818, lng: -3.3641, radio: 6.0 },
    'Torrejón de Ardoz':          { lat: 40.4599, lng: -3.4794, radio: 5.0 },
    'Alcobendas':                 { lat: 40.5469, lng: -3.6398, radio: 4.0 },
    'Las Rozas':                  { lat: 40.4930, lng: -3.8740, radio: 5.0 },
    'Pozuelo':                    { lat: 40.4350, lng: -3.8138, radio: 4.0 },
    'Majadahonda':                { lat: 40.4728, lng: -3.8726, radio: 4.0 },
    'Collado Villalba':           { lat: 40.6346, lng: -4.0076, radio: 5.0 },
    'Tres Cantos':                { lat: 40.5927, lng: -3.7090, radio: 4.0 },
    'San Sebastián de los Reyes': { lat: 40.5487, lng: -3.6271, radio: 4.0 },
    'Coslada':                    { lat: 40.4233, lng: -3.5645, radio: 3.0 },
    'Rivas Vaciamadrid':          { lat: 40.3561, lng: -3.5234, radio: 4.0 },
    'Aranjuez':                   { lat: 40.0319, lng: -3.6010, radio: 5.0 },
    'Valdemoro':                  { lat: 40.1908, lng: -3.6742, radio: 4.0 },
    'Parla':                      { lat: 40.2390, lng: -3.7754, radio: 4.0 },
    'Torrelodones':               { lat: 40.5756, lng: -3.9287, radio: 4.0 },
    'Boadilla del Monte':         { lat: 40.4067, lng: -3.8760, radio: 4.0 },
    'Arganda del Rey':            { lat: 40.3008, lng: -3.4394, radio: 4.0 },
};

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

async function loadEvents() {
    try {
        const [eventosRes, lugaresRes] = await Promise.all([
            fetch('data/eventos.json'),
            fetch('data/lugares.json')
        ]);

        const events  = await eventosRes.json();
        const lugares = await lugaresRes.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        allEvents = events.filter(e => {
            if (!e.nombre || e.nombre.trim() === '') return false;
            const eventDate = new Date(e.fecha_fin || e.fecha);
            return eventDate >= today;
        }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        allLugares = lugares;

        updateCounter(allEvents.length);
        displayEvents(allEvents);
        displayLugares(allLugares);
        actualizarEstadisticas(allEvents);
        iniciarBannerHoy();
        ocultarLoader(allEvents.length);
        procesarUrlEvento();

    } catch (error) {
        console.error('Error cargando datos:', error);
        ocultarLoader(0);
    }
}

function displayLugares(lugares) {
    lugaresLayer.clearLayers();

    if (!mostrarLugares) return;

    lugares.forEach(lugar => {
        const color = lugaresColors[lugar.categoria] || '#6B7280';
        const emoji = lugaresIcons[lugar.categoria] || '📍';

        const icon = L.divIcon({
            html: `
                <div class="lugar-marker" style="background:${color};">
                    ${emoji}
                </div>
            `,
            className: '',
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            popupAnchor: [0, -20]
        });

        const marker = L.marker([lugar.lat, lugar.lng], {
            icon,
            riseOnHover: true
        });

        marker.lugarId = lugar.id;

        const precioHTML = lugar.precio === 'gratis'
            ? '<strong style="color:#059669;">Gratis</strong>'
            : lugar.precio_desde || 'De pago';

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
                <p><strong>🗺️</strong> ${lugar.zona || inferirZona(lugar.lat, lugar.lng)}</p>
                <p><strong>💰</strong> ${precioHTML}</p>
                <p><strong>🕐</strong> ${lugar.horario || 'Consultar horario'}</p>
                ${distanciaHTML}
                ${lugar.descripcion
                    ? `<p style="color:#6B7280;font-size:13px;margin-top:8px;line-height:1.4;">
                           ${lugar.descripcion}
                       </p>`
                    : ''}
                <div class="popup-actions">
                    <a href="${lugar.url}" target="_blank" class="popup-link">
                        Ver más información →
                    </a>
                </div>
                <div class="popup-acciones-extra">
                    <button class="popup-btn-extra"
                            onclick="comoLlegarCoords(${lugar.lat}, ${lugar.lng}, '${lugar.nombre.replace(/'/g, "\\'")}')">
                        <i class="fas fa-route"></i> Cómo llegar
                    </button>
                    <button class="popup-btn-extra compartir"
                            onclick="compartirLugar('${lugar.id}')">
                        <i class="fas fa-share-alt"></i> Compartir
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
        btn.classList.add('active');
        mostrarToast('🏛️ Lugares de interés visibles');
    } else {
        lugaresLayer.clearLayers();
        btn.classList.remove('active');
        mostrarToast('🏛️ Lugares de interés ocultos');
    }
}

function categoriaNombre(categoria) {
    const nombres = {
        museo:     'Museo',
        monumento: 'Monumento',
        teatro:    'Teatro',
        sala:      'Sala',
        parque:    'Parque',
        galeria:   'Galería',
        mercado:   'Mercado'
    };
    return nombres[categoria] || 'Lugar de interés';
}

function compartirLugar(lugarId) {
    const lugar = allLugares.find(l => l.id === lugarId);
    if (!lugar) return;

    const url   = `${window.location.origin}${window.location.pathname}?lugar=${lugarId}`;
    const emoji = lugaresIcons[lugar.categoria] || '📍';
    const texto = `${emoji} *${lugar.nombre}*\n📍 ${lugar.lugar}\n🕐 ${lugar.horario || 'Ver horarios'}`;

    document.getElementById('modal-compartir')?.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-compartir';
    modal.className = 'modal-compartir-overlay';
    modal.innerHTML = `
        <div class="modal-compartir">
            <div class="modal-compartir-header">
                <span>${emoji} Compartir lugar</span>
                <button class="modal-compartir-close" onclick="cerrarModalCompartir()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-compartir-nombre">${lugar.nombre}</div>
            <div class="modal-compartir-acciones">
                <a class="modal-compartir-btn whatsapp"
                   href="https://wa.me/?text=${encodeURIComponent(texto + '\n\n🗺️ Ver en EventosMadrid: ' + url)}"
                   target="_blank"
                   onclick="cerrarModalCompartir()">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                </a>
                <a class="modal-compartir-btn twitter"
                   href="https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}"
                   target="_blank"
                   onclick="cerrarModalCompartir()">
                    <i class="fab fa-x-twitter"></i>
                    Twitter
                </a>
                <button class="modal-compartir-btn copiar"
                        onclick="copiarLinkEvento('${url}', this)">
                    <i class="fas fa-link"></i>
                    Copiar link
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
        return `<a href="${evento.url}" target="_blank" class="popup-link">
                    Ver más información →
                </a>`;
    }
    const busqueda = encodeURIComponent(`${evento.nombre} Madrid`);
    return `<a href="https://www.google.com/search?q=${busqueda}"
               target="_blank" class="popup-link popup-link-google">
                🔍 Buscar en Google
            </a>`;
}

function getBotonMasInfo(evento) {
    const busqueda = encodeURIComponent(`${evento.nombre} Madrid`);
    if (esLinkUtil(evento.url)) {
        return `<a href="${evento.url}" target="_blank"
                   class="event-btn event-btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Más info
                </a>`;
    }
    return `<a href="https://www.google.com/search?q=${busqueda}"
               target="_blank" class="event-btn event-btn-google">
                <i class="fas fa-search"></i> Buscar
            </a>`;
}

function generarUrlCompartir(evento) {
    const base = window.location.origin + window.location.pathname;
    return `${base}?evento=${evento.id}`;
}

function generarTextoCompartir(evento) {
    const fecha  = formatDate(evento.fecha);
    const precio = evento.precio === 'gratis' ? '¡GRATIS!' : (evento.precio_desde || 'De pago');
    const emoji  = icons[evento.tipo] || '📍';
    return `${emoji} *${evento.nombre}*\n📅 ${fecha}\n📍 ${evento.lugar}\n💰 ${precio}`;
}

function compartirEvento(eventoId) {
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;

    const url   = generarUrlCompartir(evento);
    const texto = generarTextoCompartir(evento);
    const emoji = icons[evento.tipo] || '📍';

    document.getElementById('modal-compartir')?.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-compartir';
    modal.className = 'modal-compartir-overlay';
    modal.innerHTML = `
        <div class="modal-compartir">
            <div class="modal-compartir-header">
                <span>${emoji} Compartir evento</span>
                <button class="modal-compartir-close" onclick="cerrarModalCompartir()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-compartir-nombre">${evento.nombre}</div>
            <div class="modal-compartir-acciones">
                <a class="modal-compartir-btn whatsapp"
                   href="https://wa.me/?text=${encodeURIComponent(texto + '\n\n🗺️ Ver en EventosMadrid: ' + url)}"
                   target="_blank"
                   onclick="cerrarModalCompartir()">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                </a>
                <a class="modal-compartir-btn twitter"
                   href="https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}"
                   target="_blank"
                   onclick="cerrarModalCompartir()">
                    <i class="fab fa-x-twitter"></i>
                    Twitter
                </a>
                <button class="modal-compartir-btn copiar"
                        onclick="copiarLinkEvento('${url}', this)">
                    <i class="fas fa-link"></i>
                    Copiar link
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
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        btn.classList.add('copiado');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copiado');
        }, 2000);
    } catch {
        mostrarToast('❌ No se pudo copiar', 'error');
    }
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

        const marker = L.marker([event.lat, event.lng], {
            icon,
            riseOnHover: true
        });

        marker.eventoId = event.id;

        const dateText    = formatearFechaSafe(event.fecha, event.fecha_fin);
        const descripcion = limpiarDescripcion(event.descripcion, 150);
        const linkHTML    = getLinkHTML(event);
        const zona        = getZonaEvento(event);

        const calendarLink = generarLinkCalendar(event);
        const calendarHTML = calendarLink
            ? `<a href="${calendarLink}" target="_blank"
                  class="popup-link popup-link-calendar">
                    📅 Añadir al calendario
               </a>`
            : '';

        const distanciaHTML = userLocation
            ? `<p><strong>🚶</strong> ${getDistanciaHTML(event)}</p>`
            : '';

        const popupAccionesExtra = `
            <div class="popup-acciones-extra">
                <button class="popup-btn-extra"
                        onclick="comoLlegar(${event.id})">
                    <i class="fas fa-route"></i> Cómo llegar
                </button>
                <button class="popup-btn-extra compartir"
                        onclick="compartirEvento(${event.id})">
                    <i class="fas fa-share-alt"></i> Compartir
                </button>
            </div>
        `;

        marker.bindPopup(`
            <div class="popup-evento">
                <h3>${event.nombre}</h3>
                <p><strong>📅</strong> ${dateText}</p>
                <p><strong>📍</strong> ${event.lugar}</p>
                <p><strong>🗺️</strong> ${zona}</p>
                <p><strong>💰</strong> ${
                    event.precio === 'gratis'
                        ? '<strong style="color:#059669;">Gratis</strong>'
                        : event.precio_desde || 'De pago'
                }</p>
                ${distanciaHTML}
                ${descripcion
                    ? `<p style="color:#6B7280;font-size:13px;
                                 margin-top:8px;line-height:1.4;">
                            ${descripcion}
                       </p>`
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
    }

    actualizarEstadisticas(events);
}

function switchView(view) {
    currentView = view;

    document.querySelectorAll('.view-btn').forEach(btn =>
        btn.classList.remove('active')
    );
    document.getElementById(`view-${view}-btn`).classList.add('active');

    document.querySelectorAll('.view-container').forEach(c =>
        c.classList.remove('active')
    );
    document.getElementById(
        view === 'map' ? 'map' : 'list-view'
    ).classList.add('active');

    if (view === 'list') {
        renderListView(currentFilteredEvents);
        renderLugaresList(currentFilteredLugares);
    }
}

function renderListView(events) {
    const listContainer = document.getElementById('events-list');

    if (events.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No se encontraron eventos</h3>
                <p>Prueba a cambiar los filtros o la búsqueda</p>
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
                return calcularDistancia(
                    userLocation.lat, userLocation.lng, a.lat, a.lng
                ) - calcularDistancia(
                    userLocation.lat, userLocation.lng, b.lat, b.lng
                );
            default:
                return 0;
        }
    });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    listContainer.innerHTML = sortedEvents.map(evento => {
        const fechaEvento = new Date(evento.fecha);
        const esHoy = fechaEvento.toDateString() === hoy.toDateString();
        const esMañana = fechaEvento.toDateString() ===
            new Date(hoy.getTime() + 86400000).toDateString();

        let proximidadBadge = '';
        if (esHoy)         proximidadBadge = '<span class="event-badge hoy">🔥 HOY</span>';
        else if (esMañana) proximidadBadge = '<span class="event-badge hoy">⚡ MAÑANA</span>';

        const precioBadge = evento.precio === 'gratis'
            ? '<span class="event-badge gratis">💚 GRATIS</span>'
            : `<span class="event-badge pago">💰 ${evento.precio_desde || 'Pago'}</span>`;

        const zona      = getZonaEvento(evento);
        const zonaBadge = `<span class="event-badge zona">📍 ${zona}</span>`;

        const fechaTexto = evento.fecha_fin
            ? `${formatDate(evento.fecha)} - ${formatDate(evento.fecha_fin)}`
            : formatDate(evento.fecha);

        const distanciaItem = userLocation ? `
            <div class="event-meta-item distancia">
                ${getDistanciaHTML(evento)}
            </div>
        ` : '';

        const botonMasInfo  = getBotonMasInfo(evento);
        const calendarLink  = generarLinkCalendar(evento);
        const botonCalendar = calendarLink
            ? `<a href="${calendarLink}" target="_blank"
                  class="event-btn event-btn-calendar"
                  title="Añadir al calendario">
                    <i class="fas fa-calendar-plus"></i>
               </a>`
            : '';

        const descripcion = limpiarDescripcion(evento.descripcion, 200);

        const botonComoLlegar = `
            <button class="event-btn event-btn-llegar"
                    onclick="comoLlegar(${evento.id})"
                    title="Cómo llegar">
                <i class="fas fa-route"></i>
            </button>
        `;

        const botonCompartir = `
            <button class="event-btn event-btn-compartir"
                    onclick="compartirEvento(${evento.id})"
                    title="Compartir">
                <i class="fas fa-share-alt"></i>
            </button>
        `;

        return `
            <div class="event-card">
                <div class="event-icon ${evento.tipo}">
                    ${icons[evento.tipo] || '📍'}
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
                               📍 ${evento.lugar} ·
                               ${evento.precio === 'gratis'
                                   ? 'Entrada gratuita'
                                   : evento.precio_desde || 'De pago'}
                           </div>`
                    }
                </div>
                <div class="event-actions">
                    <button class="event-btn event-btn-primary"
                            onclick="verEnMapa(${evento.id})">
                        <i class="fas fa-map-marked-alt"></i> Ver en mapa
                    </button>
                    ${botonMasInfo}
                    <div class="event-actions-row">
                        ${botonCalendar}
                        ${botonComoLlegar}
                        ${botonCompartir}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderLugaresList(lugares) {
    const lugaresSection = document.getElementById('lugares-section');
    const lugaresList = document.getElementById('lugares-list');

    if (!lugares || lugares.length === 0 || !mostrarLugaresEnLista) {
        lugaresSection.style.display = 'none';
        return;
    }

    lugaresSection.style.display = 'block';

    const sortedLugares = [...lugares].sort((a, b) => {
        switch (currentSort) {
            case 'name':
                return a.nombre.localeCompare(b.nombre);
            case 'distance':
                if (!userLocation) return 0;
                return calcularDistancia(
                    userLocation.lat, userLocation.lng, a.lat, a.lng
                ) - calcularDistancia(
                    userLocation.lat, userLocation.lng, b.lat, b.lng
                );
            default:
                return a.nombre.localeCompare(b.nombre);
        }
    });

    lugaresList.innerHTML = sortedLugares.map(lugar => {
        const emoji = lugaresIcons[lugar.categoria] || '📍';
        const color = lugaresColors[lugar.categoria] || '#6B7280';
        const categoriaNom = categoriaNombre(lugar.categoria);
        const zona = lugar.zona || inferirZona(lugar.lat, lugar.lng);

        const precioBadge = lugar.precio === 'gratis'
            ? '<span class="event-badge gratis">💚 GRATIS</span>'
            : `<span class="event-badge pago">💰 ${lugar.precio_desde || 'Pago'}</span>`;

        const zonaBadge = `<span class="event-badge zona">📍 ${zona}</span>`;
        const categoriaBadge = `<span class="lugar-categoria-badge" style="background:${color}20;color:${color};">${emoji} ${categoriaNom}</span>`;

        const distanciaItem = userLocation ? `
            <div class="event-meta-item distancia">
                ${getDistanciaHTMLCoords(lugar.lat, lugar.lng)}
            </div>
        ` : '';

        return `
            <div class="lugar-card">
                <div class="lugar-icon" style="background:${color};">
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
                        : ''
                    }
                </div>
                <div class="event-actions">
                    <button class="event-btn event-btn-primary"
                            onclick="verLugarEnMapa('${lugar.id}')">
                        <i class="fas fa-map-marked-alt"></i> Ver en mapa
                    </button>
                    <a href="${lugar.url}" target="_blank"
                       class="event-btn event-btn-secondary">
                        <i class="fas fa-external-link-alt"></i> Más info
                    </a>
                    <div class="event-actions-row">
                        <button class="event-btn event-btn-llegar"
                                onclick="comoLlegarCoords(${lugar.lat}, ${lugar.lng}, '${lugar.nombre.replace(/'/g, "\\'")}')"
                                title="Cómo llegar">
                            <i class="fas fa-route"></i>
                        </button>
                        <button class="event-btn event-btn-compartir"
                                onclick="compartirLugar('${lugar.id}')"
                                title="Compartir">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function verEnMapa(eventoId) {
    switchView('map');
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;
    map.setView([evento.lat, evento.lng], 15);
    markersLayer.eachLayer(marker => {
        if (marker.eventoId === eventoId) {
            markersLayer.zoomToShowLayer(marker, () => {
                marker.openPopup();
            });
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

// ===== FILTROS ===== ✅ CORREGIDO
function applyFilters() {
    const search     = document.getElementById('search').value.toLowerCase().trim();
    const dateFilter = document.getElementById('filtro-fecha').value;
    const zonaFilter = document.getElementById('filtro-zona')?.value || 'todas';
    const precioMax  = parseInt(
        document.getElementById('filtro-precio-max')?.value || 100
    );

    // Tipos de eventos (NO incluye lugares)
    const types = Array.from(document.querySelectorAll(
        '.chip input[value="concierto"], .chip input[value="fiesta"], ' +
        '.chip input[value="mercado"], .chip input[value="cultural"], ' +
        '.chip input[value="gastronomia"], .chip input[value="deporte"], ' +
        '.chip input[value="infantil"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    const prices = Array.from(document.querySelectorAll(
        '.chip input[value="gratis"], .chip input[value="pago"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    // ✅ CATEGORÍAS DE LUGARES (separado completamente)
    const lugarCategorias = Array.from(document.querySelectorAll('.lugar-categoria-cb'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    console.log('🔍 Filtros aplicados:', {
        search,
        dateFilter,
        zonaFilter,
        types,
        prices,
        lugarCategorias,
        precioMax
    });

    // ========== FILTRAR EVENTOS ==========
    let filtered = allEvents.filter(e => {
        // Filtro de tipo de evento
        if (types.length && !types.includes(e.tipo)) return false;
        
        // Filtro de precio (gratis/pago)
        if (prices.length && !prices.includes(e.precio)) return false;

        // Filtro de búsqueda
        if (search) {
            const zona = getZonaEvento(e);
            const haystack = [
                e.nombre, e.descripcion || '', e.lugar, zona
            ].join(' ').toLowerCase();
            if (!haystack.includes(search)) return false;
        }

        // Filtro de zona
        if (zonaFilter !== 'todas') {
            if (getZonaEvento(e) !== zonaFilter) return false;
        }

        // Filtro de precio máximo
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

    // Filtro de fecha
    if (dateFilter !== 'todos') {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        filtered = filtered.filter(e => {
            const fechaInicio = new Date(e.fecha + 'T00:00:00');
            const fechaFin    = e.fecha_fin
                ? new Date(e.fecha_fin + 'T00:00:00')
                : fechaInicio;

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

    // ========== ✅ FILTRAR LUGARES (SEPARADO) ==========
    let filteredLugares = allLugares.filter(l => {
        // ✅ IMPORTANTE: Si NO hay categorías seleccionadas, NO mostrar NADA
        if (lugarCategorias.length === 0) {
            return false;
        }

        // Filtro de categoría de lugar
        if (!lugarCategorias.includes(l.categoria)) {
            return false;
        }

        // Filtro de búsqueda
        if (search) {
            const zona = l.zona || inferirZona(l.lat, l.lng);
            const haystack = [
                l.nombre,
                l.descripcion || '',
                l.lugar,
                zona,
                categoriaNombre(l.categoria)
            ].join(' ').toLowerCase();
            if (!haystack.includes(search)) return false;
        }

        // Filtro de zona
        if (zonaFilter !== 'todas') {
            const zonaLugar = l.zona || inferirZona(l.lat, l.lng);
            if (zonaLugar !== zonaFilter) return false;
        }

        return true;
    });

    console.log(`✅ Filtrados: ${filtered.length} eventos, ${filteredLugares.length} lugares`);

    currentFilteredEvents = filtered;
    currentFilteredLugares = filteredLugares;

    displayEvents(filtered);
    displayLugares(filteredLugares);
    updateCounter(filtered.length);
    actualizarEstadisticas(filtered);
    actualizarContadorFiltros();
    mostrarZonaActiva(zonaFilter);
}

function mostrarZonaActiva(zona) {
    const select     = document.getElementById('filtro-zona');
    const contenedor = select?.parentElement;
    if (!contenedor) return;

    const anterior = contenedor.querySelector('.zona-badge-activa');
    anterior?.remove();

    if (zona && zona !== 'todas') {
        const badge = document.createElement('div');
        badge.className = 'zona-badge-activa';
        badge.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            ${zona}
            <i class="fas fa-times"></i>
        `;
        badge.addEventListener('click', () => {
            document.getElementById('filtro-zona').value = 'todas';
            applyFilters();
        });
        contenedor.appendChild(badge);
    }
}

function actualizarContadorFiltros() {
    const fab = document.getElementById('fab-filters');
    let count = 0;

    const zona = document.getElementById('filtro-zona')?.value;
    if (zona && zona !== 'todas') count++;

    const fecha = document.getElementById('filtro-fecha')?.value;
    if (fecha && fecha !== 'todos') count++;

    const tiposDesactivados = Array.from(
        document.querySelectorAll('.chip input[type="checkbox"]')
    ).filter(cb => !cb.checked).length;
    if (tiposDesactivados > 0) count++;

    const precioMax = parseInt(
        document.getElementById('filtro-precio-max')?.value || 100
    );
    if (precioMax < 100) count++;

    const search = document.getElementById('search')?.value;
    if (search && search.trim()) count++;

    const lugaresDesactivados = Array.from(
        document.querySelectorAll('.lugar-categoria-cb')
    ).filter(cb => !cb.checked).length;
    if (lugaresDesactivados > 0) count++;

    let badge = fab.querySelector('.filtros-count');
    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'filtros-count';
            fab.appendChild(badge);
        }
        badge.textContent = count;
    } else {
        badge?.remove();
    }
}

function clearFilters() {
    console.log('🧹 Limpiando todos los filtros...');
    
    document.getElementById('search').value = '';
    document.getElementById('filtro-fecha').value = 'todos';

    const zonaSelect = document.getElementById('filtro-zona');
    if (zonaSelect) zonaSelect.value = 'todas';

    const slider = document.getElementById('filtro-precio-max');
    if (slider) {
        slider.value = 100;
        slider.dispatchEvent(new Event('input'));
    }

    // ✅ Marcar TODOS los checkboxes de eventos
    document.querySelectorAll('.chip input[value="concierto"], .chip input[value="fiesta"], ' +
        '.chip input[value="mercado"], .chip input[value="cultural"], ' +
        '.chip input[value="gastronomia"], .chip input[value="deporte"], ' +
        '.chip input[value="infantil"]').forEach(cb => cb.checked = true);
    
    // ✅ Marcar TODOS los checkboxes de precios
    document.querySelectorAll('.chip input[value="gratis"], .chip input[value="pago"]')
        .forEach(cb => cb.checked = true);
    
    // ✅ Marcar TODOS los checkboxes de lugares
    document.querySelectorAll('.lugar-categoria-cb').forEach(cb => cb.checked = true);
    
    const selectAllCb = document.getElementById('lugares-select-all');
    if (selectAllCb) {
        selectAllCb.checked = true;
        selectAllCb.indeterminate = false;
    }
    
    applyFilters();
    console.log('✅ Filtros limpiados');
}

function initSliderPrecio() {
    const slider = document.getElementById('filtro-precio-max');
    const label  = document.getElementById('precio-valor-label');
    if (!slider || !label) return;

    function actualizarSlider() {
        const val = parseInt(slider.value);
        slider.style.setProperty('--pct', val + '%');

        if (val >= 100) {
            label.textContent = 'Cualquiera';
            label.style.color = '';
        } else if (val === 0) {
            label.textContent = 'Solo gratis';
            label.style.color = 'var(--green)';
        } else {
            label.textContent = `hasta ${val}€`;
            label.style.color = '';
        }
        applyFilters();
    }

    slider.addEventListener('input', actualizarSlider);
    actualizarSlider();
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

function formatearFechaSafe(fechaInicio, fechaFin) {
    const fecha1 = parsearFecha(fechaInicio);
    if (!fecha1) return 'Fecha a confirmar';

    const opciones = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    const textoFecha1 = fecha1.toLocaleDateString('es-ES', opciones);

    if (fechaFin) {
        const fecha2 = parsearFecha(fechaFin);
        if (fecha2) {
            if (fecha1.getMonth() === fecha2.getMonth() &&
                fecha1.getFullYear() === fecha2.getFullYear()) {
                return `${fecha1.getDate()}-${fecha2.getDate()} ${
                    fecha2.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
                }`;
            }
            return `${textoFecha1} - ${fecha2.toLocaleDateString('es-ES', opciones)}`;
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

function calcularDistancia(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
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
    const color = distancia < 1 ? '#059669' : distancia < 5 ? '#D97706' : '#DC2626';
    return `<span class="distancia-badge" style="color:${color}">
        <i class="fas fa-walking"></i> ${texto}
    </span>`;
}

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
        navigator.geolocation.getCurrentPosition(
            onGeoSuccess, onGeoError,
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
        );
    });
}

function onGeoSuccess(position) {
    const { latitude, longitude, accuracy } = position.coords;
    const btn = document.getElementById('btn-geolocate');
    userLocation = { lat: latitude, lng: longitude };
    btn.classList.remove('loading');
    btn.classList.add('active');
    btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
    map.setView([latitude, longitude], 14);
    colocarMarkerUsuario(latitude, longitude);
    displayEvents(currentFilteredEvents.length ? currentFilteredEvents : allEvents);
    displayLugares(currentFilteredLugares.length ? currentFilteredLugares : allLugares);
    mostrarToast(accuracy < 100 ? '✅ Ubicación encontrada' : '📍 Ubicación aproximada');
}

function onGeoError(error) {
    const btn = document.getElementById('btn-geolocate');
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
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
        .bindPopup(`
            <div class="popup-evento">
                <h3>📍 Tu ubicación</h3>
                <p>Estás aquí</p>
            </div>
        `)
        .addTo(map);
}

function desactivarGeolocalizacion() {
    const btn = document.getElementById('btn-geolocate');
    btn.classList.remove('active');
    btn.innerHTML = '<i class="fas fa-location-arrow"></i>';
    if (userMarker) {
        map.removeLayer(userMarker);
        userMarker   = null;
        userLocation = null;
    }
    map.setView([40.4168, -3.7038], 12);
    displayEvents(allEvents);
    displayLugares(allLugares);
    mostrarToast('📍 Geolocalización desactivada');
}

function mostrarToast(mensaje, tipo = 'normal') {
    document.querySelector('.geo-toast')?.remove();
    const toast = document.createElement('div');
    toast.className = `geo-toast ${tipo === 'error' ? 'error' : ''}`;
    toast.textContent = mensaje;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

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
    animarContador('stat-conciertos',  stats.concierto);
    animarContador('stat-fiestas',     stats.fiesta);
    animarContador('stat-mercados',    stats.mercado);
    animarContador('stat-cultural',    stats.cultural);
    animarContador('stat-gastronomia', stats.gastronomia);
    animarContador('stat-deporte',     stats.deporte);
    animarContador('stat-infantil',    stats.infantil);
    animarContador('stat-gratis',      stats.gratis);
}

function animarContador(elementId, valorFinal) {
    const elemento = document.getElementById(elementId);
    if (!elemento) return;
    const duracion   = 1000;
    const pasos      = 60;
    const incremento = valorFinal / pasos;
    let valorActual  = 0;
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
    document.getElementById('event-count').textContent = count;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.querySelector('.theme-toggle i').className =
        isDark ? 'fas fa-moon' : 'fas fa-sun';
}

function iniciarBannerHoy() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const eventosHoy = allEvents.filter(e => {
        const fechaInicio = new Date(e.fecha + 'T00:00:00');
        const fechaFin    = e.fecha_fin
            ? new Date(e.fecha_fin + 'T00:00:00')
            : fechaInicio;
        return fechaInicio <= hoy && fechaFin >= hoy;
    });
    const badge = document.getElementById('hoy-badge');
    const count = document.getElementById('hoy-badge-count');
    if (eventosHoy.length === 0) {
        badge.style.display = 'none';
        return;
    }
    count.textContent = eventosHoy.length;
    badge.style.display = 'flex';
    badge.addEventListener('click', () => {
        document.getElementById('filtro-fecha').value = 'hoy';
        applyFilters();
        mostrarToast(`${eventosHoy.length} eventos hoy en Madrid`);
    });
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
        action:   'TEMPLATE',
        text:     evento.nombre,
        dates:    `${inicio}/${fin}`,
        details:  `${evento.descripcion || ''}\n\nMás info: ${evento.url || ''}`,
        location: evento.lugar || 'Madrid'
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function ocultarLoader(numEventos) {
    const loader = document.getElementById('loader');
    const count  = document.getElementById('loader-count');
    if (count) count.textContent = `✅ ${numEventos} eventos cargados`;
    setTimeout(() => {
        if (loader) loader.classList.add('oculto');
    }, 600);
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/eventos-madrid/sw.js')
            .then(reg => console.log('✅ SW registrado:', reg.scope))
            .catch(err => console.log('❌ SW error:', err));
    });
}

// ===== ✅ CORREGIDO: COLLAPSE LUGARES =====
function initLugaresCollapse() {
    const collapseBtn = document.getElementById('lugares-collapse-btn');
    const categoriasDiv = document.getElementById('lugares-categorias');
    
    if (!collapseBtn || !categoriasDiv) {
        console.log('⚠️ No se encontró botón o div de categorías');
        return;
    }
    
    console.log('✅ Collapse de lugares inicializado');
    let isCollapsed = false;
    
    collapseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        isCollapsed = !isCollapsed;
        console.log(`Collapse: ${isCollapsed ? 'cerrado' : 'abierto'}`);
        
        if (isCollapsed) {
            categoriasDiv.style.maxHeight = '0';
            categoriasDiv.style.opacity = '0';
            categoriasDiv.style.marginTop = '0';
            collapseBtn.querySelector('i').className = 'fas fa-chevron-down';
        } else {
            categoriasDiv.style.maxHeight = '500px';
            categoriasDiv.style.opacity = '1';
            categoriasDiv.style.marginTop = '12px';
            collapseBtn.querySelector('i').className = 'fas fa-chevron-up';
        }
    });
}

// ===== ✅ CORREGIDO: SELECT ALL LUGARES =====
function initLugaresSelectAll() {
    const selectAllCb = document.getElementById('lugares-select-all');
    const categoriaCbs = document.querySelectorAll('.lugar-categoria-cb');
    
    if (!selectAllCb) {
        console.log('⚠️ No se encontró checkbox select-all');
        return;
    }
    
    console.log(`✅ Select All inicializado con ${categoriaCbs.length} checkboxes`);
    
    selectAllCb.addEventListener('change', () => {
        const checked = selectAllCb.checked;
        console.log(`✅ Select all: ${checked}`);
        categoriaCbs.forEach(cb => {
            cb.checked = checked;
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
            
            console.log('✅ Categoría cambiada, aplicando filtros...');
            applyFilters();
        });
    });
}

function initLugaresListToggle() {
    const toggleBtn = document.getElementById('lugares-toggle-btn');
    const lugaresHeader = document.getElementById('lugares-header');
    
    if (!toggleBtn || !lugaresHeader) return;
    
    lugaresHeader.addEventListener('click', () => {
        mostrarLugaresEnLista = !mostrarLugaresEnLista;
        
        if (mostrarLugaresEnLista) {
            toggleBtn.querySelector('i').className = 'fas fa-chevron-up';
            renderLugaresList(currentFilteredLugares);
        } else {
            toggleBtn.querySelector('i').className = 'fas fa-chevron-down';
            document.getElementById('lugares-list').innerHTML = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadEvents();
    initGeolocate();
    initSliderPrecio();
    initLugaresCollapse();
    initLugaresSelectAll();
    initLugaresListToggle();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').className = 'fas fa-moon';
    } else {
        document.querySelector('.theme-toggle i').className = 'fas fa-sun';
    }

    document.getElementById('fab-filters').addEventListener('click', () => {
        document.getElementById('filters-panel').classList.add('active');
    });
    document.getElementById('close-panel').addEventListener('click', () => {
        document.getElementById('filters-panel').classList.remove('active');
    });
    document.getElementById('stats-toggle').addEventListener('click', () => {
        document.getElementById('stats-panel').classList.add('active');
    });
    document.getElementById('close-stats').addEventListener('click', () => {
        document.getElementById('stats-panel').classList.remove('active');
    });

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('btn-clear').addEventListener('click', clearFilters);
    document.getElementById('view-map-btn').addEventListener('click', () => switchView('map'));
    document.getElementById('view-list-btn').addEventListener('click', () => switchView('list'));

    document.getElementById('btn-toggle-lugares')
        ?.addEventListener('click', toggleLugares);

    document.getElementById('sort-by').addEventListener('change', e => {
        currentSort = e.target.value;
        if (currentSort === 'distance' && !userLocation) {
            mostrarToast('📍 Activa tu ubicación primero', 'error');
            e.target.value = 'date';
            currentSort = 'date';
            return;
        }
        renderListView(currentFilteredEvents);
        renderLugaresList(currentFilteredLugares);
    });

    document.getElementById('search').addEventListener('input', applyFilters);
    document.getElementById('filtro-fecha').addEventListener('change', applyFilters);
    document.getElementById('filtro-zona')?.addEventListener('change', applyFilters);
    document.querySelectorAll('.chip input').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') cerrarModalCompartir();
    });
});