import { AppState } from './store.js';

export function initRoutePlanner(mostrarToast, i18n, trapFocus, displayEvents, formatDate, calcularDistancia, formatearDistancia) {
    const routePlannerBtn = document.getElementById('route-planner-btn');
    const routePanel = document.getElementById('route-panel');
    const closeRoute = document.getElementById('close-route');
    const optimizeRouteBtn = document.getElementById('optimize-route');
    const exportRouteBtn = document.getElementById('export-route');
    const clearRouteBtn = document.getElementById('clear-route');

    if (!routePlannerBtn) return;

    routePlannerBtn.addEventListener('click', () => {
        AppState.routePlannerMode = !AppState.routePlannerMode;
        
        if (AppState.routePlannerMode) {
            routePlannerBtn.classList.add('active');
            document.body.classList.add('route-mode');
            
            if (routePanel) {
                routePanel.classList.add('active');
                routePanel.setAttribute('aria-modal', 'true');
                trapFocus(routePanel);
            }
            
            enableRouteSelection();
            mostrarToast(i18n.t('route.mode.enabled'), 'success');
        } else {
            routePlannerBtn.classList.remove('active');
            document.body.classList.remove('route-mode');
            disableRouteSelection(displayEvents);
            mostrarToast(i18n.t('route.mode.disabled'));
        }
    });

    if (closeRoute) {
        closeRoute.addEventListener('click', () => {
            AppState.routePlannerMode = false;
            routePlannerBtn.classList.remove('active');
            document.body.classList.remove('route-mode');
            disableRouteSelection(displayEvents);
            
            if (routePanel) {
                routePanel.classList.remove('active');
                routePanel.setAttribute('aria-modal', 'false');
            }
        });
    }

    if (optimizeRouteBtn) {
        optimizeRouteBtn.addEventListener('click', () => optimizeRoute(mostrarToast, i18n, calcularDistancia, formatearDistancia, formatDate));
    }

    if (exportRouteBtn) {
        exportRouteBtn.addEventListener('click', () => exportRoute(i18n, formatDate));
    }

    if (clearRouteBtn) {
        clearRouteBtn.addEventListener('click', () => clearRoute(mostrarToast, i18n));
    }

    // Expose to window for inline onclick handlers
    window.removeEventFromRoute = (id) => removeEventFromRoute(id, mostrarToast, i18n, formatDate, calcularDistancia, formatearDistancia);
    window.compartirEventoNativo = window.compartirEventoNativo; // Assume it's already there or handle it
}

function enableRouteSelection() {
    AppState.markersLayer.eachLayer(marker => {
        marker.off('click');
        marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            addEventToRoute(marker.eventoId);
        });
    });
}

function disableRouteSelection(displayEvents) {
    displayEvents(AppState.currentFilteredEvents.length ? AppState.currentFilteredEvents : AppState.allEvents);
}

function addEventToRoute(eventoId, mostrarToast, i18n, formatDate, calcularDistancia, formatearDistancia) {
    const evento = AppState.allEvents.find(e => e.id === eventoId);
    if (!evento) return;

    if (AppState.selectedRouteEvents.find(e => e.id === eventoId)) {
        mostrarToast(i18n.t('route.already_added'), 'error');
        return;
    }

    AppState.selectedRouteEvents.push(evento);
    updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia);
    updateRouteOnMap(i18n, formatDate);
    
    mostrarToast(`✅ "${evento.nombre.substring(0, 30)}..." ${i18n.t('route.added').replace('✅ ', '')}`);
    
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

export function removeEventFromRoute(eventoId, mostrarToast, i18n, formatDate, calcularDistancia, formatearDistancia) {
    AppState.selectedRouteEvents = AppState.selectedRouteEvents.filter(e => e.id !== eventoId);
    updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia);
    updateRouteOnMap(i18n, formatDate);
    mostrarToast(i18n.t('route.removed'));
}

export function updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia) {
    const routeEventsList = document.getElementById('route-events-list');
    const routeEmpty = document.getElementById('route-empty');
    const routeEventsCount = document.getElementById('route-events-count');
    const routeCount = document.getElementById('route-count');
    const optimizeBtn = document.getElementById('optimize-route');
    const exportBtn = document.getElementById('export-route');

    if (!routeEventsList) return;

    const count = AppState.selectedRouteEvents.length;
    
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

    routeEventsList.innerHTML = AppState.selectedRouteEvents.map((evento, index) => {
        let distanceText = '-';
        
        if (index > 0) {
            const prevEvento = AppState.selectedRouteEvents[index - 1];
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
                        aria-label="${i18n.t('route.removed')}">
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

export function updateRouteOnMap(i18n, formatDate) {
    AppState.routeMarkers.forEach(marker => AppState.map.removeLayer(marker));
    AppState.routeMarkers = [];
    
    if (AppState.routePolyline) {
        AppState.map.removeLayer(AppState.routePolyline);
        AppState.routePolyline = null;
    }

    if (AppState.selectedRouteEvents.length === 0) return;

    AppState.selectedRouteEvents.forEach((evento, index) => {
        const icon = L.divIcon({
            html: `<div class="route-marker">${index + 1}</div>`,
            className: '',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });

        const marker = L.marker([evento.lat, evento.lng], { icon })
            .addTo(AppState.map)
            .bindPopup(`
                <div class="popup-evento">
                    <h3>🗺️ ${i18n.t('route.stop')} ${index + 1}</h3>
                    <p><strong>📍</strong> ${evento.nombre}</p>
                    <p><strong>📅</strong> ${formatDate(evento.fecha)}</p>
                    <div class="popup-actions" style="margin-top: 12px; border-top: 0.5px solid var(--separator); padding-top: 8px;">
                        <button class="popup-btn-extra compartir" onclick="compartirEventoNativo(${evento.id})" style="width: 100%; justify-content: center;">
                            <i class="fas fa-share-alt"></i> ${i18n.t('event.share')}
                        </button>
                    </div>
                </div>
            `);
        
        AppState.routeMarkers.push(marker);
    });

    if (AppState.selectedRouteEvents.length >= 2) {
        const latlngs = AppState.selectedRouteEvents.map(e => [e.lat, e.lng]);
        AppState.routePolyline = L.polyline(latlngs, {
            color: getComputedStyle(document.documentElement)
                .getPropertyValue('--accent').trim(),
            weight: 4,
            opacity: 0.8,
            dashArray: '10, 5',
            className: 'route-line'
        }).addTo(AppState.map);

        AppState.map.fitBounds(AppState.routePolyline.getBounds(), { padding: [50, 50] });
    }
}

function optimizeRoute(mostrarToast, i18n, calcularDistancia, formatearDistancia, formatDate) {
    if (AppState.selectedRouteEvents.length < 2) return;

    const optimized = [AppState.selectedRouteEvents[0]];
    const remaining = AppState.selectedRouteEvents.slice(1);

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

    AppState.selectedRouteEvents = optimized;
    updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia);
    updateRouteOnMap(i18n, formatDate);
    
    mostrarToast(i18n.t('route.optimized'), 'success');
}

function exportRoute(i18n, formatDate) {
    if (AppState.selectedRouteEvents.length === 0) return;

    const routeText = AppState.selectedRouteEvents.map((evento, index) => 
        `${index + 1}. ${evento.nombre}\n   📅 ${formatDate(evento.fecha)}\n   📍 ${evento.lugar}\n`
    ).join('\n');

    const fullText = `🗺️ ${i18n.t('route.title').replace('🗺️ ', '').toUpperCase()} - EVENTOSMADRID\n\n${routeText}\n🌐 ${window.location.href}`;

    showExportModal(fullText, i18n);
}

function showExportModal(text, i18n) {
    const modal = document.createElement('div');
    modal.className = 'route-export-modal';
    modal.innerHTML = `
        <div class="route-export-content">
            <div class="route-export-header">
                <h3>${i18n.t('route.export_title')}</h3>
                <button class="close-panel" onclick="this.closest('.route-export-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="route-export-options">
                <button class="route-export-btn" onclick="shareViaWhatsApp('${encodeURIComponent(text)}')">
                    <i class="fab fa-whatsapp"></i>
                    <span>${i18n.t('route.export.whatsapp')}</span>
                </button>
                <button class="route-export-btn" onclick="copyRouteText(\`${text.replace(/`/g, '\\`')}\`)">
                    <i class="fas fa-copy"></i>
                    <span>${i18n.t('route.export.copy')}</span>
                </button>
                <button class="route-export-btn" onclick="downloadRouteJSON()">
                    <i class="fas fa-download"></i>
                    <span>${i18n.t('route.export.download')}</span>
                </button>
            </div>
        </div>
    `;

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));
    
    // Bind modal helper functions to window for onclick compatibility
    window.shareViaWhatsApp = shareViaWhatsApp;
    window.copyRouteText = (t) => copyRouteText(t, i18n);
    window.downloadRouteJSON = () => downloadRouteJSON(i18n);
}

function shareViaWhatsApp(text) {
    window.open(`https://wa.me/?text=${text}`, '_blank');
    document.querySelector('.route-export-modal')?.remove();
}

async function copyRouteText(text, i18n) {
    try {
        await navigator.clipboard.writeText(text);
        mostrarToast(i18n.t('route.export.copied'), 'success');
        document.querySelector('.route-export-modal')?.remove();
    } catch {
        mostrarToast(i18n.t('route.copy_error'), 'error');
    }
}

function downloadRouteJSON(i18n) {
    const routeData = {
        eventos: AppState.selectedRouteEvents,
        fecha_creacion: new Date().toISOString(),
        total_eventos: AppState.selectedRouteEvents.length
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
    
    mostrarToast(i18n.t('route.export.downloaded'), 'success');
    document.querySelector('.route-export-modal')?.remove();
}

export function clearRoute(mostrarToast, i18n) {
    if (confirm(i18n.t('route.clear.confirm'))) {
        AppState.selectedRouteEvents = [];
        updateRoutePanel(i18n, formatDate, calcularDistancia, formatearDistancia); // Might need to pass dependencies
        updateRouteOnMap(i18n, formatDate);
        mostrarToast(i18n.t('route.cleared'));
    }
}
