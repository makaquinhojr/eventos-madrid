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
// Mostrar eventos en mapa (CORREGIDO)
function displayEvents(events) {
    markersLayer.clearLayers();
    
    events.forEach(event => {
        const color = colors[event.tipo] || '#6B7280';
        const emoji = icons[event.tipo] || '📍';
        
        // Icono corregido con centrado perfecto
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
            className: '', // Importante: vacío para evitar estilos de Leaflet
            iconSize: [40, 40],
            iconAnchor: [20, 20], // Centro del icono
            popupAnchor: [0, -20]  // Popup aparece arriba
        });
        
        const marker = L.marker([event.lat, event.lng], { 
            icon: icon,
            riseOnHover: true
        });
        
        const dateText = event.fecha_fin 
            ? `${formatDate(event.fecha)} - ${formatDate(event.fecha_fin)}`
            : formatDate(event.fecha);
        
        marker.bindPopup(`
            <div class="popup-evento">
                <h3>${event.nombre}</h3>
                <p>📅 ${dateText}</p>
                <p>📍 ${event.lugar}</p>
                <p>💰 ${event.precio === 'gratis' ? '<strong style="color: #059669;">Gratis</strong>' : event.precio_desde || 'De pago'}</p>
                <p style="color: #6B7280; font-size: 13px; margin-top: 8px; line-height: 1.4;">
                    ${event.descripcion}
                </p>
                <a href="${event.url}" target="_blank">Ver más información →</a>
            </div>
        `);
        
        marker.addTo(markersLayer);
    });
}

// Formatear fecha
function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
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
        const el = document.getElementById(`stat-${key}s` || `stat-${key}`);
        if (el) el.textContent = stats[key];
    });
}

// Aplicar filtros
function applyFilters() {
    const search = document.getElementById('search').value.toLowerCase();
    const dateFilter = document.getElementById('filter-date').value;
    
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
    
    displayEvents(filtered);
    updateCounter(filtered.length);
    updateStats(filtered);
}

// Limpiar filtros
function clearFilters() {
    document.getElementById('search').value = '';
    document.getElementById('filter-date').value = 'all';
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
    document.getElementById('filter-date').addEventListener('change', applyFilters);
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
                    </div>
                    
                    <div class="event-description">
                        ${evento.descripcion}
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