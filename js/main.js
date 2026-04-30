/* ========================================
   EVENTOSMADRID - MAIN ENTRY POINT
   Modularized & Optimized for Vite
   ======================================== */

// Global CSS & Assets

// Modules
import { AppState } from './modules/store.js';
import { initThemeSystem } from './modules/theme.js';
import { initHeatmapMode } from './modules/heatmap.js';
import { initRoutePlanner } from './modules/routes.js';
import * as UI from './modules/ui-helpers.js';
import * as MapManager from './modules/map-manager.js';
import * as Favorites from './modules/favorites.js';
import * as Sharing from './modules/sharing.js';
import * as Filters from './modules/filters.js';
import * as Renderers from './modules/renderers.js';
import * as Stats from './modules/stats.js';
import { i18n } from './i18n.js';

// --- Global Helpers ---
const t = (key, vars) => i18n ? i18n.t(key, vars) : key;

// --- Global exposure for HTML onclick handlers (legacy support) ---
window.comoLlegar = (id) => {
    const ev = AppState.getEventById(id);
    if (ev) window.open(`https://www.google.com/maps/dir/?api=1&destination=${ev.lat},${ev.lng}`, '_blank');
};
window.verEnMapa = (id) => {
    switchView('map');
    const ev = AppState.getEventById(id);
    if (ev && AppState.map) {
        AppState.map.setView([ev.lat, ev.lng], 15);
        AppState.markersLayer.eachLayer(m => {
            if (m.eventoId === id) AppState.markersLayer.zoomToShowLayer(m, () => m.openPopup());
        });
    }
};
window.verLugarEnMapa = (id) => {
    switchView('map');
    const l = AppState.getLugarById(id);
    if (l && AppState.map) {
        AppState.map.setView([l.lat, l.lng], 16);
        AppState.lugaresLayer.eachLayer(m => {
            if (m.lugarId === id) m.openPopup();
        });
    }
};
window.compartirEvento = (id) => Sharing.compartirEventoNativo(AppState.getEventById(id), t, UI.mostrarToast);
window.compartirLugar = (id) => Sharing.mostrarModalCompartir(AppState.getLugarById(id), t, 'place');
window.toggleFavorite = (id) => {
    Favorites.toggleFavorite(id, t, UI.mostrarToast, () => {
        Favorites.renderFavoritesList(AppState.allEvents, t, window.verEnMapa, window.comoLlegar, window.compartirEvento);
        refreshViews();
    });
};
window.clearFilters = () => Filters.clearFilters({ onEventsFiltered: refreshViews, onLugaresFiltered: refreshViews });

// --- Initialization ---
async function initApp() {
    MapManager.initMap();
    initThemeSystem();
    initHeatmapMode(UI.mostrarToast);
    initRoutePlanner(
        UI.mostrarToast, 
        i18n, 
        UI.trapFocus, 
        refreshViews, 
        UI.formatDate, 
        UI.calcularDistancia, 
        UI.formatearDistancia
    );
    
    setupEventListeners();
    
    try {
        await loadData();
    } catch (err) {
        console.error('Failed to load data:', err);
    } finally {
        // Hide loader
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('oculto');
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }
    
    UI.mostrarToast('🚀 ' + t('common.ready'), 'success');
}

async function loadData() {
    try {
        const [evRes, lugRes] = await Promise.all([
            fetch('data/eventos.json'), 
            fetch('data/lugares.json')
        ]);
        const events = await evRes.json();
        const lugares = await lugRes.json();

        const today = new Date().setHours(0,0,0,0);
        AppState.allEvents = events.filter(e => e.nombre && new Date(e.fecha_fin || e.fecha) >= today)
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        AppState.allLugares = lugares;

        refreshViews();
        Favorites.loadFavorites();
        Favorites.updateFavoritesCount();
    } catch (e) {
        console.error('Data load error:', e);
        UI.mostrarToast(t('common.error_loading'), 'error');
    }
}

function refreshViews() {
    const evs = AppState.currentFilteredEvents.length ? AppState.currentFilteredEvents : AppState.allEvents;
    const lugs = AppState.currentFilteredLugares.length ? AppState.currentFilteredLugares : AppState.allLugares;
    
    // Refresh Map Markers
    if (AppState.markersLayer) {
        AppState.markersLayer.clearLayers();
        evs.forEach(e => AppState.markersLayer.addLayer(MapManager.createEventMarker(e, t)));
    }
    
    if (AppState.lugaresLayer) {
        AppState.lugaresLayer.clearLayers();
        if (AppState.mostrarLugares) lugs.forEach(l => AppState.lugaresLayer.addLayer(MapManager.createLugarMarker(l)));
    }

    if (AppState.currentView === 'list') Renderers.renderListView(evs, t);
    Renderers.renderLugaresList(lugs, t);
    
    const counter = document.getElementById('eventos-totales');
    if (counter) counter.textContent = evs.length;

    // Actualizar estadísticas si el panel está abierto
    if (document.getElementById('stats-panel').classList.contains('active')) {
        Stats.initCharts(evs, t);
    }
}

function switchView(view) {
    AppState.currentView = view;
    document.body.className = `view-${view}`;
    document.querySelectorAll('.view-container').forEach(c => c.classList.toggle('active', c.id.startsWith(view)));
    if (view === 'map' && AppState.map) setTimeout(() => AppState.map.invalidateSize(), 100);
    refreshViews();
}

function setupEventListeners() {
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.addEventListener('input', () => Filters.applyFilters({ onEventsFiltered: refreshViews, onLugaresFiltered: refreshViews }));

    const btnToggleLugares = document.getElementById('btn-toggle-lugares');
    if (btnToggleLugares) btnToggleLugares.addEventListener('click', () => {
        AppState.mostrarLugares = !AppState.mostrarLugares;
        btnToggleLugares.classList.toggle('active', AppState.mostrarLugares);
        refreshViews();
    });

    // Filtros checkboxes, selects and range
    const filterCallbacks = { onEventsFiltered: refreshViews, onLugaresFiltered: refreshViews };
    
    document.querySelectorAll('.chip input, .lugar-categoria-cb, #filtro-fecha, #filtro-zona, #filtro-precio-max, #filtro-distancia')
        .forEach(el => {
            const eventType = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
            el.addEventListener(eventType, () => Filters.applyFilters(filterCallbacks));
        });

    // Update range labels
    const precioMax = document.getElementById('filtro-precio-max');
    if (precioMax) {
        precioMax.addEventListener('input', (e) => {
            const label = document.getElementById('precio-valor-label');
            if (label) label.textContent = e.target.value >= 100 ? t('filters.price.any') : e.target.value + '€';
        });
    }

    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) sortSelect.addEventListener('change', (e) => {
        AppState.currentSort = e.target.value;
        refreshViews();
    });

    // View Density
    document.querySelectorAll('.density-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            AppState.currentDensity = btn.dataset.density;
            document.querySelectorAll('.density-btn').forEach(b => b.classList.toggle('active', b === btn));
            refreshViews();
        });
    });

    // Quick filters
    document.querySelectorAll('.quick-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            // Simplified toggle logic for quick filters
            if (filter === 'hoy') {
                const f = document.getElementById('filtro-fecha');
                if (f) f.value = f.value === 'hoy' ? 'todos' : 'hoy';
            } else if (filter === 'gratis') {
                const cb = document.querySelector('.chip input[value="gratis"]');
                if (cb) cb.checked = !cb.checked;
            } else if (filter === 'infantil') {
                const cb = document.querySelector('.chip input[value="infantil"]');
                if (cb) cb.checked = !cb.checked;
            }
            Filters.applyFilters(filterCallbacks);
        });
    });

    // Panel toggles
    const setupPanel = (toggleId, panelId, closeId, onOpen) => {
        const toggle = document.getElementById(toggleId);
        const panel = document.getElementById(panelId);
        const close = document.getElementById(closeId);
        if (toggle && panel) toggle.addEventListener('click', () => {
            panel.classList.add('active');
            if (onOpen) onOpen();
        });
        if (close && panel) close.addEventListener('click', () => panel.classList.remove('active'));
    };

    setupPanel('fab-filters', 'filters-panel', 'close-panel');
    setupPanel('favorites-toggle', 'favorites-panel', 'close-favorites');
    setupPanel('stats-toggle', 'stats-panel', 'close-stats', () => {
        const evs = AppState.currentFilteredEvents.length ? AppState.currentFilteredEvents : AppState.allEvents;
        setTimeout(() => Stats.initCharts(evs, t), 300);
    });
    setupPanel('settings-toggle', 'settings-panel', 'close-settings');
    setupPanel('bottom-nav-favorites', 'favorites-panel', 'close-favorites');
    setupPanel('bottom-nav-settings', 'settings-panel', 'close-settings');
    setupPanel('routes-toggle', 'route-panel', 'close-route-panel');

    // Language Select
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.value = i18n.currentLang;
        langSelect.addEventListener('change', (e) => {
            i18n.setLanguage(e.target.value);
        });
    }

    // Plan Favorite Route
    const btnPlanRoute = document.getElementById('plan-favorite-route');
    if (btnPlanRoute) btnPlanRoute.addEventListener('click', () => {
        const favEvents = AppState.favorites.map(id => AppState.getEventById(id)).filter(Boolean);
        if (favEvents.length === 0) return UI.mostrarToast(t('favorites.empty_route'), 'warning');
        
        // Open route panel
        document.getElementById('route-panel').classList.add('active');
        
        // Clear existing route and add favorites
        AppState.selectedRouteEvents = [...favEvents];
        window.dispatchEvent(new CustomEvent('updateRoute'));
    });

    // Clear filters button
    const btnClear = document.getElementById('btn-clear');
    if (btnClear) btnClear.addEventListener('click', window.clearFilters);

    // Geolocate
    const btnGeolocate = document.getElementById('btn-geolocate');
    if (btnGeolocate) btnGeolocate.addEventListener('click', () => {
        if (!navigator.geolocation) return UI.mostrarToast('Geolocation not supported', 'error');
        btnGeolocate.classList.add('loading');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                btnGeolocate.classList.remove('loading');
                const { latitude, longitude } = pos.coords;
                AppState.userLocation = { lat: latitude, lng: longitude };
                if (AppState.map) {
                    AppState.map.setView([latitude, longitude], 15);
                    if (AppState.userMarker) AppState.map.removeLayer(AppState.userMarker);
                    AppState.userMarker = L.circleMarker([latitude, longitude], {
                        color: '#0A84FF', fillOpacity: 1, radius: 8, weight: 3
                    }).addTo(AppState.map);
                }
                Filters.applyFilters(filterCallbacks);
                UI.mostrarToast('📍 ' + t('common.location_ready'), 'success');
            },
            () => {
                btnGeolocate.classList.remove('loading');
                UI.mostrarToast('❌ ' + t('common.location_error'), 'error');
            }
        );
    });

    window.addEventListener('languageChanged', refreshViews);
}

document.addEventListener('DOMContentLoaded', initApp);

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/eventos-madrid/sw.js').catch(err => console.log('SW error:', err));
    });
}
