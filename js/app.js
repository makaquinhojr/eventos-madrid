let map;
let todosLosEventos = [];
let markersLayer;

function initMap() {
    map = L.map('map').setView([40.4168, -3.7038], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
    markersLayer = L.layerGroup().addTo(map);
    
    console.log('✅ Mapa inicializado');
}

async function cargarEventos() {
    try {
        const response = await fetch('data/eventos.json');
        todosLosEventos = await response.json();
        
        console.log(`✅ ${todosLosEventos.length} eventos cargados`);
        
        document.getElementById('evento-count').textContent = `${todosLosEventos.length} eventos`;
        
        mostrarEventos(todosLosEventos);
        
    } catch (error) {
        console.error('❌ Error:', error);
        alert('Error cargando eventos: ' + error.message);
    }
}

function mostrarEventos(eventos) {
    markersLayer.clearLayers();
    
    const iconos = {
        'concierto': '🎵',
        'fiesta': '🎪',
        'mercado': '🛍️'
    };
    
    const colores = {
        'concierto': '#9333EA',
        'fiesta': '#C60B1E',
        'mercado': '#059669'
    };
    
    eventos.forEach(evento => {
        const icono = L.divIcon({
            html: `<div style="background: ${colores[evento.tipo]}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconos[evento.tipo]}</div>`,
            iconSize: [40, 40]
        });
        
        const marker = L.marker([evento.lat, evento.lng], { icon: icono });
        
        marker.bindPopup(`
            <div class="popup-evento">
                <h3>${evento.nombre}</h3>
                <p>📅 ${evento.fecha}</p>
                <p>📍 ${evento.lugar}</p>
                <p>💰 ${evento.precio === 'gratis' ? 'Gratis' : 'De pago'}</p>
                <p>${evento.descripcion}</p>
                <a href="${evento.url}" target="_blank">Ver más</a>
            </div>
        `);
        
        marker.addTo(markersLayer);
    });
    
    console.log(`✅ ${eventos.length} eventos mostrados`);
}

function aplicarFiltros() {
    const buscador = document.getElementById('buscador').value.toLowerCase();
    
    const tiposSeleccionados = Array.from(
        document.querySelectorAll('.checkbox-group input:checked')
    ).map(cb => cb.value);
    
    let eventosFiltrados = todosLosEventos.filter(evento => {
        if (!tiposSeleccionados.includes(evento.tipo)) return false;
        if (buscador && !evento.nombre.toLowerCase().includes(buscador)) return false;
        return true;
    });
    
    mostrarEventos(eventosFiltrados);
    document.getElementById('evento-count').textContent = `${eventosFiltrados.length} eventos`;
}

function limpiarFiltros() {
    document.getElementById('buscador').value = '';
    document.querySelectorAll('.checkbox-group input').forEach(cb => cb.checked = true);
    mostrarEventos(todosLosEventos);
    document.getElementById('evento-count').textContent = `${todosLosEventos.length} eventos`;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando...');
    
    initMap();
    cargarEventos();
    
    document.getElementById('aplicar-filtros').addEventListener('click', aplicarFiltros);
    document.getElementById('limpiar-filtros').addEventListener('click', limpiarFiltros);
    
    console.log('✅ Listo');
});