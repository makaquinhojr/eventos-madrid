/* ========================================
   SHARING MODULE - EventosMadrid
   ======================================== */

import DOMPurify from 'dompurify';
import { icons, lugaresIcons } from './constants.js';
import { formatDate, trapFocus } from './ui-helpers.js';

export async function compartirEventoNativo(evento, t, mostrarToast) {
    if (!evento) return;

    const url = generarUrlCompartir(evento);
    const texto = generarTextoCompartir(evento, t);

    if (navigator.share) {
        try {
            await navigator.share({
                title: evento.nombre,
                text: texto,
                url: url
            });
            mostrarToast('✅ ' + t('event.link_copied'));
        } catch (err) {
            if (err.name !== 'AbortError') {
                mostrarModalCompartir(evento, t, 'event');
            }
        }
    } else {
        mostrarModalCompartir(evento, t, 'event');
    }
}

export function generarUrlCompartir(item, type = 'evento') {
    const base = window.location.origin + window.location.pathname;
    return `${base}?${type}=${item.id}`;
}

export function generarTextoCompartir(evento, t) {
    const fecha = formatDate(evento.fecha);
    const precio = evento.precio === 'gratis'
        ? t('badge.free')
        : (evento.precio_desde || t('badge.paid'));
    const emoji = icons[evento.tipo] || '📍';
    return `${emoji} *${evento.nombre}*\n📅 ${fecha}\n📍 ${evento.lugar}\n💰 ${precio}`;
}

export function mostrarModalCompartir(item, t, type = 'event') {
    const isEvent = type === 'event';
    const emoji = isEvent ? (icons[item.tipo] || '📍') : (lugaresIcons[item.categoria] || '📍');
    const titleKey = isEvent ? 'share.title_event' : 'share.title_place';
    
    const url = generarUrlCompartir(item, isEvent ? 'evento' : 'lugar');
    const texto = isEvent ? generarTextoCompartir(item, t) : `${emoji} *${item.nombre}*\n📍 ${item.lugar}`;

    document.getElementById('modal-compartir')?.remove();

    const modal = document.createElement('div');
    modal.id = 'modal-compartir';
    modal.className = 'modal-compartir-overlay';
    
    const safeNombre = DOMPurify.sanitize(item.nombre);
    const safeUrl = url.replace(/"/g, '&quot;');
    
    modal.innerHTML = `
        <div class="modal-compartir">
            <div class="modal-compartir-header">
                <span>${emoji} ${t(titleKey)}</span>
                <button class="modal-compartir-close" id="close-share-modal" aria-label="Cerrar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-compartir-nombre">${safeNombre}</div>
            <div class="modal-compartir-acciones">
                <a class="modal-compartir-btn whatsapp"
                   href="https://wa.me/?text=${encodeURIComponent(texto + '\n\n🗺️ Ver en EventosMadrid: ' + url)}"
                   target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    <span>${t('event.share_whatsapp')}</span>
                </a>
                <a class="modal-compartir-btn twitter"
                   href="https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}"
                   target="_blank">
                    <i class="fab fa-x-twitter"></i>
                    <span>${t('event.share_twitter')}</span>
                </a>
                <button class="modal-compartir-btn copiar" id="copy-link-btn">
                    <i class="fas fa-link"></i>
                    <span>${t('event.copy_link')}</span>
                </button>
            </div>
        </div>
    `;

    modal.addEventListener('click', e => {
        if (e.target === modal) cerrarModalCompartir();
    });

    document.body.appendChild(modal);
    
    document.getElementById('close-share-modal').onclick = cerrarModalCompartir;
    document.getElementById('copy-link-btn').onclick = (e) => copiarLink(url, e.currentTarget, t);

    trapFocus(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));
}

export function cerrarModalCompartir() {
    const modal = document.getElementById('modal-compartir');
    if (!modal) return;
    modal.classList.remove('visible');
    setTimeout(() => modal.remove(), 200);
}

async function copiarLink(url, btn, t) {
    try {
        await navigator.clipboard.writeText(url);
        const original = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check"></i><span>${t('event.link_copied')}</span>`;
        btn.classList.add('copiado');
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('copiado');
        }, 2000);
    } catch {
        // Fallback or error toast
    }
}
