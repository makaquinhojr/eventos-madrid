# 🎉 EventosMadrid

<div align="center">

**Descubre qué pasa en Madrid hoy mismo**

[![Live Demo](https://img.shields.io/badge/🌐_Demo-online-brightgreen?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)
[![GitHub](https://img.shields.io/badge/GitHub-eventos--madrid-181717?style=for-the-badge&logo=github)](https://github.com/makaquinhojr/eventos-madrid)
[![Eventos](https://img.shields.io/badge/Eventos-1240+-FF6B35?style=for-the-badge)](https://github.com/makaquinhojr/eventos-madrid/blob/main/data/eventos.json)
[![Auto Update](https://img.shields.io/badge/Auto_Update-cada_lunes-8B5CF6?style=for-the-badge&logo=githubactions)](https://github.com/makaquinhojr/eventos-madrid/actions)

<br>

*Proyecto de fin de curso · Instituto · 2024-2025*

</div>

---

## 🌐 [Ver demo en vivo →](https://makaquinhojr.github.io/eventos-madrid/)

---

## 🤔 ¿Qué es esto?

EventosMadrid es una **web interactiva** que muestra en un mapa todos los eventos culturales de Madrid: conciertos, mercados, fiestas, exposiciones y gastronomía.

Los datos se obtienen automáticamente cada semana mediante un **scraper en Python** que consulta las APIs oficiales del Ayuntamiento y la Comunidad de Madrid. Sin intervención manual.

---

## ✨ Funcionalidades

### 🗺️ Mapa interactivo
- **+1240 eventos** reales sobre el mapa de Madrid
- **Clustering inteligente** — los marcadores se agrupan según el zoom para no saturar la pantalla
- **Marcadores por categoría** con colores y emojis únicos por tipo
- **Popups detallados** al hacer click: nombre, fecha, lugar, precio, descripción y enlace

### 📍 Geolocalización y distancias
- Detecta tu posición con un click
- Muestra la **distancia exacta** a cada evento
- Código de colores según cercanía: 🟢 <1km · 🟡 <5km · 🔴 >5km
- Ordena eventos **por distancia** en la vista lista

### 🔍 Filtros avanzados
- 📅 **Cuándo**: Hoy · Este fin de semana · Próximos 7 días · Este mes
- 🎭 **Tipo**: Conciertos · Fiestas · Mercados · Cultural · Gastronomía
- 💰 **Precio**: Gratis · De pago
- 🔎 **Búsqueda** en tiempo real por nombre, lugar o descripción

### 📋 Vista lista
- Alternativa al mapa con **tarjetas de eventos**
- Badges automáticos de 🔥 **HOY** y ⚡ **MAÑANA**
- Ordenar por fecha, nombre, tipo o distancia
- Botón **"Ver en mapa"** que vuela al marcador y abre su popup

### 📊 Estadísticas
- Panel lateral con **contadores animados** por categoría
- Se actualiza en tiempo real al aplicar filtros

### 🌙 Otros detalles
- Modo oscuro con persistencia entre sesiones
- Diseño responsive para móvil y escritorio
- Notificaciones toast para feedback del usuario
- Sin frameworks — JavaScript vanilla puro

---

## 🤖 Scraper automático

APIs oficiales → scraper.py → eventos.json → GitHub Pages → usuarios


El scraper en Python se encarga de todo:

1. Consulta la **API del Ayuntamiento de Madrid** (datos.madrid.es)
2. Consulta la **API de la Comunidad de Madrid**
3. Limpia y normaliza los datos
4. Categoriza cada evento por palabras clave
5. Geocodifica las ubicaciones
6. Elimina duplicados y eventos pasados
7. Actualiza `eventos.json`

**GitHub Actions** lo ejecuta automáticamente **cada lunes a las 8:00**.
También se puede lanzar manualmente desde la pestaña Actions del repo.

---

## 🛠️ Stack técnico

### Frontend

HTML5 · CSS3 · JavaScript Vanilla
Leaflet.js · Leaflet.markercluster · OpenStreetMap
Font Awesome · Google Fonts (Inter)

### Backend / Automatización

Python 3.11 · requests · BeautifulSoup4
geopy · GitHub Actions

### Datos

| Fuente | Tipo | Cobertura |
|--------|------|-----------|
| [ES Madrid API](https://datos.madrid.es) | API JSON oficial | Municipio de Madrid |
| [Comunidad de Madrid](https://www.comunidad.madrid/agenda) | API JSON oficial | Toda la comunidad |

### Hosting

GitHub Pages — gratuito, con deploy automático en cada push

---

## 📁 Estructura

eventos-madrid/
│
├── 📄 index.html # Página principal
│
├── 📁 css/
│ └── style.css # Estilos, variables, modo oscuro, responsive
│
├── 📁 js/
│ └── app.js # Toda la lógica: mapa, filtros, geo, distancias
│
├── 📁 data/
│ └── eventos.json # Base de datos (~1240 eventos, auto-actualizada)
│
├── 📁 scraper/
│ ├── scraper.py # Scraper principal
│ └── config.py # URLs, keywords, venues conocidos
│
└── 📁 .github/
└── workflows/
└── scraper.yml # GitHub Actions — ejecución automática

    
---

## 🚀 Ejecutar en local

```bash
# 1. Clonar el repo
git clone https://github.com/makaquinhojr/eventos-madrid.git
cd eventos-madrid

# 2. Abrir la web (cualquier servidor local)
# Con Python:
python -m http.server 8000
# Luego abrir http://localhost:8000

# 3. Ejecutar el scraper (opcional)
cd scraper
pip install requests beautifulsoup4 geopy python-dateutil
python scraper.py

🔄 Roadmap
✅ Implementado

    Mapa interactivo con Leaflet.js
    Marcadores por categoría con colores y emojis
    Clustering de marcadores para +1000 eventos
    Filtros por tipo, precio, fecha y búsqueda
    Vista lista alternativa al mapa
    Modo oscuro persistente
    Geolocalización del usuario
    Distancias en tiempo real a cada evento
    Ordenar por distancia
    Scraper automático con Python
    GitHub Actions — actualización cada lunes
    Badges HOY / MAÑANA en eventos próximos
    Panel de estadísticas animado

🔮 Próximamente

    Filtro por radio de distancia ("eventos a menos de 2km")
    Compartir evento por WhatsApp
    Exportar a Google Calendar
    PWA instalable en móvil
    Notificaciones de eventos cercanos
    Clustering por colores según categoría dominante

👨‍💻 Autor

Diego SB · github.com/makaquinhojr
🙏 Agradecimientos
	
👨‍🏫 Diego Navarro	Profesor de tecnología
🏛️ Ayuntamiento de Madrid	API de eventos municipales
🌍 Comunidad de Madrid	API de eventos regionales
🗺️ OpenStreetMap	Datos cartográficos libres
📦 Leaflet.js	Librería de mapas open source
<div align="center">

🌐 Ver demo · ⭐ Dar una estrella · 🐛 Reportar un bug
<br>

Hecho con ❤️ en el Falla · Proyecto educativo · 2026
</div> ```