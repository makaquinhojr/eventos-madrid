/* ========================================
   MAP MANAGER - EventosMadrid
   ======================================== */

import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { AppState } from './store.js';
import { icons, colors, lugaresIcons, lugaresColors } from './constants.js';
import { formatearFechaSafe, limpiarDescripcion, getLinkHTML } from './ui-helpers.js';

export function initMap() {
    const map = L.map('map', {
        zoomControl: false // We usually move it or use custom
    }).setView([40.4168, -3.7038], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    AppState.map = map;
    AppState.markersLayer = L.markerClusterGroup({
        chunkedLoading: true,
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        animate: true
    }).addTo(map);

    AppState.lugaresLayer = L.layerGroup().addTo(map);
    
    return map;
}

export function createEventMarker(event, t, callbacks) {
    const color = colors[event.tipo] || '#6B7280';
    const emoji = icons[event.tipo] || '📍';

    const icon = L.divIcon({
        html: `
            <div class="custom-marker" style="background: ${color};">
                ${emoji}
            </div>
        `,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });

    const marker = L.marker([event.lat, event.lng], { icon });
    marker.eventoId = event.id;

    const popupContent = createPopupContent(event, t);
    marker.bindPopup(popupContent, { maxWidth: 280 });

    return marker;
}

function createPopupContent(event, t) {
    const dateText = formatearFechaSafe(event.fecha, event.fecha_fin);
    const desc = limpiarDescripcion(event.descripcion, 120);
    const linkHTML = getLinkHTML(event, t);
    
    return `
        <div class="popup-evento">
            <h3>${event.nombre}</h3>
            <p><strong>📅</strong> ${dateText}</p>
            <p><strong>📍</strong> ${event.lugar}</p>
            <div class="popup-actions">
                ${linkHTML}
            </div>
            <div class="popup-acciones-extra">
                <button class="popup-btn-extra" onclick="window.comoLlegar(${event.id})">
                    <i class="fas fa-route"></i> ${t('event.how_to_get')}
                </button>
                <button class="popup-btn-extra compartir" onclick="window.compartirEvento(${event.id})">
                    <i class="fas fa-share-alt"></i> ${t('event.share')}
                </button>
            </div>
        </div>
    `;
}

export function createLugarMarker(lugar) {
    const color = lugaresColors[lugar.categoria] || '#6B7280';
    const emoji = lugaresIcons[lugar.categoria] || '📍';

    const icon = L.divIcon({
        html: `<div class="lugar-marker" style="background:${color};">${emoji}</div>`,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    });

    const marker = L.marker([lugar.lat, lugar.lng], { icon });
    marker.lugarId = lugar.id;
    
    marker.bindPopup(`
        <div class="popup-lugar">
            <h3>${lugar.nombre}</h3>
            <p>📍 ${lugar.lugar}</p>
            <button class="popup-btn-extra" onclick="window.compartirLugar('${lugar.id}')">
                <i class="fas fa-share-alt"></i> Compartir
            </button>
        </div>
    `);

    return marker;
}
