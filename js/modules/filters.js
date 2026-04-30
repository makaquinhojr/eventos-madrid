/* ========================================
   FILTERS MODULE - EventosMadrid
   ======================================== */

import { AppState } from './store.js';
import { ZONAS_COORDS } from './constants.js';
import * as UI from './ui-helpers.js';

let filterDebounceTimer = null;

export function applyFilters(callbacks) {
    clearTimeout(filterDebounceTimer);
    filterDebounceTimer = setTimeout(() => {
        applyFiltersImmediate(callbacks);
    }, 150);
}

export function applyFiltersImmediate(callbacks) {
    const searchEl = document.getElementById('search');
    const search = searchEl ? searchEl.value.toLowerCase().trim() : '';
    const dateFilter = document.getElementById('filtro-fecha')?.value || 'todos';
    const zonaFilter = document.getElementById('filtro-zona')?.value || 'todas';
    const precioMax = parseInt(document.getElementById('filtro-precio-max')?.value || 100);

    const types = Array.from(document.querySelectorAll(
        '.chip input[value="concierto"], .chip input[value="fiesta"], ' +
        '.chip input[value="mercado"], .chip input[value="cultural"], ' +
        '.chip input[value="gastronomia"], .chip input[value="deporte"], ' +
        '.chip input[value="infantil"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    const prices = Array.from(document.querySelectorAll(
        '.chip input[value="gratis"], .chip input[value="pago"]'
    )).filter(cb => cb.checked).map(cb => cb.value);

    const lugarCategorias = Array.from(document.querySelectorAll('.lugar-categoria-cb'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    let filtered = AppState.allEvents.filter(e => {
        if (types.length && !types.includes(e.tipo)) return false;
        if (prices.length && !prices.includes(e.precio)) return false;
        
        if (AppState.userLocation) {
            const dist = UI.calcularDistancia(AppState.userLocation.lat, AppState.userLocation.lng, e.lat, e.lng);
            if (dist > AppState.maxDistance) return false;
        }

        if (search) {
            const zona = e.zona || 'Madrid';
            const haystack = [e.nombre, e.descripcion || '', e.lugar, zona].join(' ').toLowerCase();
            if (!haystack.includes(search)) return false;
        }

        if (zonaFilter !== 'todas' && (e.zona || 'centro') !== zonaFilter) return false;

        if (precioMax < 100) {
            if (e.precio === 'gratis') return true;
            if (precioMax === 0) return false;
            if (e.precio_desde) {
                const num = parseFloat(e.precio_desde.replace('€', ''));
                if (!isNaN(num) && num > precioMax) return false;
            }
        }

        return true;
    });

    if (dateFilter !== 'todos') {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        filtered = filtered.filter(e => {
            const fechaInicio = new Date(e.fecha + 'T00:00:00');
            const fechaFin = e.fecha_fin ? new Date(e.fecha_fin + 'T00:00:00') : fechaInicio;

            switch (dateFilter) {
                case 'hoy':
                    return fechaInicio <= hoy && fechaFin >= hoy;
                case 'finde': {
                    const dia = hoy.getDay();
                    let ini, fin;
                    if (dia === 6) {
                        ini = new Date(hoy);
                        fin = new Date(hoy);
                        fin.setDate(hoy.getDate() + 1);
                    } else if (dia === 0) {
                        ini = fin = new Date(hoy);
                    } else {
                        const diasHastaSabado = 6 - dia;
                        ini = new Date(hoy);
                        ini.setDate(hoy.getDate() + diasHastaSabado);
                        fin = new Date(ini);
                        fin.setDate(ini.getDate() + 1);
                    }
                    return fechaInicio <= fin && fechaFin >= ini;
                }
                case 'semana': {
                    const semanaFin = new Date(hoy);
                    semanaFin.setDate(hoy.getDate() + 7);
                    return fechaInicio <= semanaFin && fechaFin >= hoy;
                }
                case 'mes': {
                    const mesFin = new Date(hoy);
                    mesFin.setDate(hoy.getDate() + 30);
                    return fechaInicio <= mesFin && fechaFin >= hoy;
                }
                default:
                    return true;
            }
        });
    }

    AppState.currentFilteredEvents = filtered;

    let filteredLugares = AppState.allLugares.filter(l => {
        if (lugarCategorias.length === 0) return false;
        if (!lugarCategorias.includes(l.categoria)) return false;

        if (search) {
            const zona = l.zona || 'Madrid';
            const haystack = [l.nombre, l.descripcion || '', l.lugar, zona, l.categoria].join(' ').toLowerCase();
            if (!haystack.includes(search)) return false;
        }

        return true;
    });

    AppState.currentFilteredLugares = filteredLugares;

    if (callbacks) {
        if (callbacks.onEventsFiltered) callbacks.onEventsFiltered(filtered);
        if (callbacks.onLugaresFiltered) callbacks.onLugaresFiltered(filteredLugares);
    }
}

export function clearFilters(callbacks) {
    const searchEl = document.getElementById('search');
    if (searchEl) searchEl.value = '';
    
    const dateF = document.getElementById('filtro-fecha');
    if (dateF) dateF.value = 'todos';
    
    const zonaF = document.getElementById('filtro-zona');
    if (zonaF) zonaF.value = 'todas';
    
    const precioF = document.getElementById('filtro-precio-max');
    if (precioF) {
        precioF.value = 100;
        const val = document.getElementById('precio-val');
        if (val) val.textContent = '100€+';
    }

    document.querySelectorAll('.chip input').forEach(cb => cb.checked = false);
    document.querySelectorAll('.lugar-categoria-cb').forEach(cb => cb.checked = true);

    applyFiltersImmediate(callbacks);
}
