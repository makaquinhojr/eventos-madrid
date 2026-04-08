// Variables globales
let map;
let allEvents = [];
let markersLayer;

const icons = {
    concierto: '🎵',
    fiesta: '🎪',
    mercado: '🛍️',
    cultural: '🎭',
    gastronomia: '🍽️'
};

const colors = {
    concierto: '#7C3AED',
    fiesta: '#DC2626',
    mercado: '#059669',
    cultural: '#2563EB',
    gastronomia: '#D97706'
};

// Inicializar mapa
function initMap() {
    map = L.map('map').setView([40.4168, -3.7038], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    markersLayer = L.layerGroup().addTo(map);
}

// Cargar eventos
async function loadEvents() {
    try {
        const response = await fetch('data/eventos.json');
        const events = await response.json();
        
        // Filtrar futuros
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        allEvents = events.filter(e => {
            const eventDate = new Date(e.fecha_fin || e.fecha);
            return eventDate >= today;
        }).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        
        updateCounter(allEvents.length);
        displayEvents(allEvents);
        updateStats(allEvents);
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Mostrar eventos en mapa
// Mostrar eventos en mapa (MEJORADO)
function displayEvents(events) {
    markersLayer.clearLayers();
    
    console.log(`📍 Mostrando ${events.length} eventos en el mapa`);
    
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
                    position: relative;
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
        
        // SOLUCIÓN PROBLEMA 1: Formatear fechas correctamente
        const dateText = formatearFechaSafe(event.fecha, event.fecha_fin);
        
        // SOLUCIÓN PROBLEMA 3: Limpiar y truncar descripción
        const descripcionLimpia = limpiarDescripcion(event.descripcion, 150);
        
        // SOLUCIÓN PROBLEMA 2: Mostrar link solo si es útil
        const linkHTML = esLinkUtil(event.url) 
            ? `<a href="${event.url}" target="_blank" class="popup-link">Ver más información →</a>`
            : `<p style="color: #6B7280; font-size: 12px; font-style: italic;">ℹ️ Más información en el ayuntamiento local</p>`;
        
        marker.bindPopup(`
            <div class="popup-evento">
                <h3>${event.nombre}</h3>
                <p><strong>📅</strong> ${dateText}</p>
                <p><strong>📍</strong> ${event.lugar}</p>
                <p><strong>💰</strong> ${event.precio === 'gratis' ? '<strong style="color: #059669;">Gratis</strong>' : event.precio_desde || 'De pago'}</p>
                ${userLocation ? `<p><strong>🚶</strong> ${getDistanciaHTML(event)}</p>` : ''}
                ${descripcionLimpia ? `<p style="color: #6B7280; font-size: 13px; margin-top: 8px; line-height: 1.4;">${descripcionLimpia}</p>` : ''}
                ${linkHTML}
            </div>
        `);
        
        marker.addTo(markersLayer);
    });
    
    actualizarEstadisticas(events);
}

// Actualizar contador
function updateCounter(count) {
    document.getElementById('event-count').textContent = count;
}

// Actualizar stats
function updateStats(events) {
    const stats = {
        concierto: 0,
        fiesta: 0,
        mercado: 0,
        cultural: 0,
        gastronomia: 0,
        gratis: 0
    };
    
    events.forEach(e => {
        stats[e.tipo]++;
        if (e.precio === 'gratis') stats.gratis++;
    });
    
    Object.keys(stats).forEach(key => {
        const el = document.getElementById(`stat-${key}`) || document.getElementById(`stat-${key}s`);
        if (el) el.textContent = stats[key];
    });
}

// Aplicar filtros
function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const dateFilter = document.getElementById('filtro-fecha').value;
    
    const types = Array.from(document.querySelectorAll('.chip input[value="concierto"], .chip input[value="fiesta"], .chip input[value="mercado"], .chip input[value="cultural"], .chip input[value="gastronomia"]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    const prices = Array.from(document.querySelectorAll('.chip input[value="gratis"], .chip input[value="pago"]'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    let filtered = allEvents.filter(e => {
        if (types.length && !types.includes(e.tipo)) return false;
        if (prices.length && !prices.includes(e.precio)) return false;
        if (search && !`${e.nombre} ${e.descripcion} ${e.lugar}`.toLowerCase().includes(search)) return false;
        return true;
    });
    
    // Filtro de fecha
    if (dateFilter !== 'todos') {
        filtered = filtered.filter(e => {
            const fecha = new Date(e.fecha);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            switch(dateFilter) {
                case 'hoy':
                    return fecha.toDateString() === hoy.toDateString();
                case 'finde':
                    const dia = hoy.getDay();
                    let fechaInicio, fechaFin;
                    if (dia === 6) { // Sábado
                        fechaInicio = new Date(hoy);
                        fechaFin = new Date(hoy);
                        fechaFin.setDate(hoy.getDate() + 1);
                    } else if (dia === 0) { // Domingo
                        fechaInicio = new Date(hoy);
                        fechaFin = new Date(hoy);
                    } else { // Lunes a viernes
                        const diasHastaSabado = 6 - dia;
                        fechaInicio = new Date(hoy);
                        fechaInicio.setDate(hoy.getDate() + diasHastaSabado);
                        fechaFin = new Date(fechaInicio);
                        fechaFin.setDate(fechaInicio.getDate() + 1);
                    }
                    return fecha >= fechaInicio && fecha <= fechaFin;
                case 'semana':
                    const semanaFin = new Date(hoy);
                    semanaFin.setDate(hoy.getDate() + 7);
                    return fecha >= hoy && fecha <= semanaFin;
                case 'mes':
                    const mesFin = new Date(hoy);
                    mesFin.setDate(hoy.getDate() + 30);
                    return fecha >= hoy && fecha <= mesFin;
                default:
                    return true;
            }
        });
    }
    
    displayEvents(filtered);
    updateCounter(filtered.length);
    updateStats(filtered);
}

// Limpiar filtros
function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('filtro-fecha').value = 'todos';
    document.querySelectorAll('.chip input').forEach(cb => cb.checked = true);
    applyFilters();
}

// Modo oscuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    const icon = document.querySelector('.theme-toggle i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    loadEvents();
    initGeolocate(); // ← AÑADIR ESTA LÍNEA
    
    // Tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').className = 'fas fa-sun';
    }
    
    // Event listeners
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
    
    // Filtros automáticos
    document.getElementById('search').addEventListener('input', applyFilters);
    document.getElementById('filtro-fecha').addEventListener('change', applyFilters);
    document.querySelectorAll('.chip input').forEach(cb => {
        cb.addEventListener('change', applyFilters);
    });
});
// ===== VISTA LISTA =====
let currentView = 'map'; // 'map' o 'list'
let currentSort = 'date';

// Toggle entre vistas
document.getElementById('view-map-btn').addEventListener('click', () => {
    switchView('map');
});

document.getElementById('view-list-btn').addEventListener('click', () => {
    switchView('list');
});

function switchView(view) {
    currentView = view;
    
    // Actualizar botones
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`view-${view}-btn`).classList.add('active');
    
    // Actualizar contenedores
    document.querySelectorAll('.view-container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(view === 'map' ? 'map' : 'list-view').classList.add('active');
    
    // Si cambiamos a lista, renderizarla
    if (view === 'list') {
        renderListView(allEvents);
    }
}

// Ordenar eventos en lista
document.getElementById('sort-by').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderListView(allEvents);
});

// Renderizar vista lista
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
    
    // Ordenar eventos
    const sortedEvents = [...events].sort((a, b) => {
        switch(currentSort) {
            case 'date':
                return new Date(a.fecha) - new Date(b.fecha);
            case 'name':
                return a.nombre.localeCompare(b.nombre);
            case 'type':
                return a.tipo.localeCompare(b.tipo);
            default:
                return 0;
        }
    });
    
    // Generar HTML
    listContainer.innerHTML = sortedEvents.map(evento => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaEvento = new Date(evento.fecha);
        const esHoy = fechaEvento.toDateString() === hoy.toDateString();
        const esMañana = fechaEvento.toDateString() === new Date(hoy.getTime() + 86400000).toDateString();
        
        let proximidadBadge = '';
        if (esHoy) {
            proximidadBadge = '<span class="event-badge hoy">🔥 HOY</span>';
        } else if (esMañana) {
            proximidadBadge = '<span class="event-badge hoy">⚡ MAÑANA</span>';
        }
        
        const precioBadge = evento.precio === 'gratis' 
            ? '<span class="event-badge gratis">💚 GRATIS</span>'
            : `<span class="event-badge pago">💰 ${evento.precio_desde || 'Pago'}</span>`;
        
        const iconEmoji = icons[evento.tipo] || '📍';
        
        const fechaTexto = evento.fecha_fin 
            ? `${formatDate(evento.fecha)} - ${formatDate(evento.fecha_fin)}`
            : formatDate(evento.fecha);
        
        return `
            <div class="event-card">
                <div class="event-icon ${evento.tipo}">
                    ${iconEmoji}
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
                        ${userLocation ? `
                        <div class="event-meta-item distancia">
                            ${getDistanciaHTML(evento)}
                        </div>
                    ` : ''}
                    </div>
                    
                    <div class="event-description">
                        ${limpiarDescripcion(evento.descripcion, 200)}
                    </div>
                </div>
                
                <div class="event-actions">
                    <button class="event-btn event-btn-primary" onclick="verEnMapa(${evento.id})">
                        <i class="fas fa-map-marked-alt"></i> Ver en mapa
                    </button>
                    <a href="${evento.url}" target="_blank" class="event-btn event-btn-secondary">
                        <i class="fas fa-external-link-alt"></i> Más info
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// Ver evento en mapa
function verEnMapa(eventoId) {
    // Cambiar a vista mapa
    switchView('map');
    
    // Buscar evento
    const evento = allEvents.find(e => e.id === eventoId);
    if (!evento) return;
    
    // Centrar mapa y hacer zoom
    map.setView([evento.lat, evento.lng], 15);
    
    // Abrir popup del marker correspondiente
    markersLayer.eachLayer(marker => {
        const popup = marker.getPopup();
        if (popup && popup.getContent().includes(evento.nombre)) {
            marker.openPopup();
        }
    });
}

// Formatear fecha corta
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { 
        day: 'numeric',
        month: 'short'
    });
}

// Actualizar también la función displayEvents para sincronizar con lista
const originalDisplayEvents = displayEvents;
displayEvents = function(events) {
    originalDisplayEvents(events);
    
    // Si estamos en vista lista, actualizarla también
    if (currentView === 'list') {
        renderListView(events);
    }
};

// ===== SOLUCIÓN PROBLEMA 1: Formatear fechas de forma segura =====
function formatearFechaSafe(fechaInicio, fechaFin) {
    // Intentar parsear la fecha
    const fecha1 = parsearFecha(fechaInicio);
    
    if (!fecha1) {
        return 'Fecha a confirmar';
    }
    
    const opciones = { 
        weekday: 'short', 
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };
    
    const textoFecha1 = fecha1.toLocaleDateString('es-ES', opciones);
    
    // Si hay fecha fin
    if (fechaFin) {
        const fecha2 = parsearFecha(fechaFin);
        if (fecha2) {
            const textoFecha2 = fecha2.toLocaleDateString('es-ES', opciones);
            
            // Si es el mismo mes, mostrar compacto
            if (fecha1.getMonth() === fecha2.getMonth() && fecha1.getFullYear() === fecha2.getFullYear()) {
                return `${fecha1.getDate()}-${fecha2.getDate()} ${fecha2.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}`;
            }
            
            return `${textoFecha1} - ${textoFecha2}`;
        }
    }
    
    return textoFecha1;
}

function parsearFecha(fechaStr) {
    if (!fechaStr) return null;
    
    try {
        // Intentar formato ISO (YYYY-MM-DD)
        const fecha = new Date(fechaStr + 'T00:00:00');
        
        // Verificar que la fecha es válida
        if (isNaN(fecha.getTime())) {
            console.warn(`⚠️ Fecha inválida: ${fechaStr}`);
            return null;
        }
        
        return fecha;
    } catch (e) {
        console.warn(`⚠️ Error parseando fecha: ${fechaStr}`, e);
        return null;
    }
}

// ===== SOLUCIÓN PROBLEMA 2: Detectar links útiles =====
function esLinkUtil(url) {
    if (!url) return false;
    
    // Lista de URLs genéricas inútiles
    const urlsGenericas = [
        'madrid.es',
        'esmadrid.com',
        'timeout.es/madrid',
        'datos.madrid.es'
    ];
    
    // Si la URL contiene alguna genérica, verificar que tenga ruta específica
    const urlLower = url.toLowerCase();
    
    for (const generica of urlsGenericas) {
        if (urlLower.includes(generica)) {
            // Si es SOLO el dominio raíz o /agenda genérica, no es útil
            if (
                url.endsWith(generica) || 
                url.endsWith(generica + '/') ||
                url.includes('/agenda-eventos-madrid') ||
                url.includes('/agenda') && url.split('/').length <= 4
            ) {
                return false;
            }
        }
    }
    
    // Si tiene una URL específica con ID o slug, probablemente es útil
    if (url.match(/\/(evento|event|actividad|show)\/[\w-]+/i)) {
        return true;
    }
    
    // Si llega aquí y no es una URL genérica, probablemente es útil
    return !urlLower.includes('madrid.es') || url.length > 50;
}

// ===== SOLUCIÓN PROBLEMA 3: Limpiar y truncar descripciones =====
function limpiarDescripcion(descripcion, maxLength = 150) {
    if (!descripcion) return '';
    
    // Limpiar HTML si existe
    let texto = descripcion
        .replace(/<[^>]*>/g, '') // Quitar tags HTML
        .replace(/&nbsp;/g, ' ') // Reemplazar &nbsp;
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ') // Múltiples espacios → uno
        .trim();
    
    // Si es muy corta o vacía, retornar vacío
    if (texto.length < 10) return '';
    
    // Truncar si es muy larga
    if (texto.length > maxLength) {
        // Buscar el último espacio antes del límite
        const ultimoEspacio = texto.lastIndexOf(' ', maxLength);
        
        if (ultimoEspacio > maxLength * 0.8) {
            texto = texto.substring(0, ultimoEspacio) + '...';
        } else {
            texto = texto.substring(0, maxLength) + '...';
        }
    }
    
    return texto;
}

// ===== DISTANCIAS =====

// Fórmula Haversine: calcula distancia entre dos coordenadas en km
function calcularDistancia(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Formatea la distancia para mostrar
function formatearDistancia(km) {
    if (km < 1) {
        return `${Math.round(km * 1000)} m`;
    }
    return `${km.toFixed(1)} km`;
}

// Obtiene el HTML de distancia para un evento
function getDistanciaHTML(evento) {
    if (!userLocation) return '';
    
    const distancia = calcularDistancia(
        userLocation.lat, 
        userLocation.lng,
        evento.lat, 
        evento.lng
    );
    
    const texto = formatearDistancia(distancia);
    
    // Color según distancia
    let color = '#059669'; // verde - cerca
    if (distancia > 5) color = '#D97706';  // naranja - medio
    if (distancia > 15) color = '#DC2626'; // rojo - lejos
    
    return `
        <span class="distancia-badge" style="color: ${color}">
            <i class="fas fa-walking"></i> ${texto}
        </span>
    `;
}

// ===== GEOLOCALIZACIÓN =====
let userMarker = null;
let userLocation = null;

function initGeolocate() {
    const btn = document.getElementById('btn-geolocate');
    if (!btn) return;

    btn.addEventListener('click', () => {
        // Si ya está activo, desactivar
        if (btn.classList.contains('active')) {
            desactivarGeolocalizacion();
            return;
        }

        // Comprobar soporte
        if (!navigator.geolocation) {
            mostrarToast('Tu navegador no soporta geolocalización', 'error');
            return;
        }

        // Estado: cargando
        btn.classList.add('loading');
        btn.innerHTML = '<i class="fas fa-circle-notch"></i>';
        mostrarToast('📍 Buscando tu ubicación...');

        navigator.geolocation.getCurrentPosition(
            onGeoSuccess,
            onGeoError,
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 60000
            }
        );
    });
}

function onGeoSuccess(position) {
    const { latitude, longitude, accuracy } = position.coords;
    const btn = document.getElementById('btn-geolocate');

    // Guardar posición
    userLocation = { lat: latitude, lng: longitude };

    // Actualizar botón
    btn.classList.remove('loading');
    btn.classList.add('active');
    btn.innerHTML = '<i class="fas fa-location-arrow"></i>';

    // Centrar mapa
    map.setView([latitude, longitude], 14);

    // Poner marker del usuario
    colocarMarkerUsuario(latitude, longitude);

    // ← AÑADIR ESTO: refrescar eventos con distancias
    displayEvents(allEvents);

    // Toast de éxito
    const precisionTexto = accuracy < 100 
        ? '✅ Ubicación encontrada' 
        : '📍 Ubicación aproximada';
    mostrarToast(precisionTexto);
}

function onGeoError(error) {
    const btn = document.getElementById('btn-geolocate');

    // Restaurar botón
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-location-arrow"></i>';

    // Mensaje según tipo de error
    const mensajes = {
        1: '❌ Permiso denegado',
        2: '❌ Posición no disponible',
        3: '❌ Tiempo de espera agotado'
    };

    mostrarToast(mensajes[error.code] || '❌ Error desconocido', 'error');
}

function colocarMarkerUsuario(lat, lng) {
    // Eliminar marker anterior si existe
    if (userMarker) {
        map.removeLayer(userMarker);
    }

    // Crear marker personalizado
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

    // Restaurar botón
    btn.classList.remove('active');
    btn.innerHTML = '<i class="fas fa-location-arrow"></i>';

    // Eliminar marker
    if (userMarker) {
        map.removeLayer(userMarker);
        userMarker = null;
        userLocation = null;
    }

    // Volver a vista general de Madrid
    map.setView([40.4168, -3.7038], 12);

    // ← AÑADIR ESTO: refrescar sin distancias
    displayEvents(allEvents);

    mostrarToast('📍 Geolocalización desactivada');
}

// Toast de notificaciones
function mostrarToast(mensaje, tipo = 'normal') {
    // Eliminar toast anterior si existe
    const toastAnterior = document.querySelector('.geo-toast');
    if (toastAnterior) toastAnterior.remove();

    // Crear toast
    const toast = document.createElement('div');
    toast.className = `geo-toast ${tipo === 'error' ? 'error' : ''}`;
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    // Animar entrada
    setTimeout(() => toast.classList.add('visible'), 10);

    // Animar salida
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}