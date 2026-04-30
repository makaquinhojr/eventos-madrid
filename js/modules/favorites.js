/* ========================================
   FAVORITES MODULE - EventosMadrid
   ======================================== */

import DOMPurify from 'dompurify';
import { icons, colors } from './constants.js';
import { formatDate } from './ui-helpers.js';
import { AppState } from './store.js';

export function loadFavorites() {
    const saved = localStorage.getItem('favorites');
    AppState.favorites = saved ? JSON.parse(saved) : [];
    updateFavoritesCount();
}

export function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(AppState.favorites));
    updateFavoritesCount();
}

export function toggleFavorite(eventoId, t, mostrarToast, renderFavoritesList) {
    const index = AppState.favorites.indexOf(eventoId);
    const wasAdded = index === -1;

    if (index > -1) {
        AppState.favorites.splice(index, 1);
    } else {
        AppState.favorites.push(eventoId);
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    saveFavorites();
    if (renderFavoritesList) renderFavoritesList();

    document.querySelectorAll(`[data-event-id="${eventoId}"]`).forEach(btn => {
        btn.classList.toggle('active', AppState.favorites.includes(eventoId));
    });

    if (mostrarToast) {
        mostrarToast(
            wasAdded ? t('favorites.added') : t('favorites.removed'),
            'success'
        );
    }
}

export function updateFavoritesCount() {
    const count = AppState.favorites.length;
    const badge = document.getElementById('favorites-count');
    const bottomBadge = document.getElementById('bottom-favorites-badge');
    const favActions = document.getElementById('favorites-actions');

    if (count > 0) {
        if (badge) {
            badge.textContent = count;
            badge.style.display = 'flex';
        }
        if (bottomBadge) {
            bottomBadge.textContent = count;
            bottomBadge.style.display = 'flex';
        }
        if (favActions) favActions.style.display = 'block';
    } else {
        if (badge) badge.style.display = 'none';
        if (bottomBadge) bottomBadge.style.display = 'none';
        if (favActions) favActions.style.display = 'none';
    }
}

export function renderFavoritesList(allEvents, t, verEnMapaCallback, comoLlegarCallback, compartirCallback) {
    const container = document.getElementById('favorites-list');
    const emptyState = document.getElementById('favorites-empty');

    if (!container || !emptyState) return;

    if (AppState.favorites.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    const favoritosEventos = allEvents.filter(e => AppState.favorites.includes(e.id));

    container.innerHTML = favoritosEventos.map(evento => {
        const emoji = icons[evento.tipo] || '📍';
        const color = colors[evento.tipo] || '#6B7280';
        const fecha = formatDate(evento.fecha);
        const safeNombre = DOMPurify.sanitize(evento.nombre);
        const safeLugar = DOMPurify.sanitize(evento.lugar);

        return `
            <div class="favorite-item" style="animation: fadeUp 0.3s ease-out;">
                <div class="favorite-item-main" data-id="${evento.id}" role="button" tabindex="0" aria-label="${safeNombre}">
                    <div class="favorite-item-icon ${evento.tipo}" style="background:linear-gradient(135deg, ${color}dd 0%, ${color} 100%);">
                        ${emoji}
                    </div>
                    <div class="favorite-item-info">
                        <div class="favorite-item-title">${safeNombre}</div>
                        <div class="favorite-item-meta">
                            <span>📅 ${fecha}</span>
                            <span>📍 ${safeLugar}</span>
                        </div>
                    </div>
                </div>
                <div class="favorite-item-actions">
                    <button class="fav-action-btn fav-action-map" data-action="map" data-id="${evento.id}" title="${t('event.view_map')}">
                        <i class="fas fa-map-marked-alt"></i>
                    </button>
                    <button class="fav-action-btn fav-action-route" data-action="route" data-id="${evento.id}" title="${t('event.how_to_get')}">
                        <i class="fas fa-route"></i>
                    </button>
                    <button class="fav-action-btn fav-action-share" data-action="share" data-id="${evento.id}" title="${t('event.share')}">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="fav-action-btn fav-action-remove" data-action="remove" data-id="${evento.id}" aria-label="${t('favorites.removed')}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Event delegation for actions
    container.querySelectorAll('.favorite-item-main, .fav-action-btn').forEach(btn => {
        btn.onclick = (e) => {
            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action || 'view';
            
            if (action === 'view' || action === 'map') verEnMapaCallback(id);
            if (action === 'route') comoLlegarCallback(id);
            if (action === 'share') compartirCallback(id);
            if (action === 'remove') toggleFavorite(id, t, null, () => renderFavoritesList(allEvents, t, verEnMapaCallback, comoLlegarCallback, compartirCallback));
        };
    });
}
