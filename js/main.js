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

// --- Global Helpers ---
const t = (key, vars) => window.i18n ? window.i18n.t(key, vars) : key;

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
    initHeatmapMode();
    initRoutePlanner();
    
    setupEventListeners();
    await loadData();
    
    UI.mostrarToast('🚀 ' + t('common.ready'), 'success');
}

async function loadData() {
    try {
        const [evRes, lugRes] = await Promise.all([fetch('data/eventos.json'), fetch('data/lugares.json')]);
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
}

document.addEventListener('DOMContentLoaded', initApp);

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/eventos-madrid/sw.js').catch(err => console.log('SW error:', err));
    });
}
