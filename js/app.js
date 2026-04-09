// ===== VARIABLES GLOBALES =====
let map;
let allEvents = [];
let currentFilteredEvents = [];
let markersLayer;
let currentView = 'map';
let currentSort = 'date';
let userMarker = null;
let userLocation = null;

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


// ===== MAPA =====
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
}


// ===== CARGAR EVENTOS =====
async function loadEvents() {
    try {
        const response = await fetch('data/eventos.json');
        const events = await response.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        allEvents = events.filter(e => {
            if (!e.nombre || e.nombre.trim() === '') return false;
            const eventDate = new Date(e.fecha_fin || e.fecha);
            return eventDate >= today;
        }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        updateCounter(allEvents.length);
        displayEvents(allEvents);
        actualizarEstadisticas(allEvents);
        iniciarBannerHoy();
        ocultarLoader(allEvents.length);

    } catch (error) {
        console.error('Error cargando eventos:', error);
        ocultarLoader(0);
    }
}


// ===== HELPERS DE LINK =====
function esLinkUtil(url) {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    if (!url.startsWith('http://') && !url.startsWith('https://')) return false;

    const urlLower = url.toLowerCase();

    if (urlLower.includes('madrid.es/portales/munimadrid')) {
        return true;
    }

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
               target="_blank"
               class="popup-link popup-link-google">
                🔍 Buscar en Google
            </a>`;
}

function getBotonMasInfo(evento) {
    const busqueda = encodeURIComponent(`${evento.nombre} Madrid`);
    if (esLinkUtil(evento.url)) {
        return `<a href="${evento.url}" target="_blank" class="event-btn event-btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Más info
                </a>`;
    }
    return `<a href="https://www.google.com/search?q=${busqueda}" target="_blank" class="event-btn event-btn-google">
                <i class="fas fa-search"></i> Buscar
            </a>`;
}


// ===== MOSTRAR EVENTOS EN MAPA =====
function displayEvents(events) {
    markersLayer.clearLayers();

    console.log(`📍 Mostrando ${events.length} eventos`);

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
                ">
                    ${emoji}
                </div>
            `,
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const marker = L.marker([event.lat, event.lng], {
            icon: icon,
            riseOnHover: true
        });

        marker.eventoId = event.id;

        const dateText = formatearFechaSafe(event.fecha, event.fecha_fin);
        const descripcionLimpia = limpiarDescripcion(event.descripcion, 150);
        const linkHTML = getLinkHTML(event);

        const calendarLink = generarLinkCalendar(event);
        const calendarHTML = calendarLink
            ? `<a href="${calendarLink}" target="_blank" class="popup-link popup-link-calendar">
                 📅 Añadir al calendario
               </a>`
            : '';

        const distanciaHTML = userLocation
            ? `<p><strong>🚶</strong> ${getDistanciaHTML(event)}</p>`
            : '';

        marker.bindPopup(`
            <div class="popup-evento">
                <h3>${event.nombre}</h3>
                <p><strong>📅</strong> ${dateText}</p>
                <p><strong>📍</strong> ${event.lugar}</p>
                <p><strong>💰</strong> ${event.precio === 'gratis'
                    ? '<strong style="color:#059669;">Gratis</strong>'
                    : event.precio_desde || 'De pago'}</p>
                ${distanciaHTML}
                ${descripcionLimpia
                    ? `<p style="color:#6B7280;font-size:13px;margin-top:8px;line-height:1.4;">
                         ${descripcionLimpia}
                       </p>`
                    : ''}
                <div class="popup-actions">
                    ${linkHTML}
                    ${calendarHTML}
                </div>
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


// ===== VISTA LISTA =====
function switchView(view) {
    currentView = view;

    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`view-${view}-btn`).classList.add('active');

    document.querySelectorAll('.view-container').forEach(c => c.classList.remove('active'));
    document.getElementById(view === 'map' ? 'map' : 'list-view').classList.add('active');

    if (view === 'list') {
        renderListView(currentFilteredEvents);
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
                const dA = calcularDistancia(userLocation.lat, userLocation.lng, a.lat, a.lng);
                const dB = calcularDistancia(userLocation.lat, userLocation.lng, b.lat, b.lng);
                return dA - dB;
            default:
                return 0;
        }
    });

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    listContainer.innerHTML = sortedEvents.map(evento => {
        const fechaEvento = new Date(evento.fecha);
        const esHoy = fechaEvento.toDateString() === hoy.toDateString();
        const esMañana = fechaEvento.toDateString() === new Date(hoy.getTime() + 86400000).toDateString();

        let proximidadBadge = '';
        if (esHoy) proximidadBadge = '<span class="event-badge hoy">🔥 HOY</span>';
        else if (esMañana) proximidadBadge = '<span class="event-badge hoy">⚡ MAÑANA</span>';

        const precioBadge = evento.precio === 'gratis'
            ? '<span class="event-badge gratis">💚 GRATIS</span>'
            : `<span class="event-badge pago">💰 ${evento.precio_desde || 'Pago'}</span>`;

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
            ? `<a href="${calendarLink}" target="_blank" class="event-btn event-btn-calendar">
                 <i class="fas fa-calendar-plus"></i>
               </a>`
            : '';

        const descripcion = limpiarDescripcion(evento.descripcion, 200);

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
                               ${evento.precio === 'gratis' ? 'Entrada gratuita' : evento.precio_desde || 'De pago'}
                           </div>`
                    }
                </div>

                <div class="event-actions">
                    <button class="event-btn event-btn-primary" onclick="verEnMapa(${evento.id})">
                        <i class="fas fa-map-marked-alt"></i> Ver en mapa
                    </button>
                    ${botonMasInfo}
                    ${botonCalendar}
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


// ===== FILTROS =====
function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const dateFilter = document.getElementById('filtro-fecha').value;

    const types = Array.from(document.querySelectorAll(
        '.chip input[value="concierto"], .chip input[value="fiesta"], ' +
        '.chip input[value="mercado"], .chip input[value="cultural"], ' +
        '.chip input[value="gastronomia"], .chip input[value="deporte"], ' +
        '.chip input[value="infantil"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    const prices = Array.from(document.querySelectorAll(
        '.chip input[value="gratis"], .chip input[value="pago"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    let filtered = allEvents.filter(e => {
        if (types.length && !types.includes(e.tipo)) return false;
        if (prices.length && !prices.includes(e.precio)) return false;
        if (search && !`${e.nombre} ${e.descripcion} ${e.lugar}`.toLowerCase().includes(search)) return false;
        return true;
    });

    if (dateFilter !== 'todos') {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        filtered = filtered.filter(e => {
            const fechaInicio = new Date(e.fecha + 'T00:00:00');
            const fechaFin = e.fecha_fin
                ? new Date(e.fecha_fin + 'T00:00:00')
                : fechaInicio;

            switch (dateFilter) {
                case 'hoy':
                    return fechaInicio <= hoy && fechaFin >= hoy;

                case 'finde':
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

                case 'semana':
                    const semanaFin = new Date(hoy);
                    semanaFin.setDate(hoy.getDate() + 7);
                    return fechaInicio <= semanaFin && fechaFin >= hoy;

                case 'mes':
                    const mesFin = new Date(hoy);
                    mesFin.setDate(hoy.getDate() + 30);
                    return fechaInicio <= mesFin && fechaFin >= hoy;

                default:
                    return true;
            }
        });
    }

    currentFilteredEvents = filtered;
    displayEvents(filtered);
    updateCounter(filtered.length);
    actualizarEstadisticas(filtered);
}

function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('filtro-fecha').value = 'todos';
    document.querySelectorAll('.chip input').forEach(cb => cb.checked = true);
    applyFilters();
}


// ===== HELPERS DE FECHA =====
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
            if (
                fecha1.getMonth() === fecha2.getMonth() &&
                fecha1.getFullYear() === fecha2.getFullYear()
            ) {
                return `${fecha1.getDate()}-${fecha2.getDate()} ${fecha2.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}`;
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


// ===== HELPERS DE TEXTO =====
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


// ===== DISTANCIAS =====
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
    if (!userLocation) return '';

    const distancia = calcularDistancia(
        userLocation.lat, userLocation.lng,
        evento.lat, evento.lng
    );

    const texto = formatearDistancia(distancia);
    const color = distancia < 1 ? '#059669' : distancia < 5 ? '#D97706' : '#DC2626';

    return `<span class="distancia-badge" style="color:${color}">
        <i class="fas fa-walking"></i> ${texto}
    </span>`;
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

        navigator.geolocation.getCurrentPosition(
            onGeoSuccess,
            onGeoError,
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
        userMarker = null;
        userLocation = null;
    }

    map.setView([40.4168, -3.7038], 12);
    displayEvents(allEvents);
    mostrarToast('📍 Geolocalización desactivada');
}


// ===== TOAST =====
function mostrarToast(mensaje, tipo = 'normal') {
    const toastAnterior = document.querySelector('.geo-toast');
    if (toastAnterior) toastAnterior.remove();

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
    document.getElementById('event-count').textContent = count;
}


// ===== TEMA =====
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    document.querySelector('.theme-toggle i').className = isLight ? 'fas fa-moon' : 'fas fa-sun';
}


// ===== BANNER HOY =====
function iniciarBannerHoy() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const eventosHoy = allEvents.filter(e => {
        const fechaInicio = new Date(e.fecha + 'T00:00:00');
        const fechaFin = e.fecha_fin
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


// ===== GOOGLE CALENDAR =====
function generarLinkCalendar(evento) {
    const formatearFechaCalendar = (fechaStr) => {
        if (!fechaStr) return null;
        const fecha = new Date(fechaStr + 'T00:00:00');
        if (isNaN(fecha.getTime())) return null;
        return fecha.toISOString().replace(/-|:|\.\d{3}/g, '').slice(0, 8);
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


// ===== LOADER =====
function ocultarLoader(numEventos) {
    const loader = document.getElementById('loader');
    const count = document.getElementById('loader-count');

    if (count) {
        count.textContent = `✅ ${numEventos} eventos cargados`;
    }

    setTimeout(() => {
        if (loader) {
            loader.classList.add('oculto');
        }
    }, 600);
}


// ===== PWA - SERVICE WORKER =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/eventos-madrid/sw.js')
            .then(reg => console.log('✅ SW registrado:', reg.scope))
            .catch(err => console.log('❌ SW error:', err));
    });
}


// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadEvents();
    initGeolocate();

   // Oscuro por defecto
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.querySelector('.theme-toggle i').className = 'fas fa-moon';
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

    document.getElementById('sort-by').addEventListener('change', (e) => {
        currentSort = e.target.value;

        if (currentSort === 'distance' && !userLocation) {
            mostrarToast('📍 Activa tu ubicación primero', 'error');
            e.target.value = 'date';
            currentSort = 'date';
            return;
        }

        renderListView(currentFilteredEvents);
    });

    document.getElementById('search').addEventListener('input', applyFilters);
    document.getElementById('filtro-fecha').addEventListener('change', applyFilters);
    document.querySelectorAll('.chip input').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });
});