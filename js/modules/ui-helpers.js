/* ========================================
   UI HELPERS - EventosMadrid
   ======================================== */

import { icons, ZONAS_COORDS } from './constants.js';

export function formatDate(fechaStr) {
    if (!fechaStr) return '';
    try {
        const fecha = new Date(fechaStr + 'T00:00:00');
        if (isNaN(fecha.getTime())) return fechaStr;
        
        return new Intl.DateTimeFormat(document.documentElement.lang || 'es', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(fecha);
    } catch (e) {
        return fechaStr;
    }
}

export function formatearFechaSafe(inicio, fin) {
    const fInicio = formatDate(inicio);
    const fFin = fin && fin !== inicio ? formatDate(fin) : null;
    return fFin ? `${fInicio} - ${fFin}` : fInicio;
}

export function limpiarDescripcion(texto, maxLen = 150) {
    if (!texto) return '';
    const limpio = texto.replace(/<[^>]*>?/gm, '').trim();
    if (limpio.length <= maxLen) return limpio;
    return limpio.substring(0, maxLen) + '...';
}

export function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

export function inferirZona(lat, lng) {
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

export function trapFocus(element) {
    if (!element) return;
    
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handler = function(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    };

    element.removeEventListener('keydown', element._focusHandler);
    element._focusHandler = handler;
    element.addEventListener('keydown', handler);
    
    first.focus();
}

export function getLinkHTML(evento, t) {
    const esLinkUtil = (url) => {
        if (!url || typeof url !== 'string' || url.trim() === '') return false;
        if (!url.startsWith('http')) return false;
        return url.length > 50 || url.includes('evento') || url.includes('agenda');
    };

    if (esLinkUtil(evento.url)) {
        return `<a href="${evento.url}" target="_blank" class="popup-link">${t('event.more_info')} →</a>`;
    }
    const busqueda = encodeURIComponent(`${evento.nombre} Madrid`);
    return `<a href="https://www.google.com/search?q=${busqueda}" target="_blank" class="popup-link popup-link-google">🔍 ${t('event.search_google')}</a>`;
}

export function formatearDistancia(km) {
    return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

export function getDistanciaHTMLCoords(lat, lng, userLocation) {
    if (!userLocation) return '';
    const distancia = calcularDistancia(userLocation.lat, userLocation.lng, lat, lng);
    const texto = formatearDistancia(distancia);
    const color = distancia < 1 ? '#30D158' : distancia < 5 ? '#FF9F0A' : '#FF453A';
    return `<span class="distancia-badge" style="color:${color}">
        <i class="fas fa-walking"></i> ${texto}
    </span>`;
}

// ===== TOAST SYSTEM =====
let currentUndoCallback = null;

export function mostrarToastConUndo(mensaje, undoCallback, tipo = 'normal') {
    document.querySelector('.geo-toast')?.remove();

    const toast = document.createElement('div');
    toast.className = `geo-toast ${tipo === 'error' ? 'error' : tipo === 'success' ? 'success' : ''}`;

    if (undoCallback) {
        toast.innerHTML = `
            <span>${mensaje}</span>
            <button id="toast-undo-btn" style="background:none;border:none;color:inherit;font-weight:700;margin-left:12px;cursor:pointer;text-decoration:underline;">
                DESHACER
            </button>
        `;
        currentUndoCallback = undoCallback;
    } else {
        toast.textContent = mensaje;
    }

    document.body.appendChild(toast);
    
    if (undoCallback) {
        const undoBtn = document.getElementById('toast-undo-btn');
        if (undoBtn) {
            undoBtn.onclick = () => {
                currentUndoCallback();
                toast.remove();
                currentUndoCallback = null;
            };
        }
    }

    setTimeout(() => toast.classList.add('visible'), 10);

    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.remove();
            if (currentUndoCallback === undoCallback) currentUndoCallback = null;
        }, 300);
    }, 5000);
}

export function mostrarToast(mensaje, tipo = 'normal') {
    mostrarToastConUndo(mensaje, null, tipo);
}

