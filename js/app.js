// ===== VARIABLES GLOBALES =====
let map;
let todosLosEventos = [];
let markersLayer;

// ===== ICONOS Y COLORES =====
const iconos = {
    'concierto': '🎵',
    'fiesta': '🎪',
    'mercado': '🛍️',
    'cultural': '🎭',
    'gastronomia': '🍽️'
};

const colores = {
    'concierto': '#9333EA',
    'fiesta': '#C60B1E',
    'mercado': '#059669',
    'cultural': '#1E40AF',
    'gastronomia': '#92400E'
};

// ===== INICIALIZAR MAPA =====
function initMap() {
    map = L.map('map').setView([40.4168, -3.7038], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    markersLayer = L.layerGroup().addTo(map);
    
    console.log('✅ Mapa inicializado');
}

// ===== CARGAR EVENTOS =====
async function cargarEventos() {
    try {
        const response = await fetch('data/eventos.json');
        const todosEventos = await response.json();
        
        // Filtrar eventos futuros
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        const eventosFuturos = todosEventos.filter(evento => {
            const fechaComparar = evento.fecha_fin || evento.fecha;
            const fechaEvento = new Date(fechaComparar);
            return fechaEvento >= hoy;
        });
        
        // Ordenar por fecha
        todosLosEventos = eventosFuturos.sort((a, b) => {
            return new Date(a.fecha) - new Date(b.fecha);
        });
        
        console.log(`✅ ${todosLosEventos.length} eventos cargados`);
        console.log(`📅 Hoy es: ${hoy.toLocaleDateString('es-ES')}`);
        
        document.getElementById('evento-count').textContent = `${todosLosEventos.length} eventos`;
        
        mostrarEventos(todosLosEventos);
        
    } catch (error) {
        console.error('❌ Error cargando eventos:', error);
    }
}

// ===== MOSTRAR EVENTOS EN MAPA =====
function mostrarEventos(eventos) {
    markersLayer.clearLayers();
    
    console.log(`📍 Mostrando ${eventos.length} eventos en el mapa`);
    
    eventos.forEach(evento => {
        const colorFinal = colores[evento.tipo] || '#6C757D';
        
        const icono = L.divIcon({
            html: `<div style="
                background: ${colorFinal};
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                cursor: pointer;
            ">${iconos[evento.tipo] || '📍'}</div>`,
            className: '',
            iconSize: [40, 40]
        });
        
        const marker = L.marker([evento.lat, evento.lng], { icon: icono });
        
        const textoFecha = evento.fecha_fin 
            ? `${formatearFecha(evento.fecha)} - ${formatearFecha(evento.fecha_fin)}`
            : formatearFecha(evento.fecha);
        
        const popupContent = `
            <div class="popup-evento">
                <h3>${evento.nombre}</h3>
                <p>📅 ${textoFecha}</p>
                <p>📍 ${evento.lugar}</p>
                <p>💰 ${evento.precio === 'gratis' ? '<strong>Gratis</strong>' : evento.precio_desde || 'De pago'}</p>
                <p style="color: #6C757D; font-size: 13px; margin-top: 8px;">
                    ${evento.descripcion}
                </p>
                <a href="${evento.url}" target="_blank" class="btn-link">
                    Ver más información →
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(markersLayer);
    });
}

// ===== FORMATEAR FECHA =====
function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return fecha.toLocaleDateString('es-ES', opciones);
}

// ===== APLICAR FILTROS =====
function aplicarFiltros() {
    console.log('🔍 Aplicando filtros...');
    
    const filtroFecha = document.getElementById('filtro-fecha').value;
    const buscador = document.getElementById('buscador').value.toLowerCase().trim();
    
    console.log('Filtro fecha:', filtroFecha);
    console.log('Buscador:', buscador);
    
    // Obtener checkboxes marcados
    const tiposSeleccionados = [];
    const preciosSeleccionados = [];
    
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
        if (cb.checked) {
            const val = cb.value;
            if (['concierto', 'fiesta', 'mercado', 'cultural', 'gastronomia'].includes(val)) {
                tiposSeleccionados.push(val);
            } else if (['gratis', 'pago'].includes(val)) {
                preciosSeleccionados.push(val);
            }
        }
    });
    
    console.log('Tipos seleccionados:', tiposSeleccionados);
    console.log('Precios seleccionados:', preciosSeleccionados);
    
    // Calcular rango de fechas
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    let fechaInicio = new Date(hoy);
    let fechaFin = new Date(hoy);
    
    if (filtroFecha === 'hoy') {
        fechaFin = new Date(hoy);
    } else if (filtroFecha === 'finde') {
        const dia = hoy.getDay();
        if (dia === 6) { // Sábado
            fechaInicio = new Date(hoy);
            fechaFin = new Date(hoy);
            fechaFin.setDate(hoy.getDate() + 1);
        } else if (dia === 0) { // Domingo
            fechaInicio = new Date(hoy);
            fechaFin = new Date(hoy);
        } else { // Lunes a viernes
            const diasHastaSabado = 6 - dia;
            fechaInicio.setDate(hoy.getDate() + diasHastaSabado);
            fechaFin.setDate(fechaInicio.getDate() + 1);
        }
    } else if (filtroFecha === 'semana') {
        fechaFin.setDate(hoy.getDate() + 7);
    } else if (filtroFecha === 'mes') {
        fechaFin.setDate(hoy.getDate() + 30);
    } else {
        fechaFin.setFullYear(hoy.getFullYear() + 2);
    }
    
    console.log('Rango fechas:', fechaInicio.toLocaleDateString(), '-', fechaFin.toLocaleDateString());
    
    // Filtrar eventos
    let eventosFiltrados = todosLosEventos.filter(evento => {
        // Filtro por tipo
        if (tiposSeleccionados.length > 0 && !tiposSeleccionados.includes(evento.tipo)) {
            return false;
        }
        
        // Filtro por precio
        if (preciosSeleccionados.length > 0 && !preciosSeleccionados.includes(evento.precio)) {
            return false;
        }
        
        // Filtro por búsqueda
        if (buscador) {
            const texto = `${evento.nombre} ${evento.descripcion} ${evento.lugar}`.toLowerCase();
            const palabras = buscador.split(' ');
            if (!palabras.every(p => texto.includes(p))) {
                return false;
            }
        }
        
        // Filtro por fecha
        if (filtroFecha !== 'todos') {
            const fechaEvt = new Date(evento.fecha);
            fechaEvt.setHours(0, 0, 0, 0);
            const fechaEvtFin = evento.fecha_fin ? new Date(evento.fecha_fin) : fechaEvt;
            fechaEvtFin.setHours(0, 0, 0, 0);
            
            if (fechaEvt > fechaFin || fechaEvtFin < fechaInicio) {
                return false;
            }
        }
        
        return true;
    });
    
    console.log(`✅ Resultado: ${eventosFiltrados.length} eventos`);
    
    mostrarEventos(eventosFiltrados);
    document.getElementById('evento-count').textContent = `${eventosFiltrados.length} eventos`;
}

// ===== LIMPIAR FILTROS =====
function limpiarFiltros() {
    console.log('🔄 Limpiando filtros...');
    
    document.getElementById('filtro-fecha').value = 'todos';
    document.getElementById('buscador').value = '';
    
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(cb => {
        cb.checked = true;
    });
    
    mostrarEventos(todosLosEventos);
    document.getElementById('evento-count').textContent = `${todosLosEventos.length} eventos`;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 INICIO - EventosMadrid cargando...');
    
    // Inicializar mapa
    initMap();
    
    // Cargar eventos
    cargarEventos();
    
    // ESPERAR 1 segundo para que carguen los eventos antes de añadir listeners
    setTimeout(function() {
        console.log('📡 Configurando event listeners...');
        
        // Botón aplicar filtros
        const btnAplicar = document.getElementById('aplicar-filtros');
        if (btnAplicar) {
            btnAplicar.onclick = function(e) {
                e.preventDefault();
                console.log('🔘 Click en Aplicar Filtros');
                aplicarFiltros();
            };
            console.log('✅ Listener añadido a botón aplicar');
        } else {
            console.error('❌ No se encuentra botón aplicar-filtros');
        }
        
        // Botón limpiar filtros
        const btnLimpiar = document.getElementById('limpiar-filtros');
        if (btnLimpiar) {
            btnLimpiar.onclick = function(e) {
                e.preventDefault();
                console.log('🔘 Click en Limpiar Filtros');
                limpiarFiltros();
            };
            console.log('✅ Listener añadido a botón limpiar');
        } else {
            console.error('❌ No se encuentra botón limpiar-filtros');
        }
        
        // Select de fecha
        const selectFecha = document.getElementById('filtro-fecha');
        if (selectFecha) {
            selectFecha.onchange = function() {
                console.log('📅 Fecha cambiada a:', this.value);
                aplicarFiltros();
            };
            console.log('✅ Listener añadido a select fecha');
        } else {
            console.error('❌ No se encuentra select filtro-fecha');
        }
        
        // Checkboxes
        const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
        console.log(`📋 Encontrados ${checkboxes.length} checkboxes`);
        
        checkboxes.forEach(function(cb) {
            cb.onchange = function() {
                console.log('✅ Checkbox cambiado:', this.value, this.checked);
                aplicarFiltros();
            };
        });
        
        if (checkboxes.length > 0) {
            console.log('✅ Listeners añadidos a checkboxes');
        } else {
            console.error('❌ No se encontraron checkboxes');
        }
        
        // Buscador
        const buscador = document.getElementById('buscador');
        if (buscador) {
            let timeout;
            buscador.oninput = function() {
                clearTimeout(timeout);
                const valor = this.value;
                console.log('🔍 Escribiendo en buscador:', valor);
                timeout = setTimeout(function() {
                    aplicarFiltros();
                }, 500);
            };
            console.log('✅ Listener añadido a buscador');
        } else {
            console.error('❌ No se encuentra input buscador');
        }
        
        console.log('✅ Todos los listeners configurados');
        
    }, 1000);
});