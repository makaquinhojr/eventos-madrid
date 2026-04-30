import { AppState } from './store.js';

export function initHeatmapMode(mostrarToast) {
    const heatmapToggle = document.getElementById('heatmap-toggle');
    const heatmapControls = document.getElementById('heatmap-controls');
    const heatmapRadiusSlider = document.getElementById('heatmap-radius');

    if (!heatmapToggle) return;

    heatmapToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            if (heatmapControls) heatmapControls.style.display = 'block';
            activateHeatmap(mostrarToast);
            mostrarToast('🌈 Mapa de calor activado');
        } else {
            if (heatmapControls) heatmapControls.style.display = 'none';
            deactivateHeatmap();
            mostrarToast('🌈 Mapa de calor desactivado');
        }
    });

    if (heatmapRadiusSlider) {
        heatmapRadiusSlider.addEventListener('input', (e) => {
            AppState.heatmapRadius = parseInt(e.target.value);
            if (AppState.heatmapLayer) {
                updateHeatmap(mostrarToast);
            }
        });
    }
}

export function activateHeatmap(mostrarToast) {
    if (!AppState.map) return;

    const eventos = AppState.currentFilteredEvents.length > 0 ? AppState.currentFilteredEvents : AppState.allEvents;
    
    if (eventos.length === 0) {
        mostrarToast('⚠️ No hay eventos para mostrar', 'error');
        const toggle = document.getElementById('heatmap-toggle');
        if (toggle) toggle.checked = false;
        return;
    }

    if (!AppState.heatmapLayer) {
        AppState.heatmapLayer = L.layerGroup().addTo(AppState.map);
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
        const radius = AppState.heatmapRadius * 30 * (0.5 + intensity);
        
        L.circle([point.lat, point.lng], {
            radius: radius,
            fillColor: getHeatColor(intensity),
            fillOpacity: 0.3 + (intensity * 0.3),
            stroke: false,
            interactive: false,
            className: 'heatmap-circle'
        }).addTo(AppState.heatmapLayer);
    });

    showHeatmapLegend();
}

function updateHeatmap(mostrarToast) {
    deactivateHeatmap();
    activateHeatmap(mostrarToast);
}

function getHeatColor(intensity) {
    if (intensity < 0.25) return '#3498DB';
    if (intensity < 0.5) return '#2ECC71';
    if (intensity < 0.75) return '#F39C12';
    return '#E74C3C';
}

export function deactivateHeatmap() {
    if (AppState.heatmapLayer) {
        AppState.map.removeLayer(AppState.heatmapLayer);
        AppState.heatmapLayer = null;
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
