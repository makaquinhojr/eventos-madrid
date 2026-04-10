# 🎉 EventosMadrid

<div align="center">

![EventosMadrid Banner](https://img.shields.io/badge/EventosMadrid-Descubre_Madrid-C60B1E?style=for-the-badge&logo=googleearth&logoColor=white)

**Tu guía definitiva de eventos culturales y de ocio en la Comunidad de Madrid**

[![🌐 Live Demo](https://img.shields.io/badge/🌐_DEMO_EN_VIVO-makaquinhojr.github.io/eventos--madrid-4CAF50?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)
[![GitHub Stars](https://img.shields.io/github/stars/makaquinhojr/eventos-madrid?style=for-the-badge&logo=github&color=yellow)](https://github.com/makaquinhojr/eventos-madrid/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/makaquinhojr/eventos-madrid?style=for-the-badge&logo=github)](https://github.com/makaquinhojr/eventos-madrid/issues)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[![Eventos Activos](https://img.shields.io/badge/📅_Eventos_Activos-1240+-FF6B35?style=for-the-badge)](https://github.com/makaquinhojr/eventos-madrid/blob/main/data/eventos.json)
[![Lugares](https://img.shields.io/badge/🏛️_Lugares_de_Interés-150+-0891B2?style=for-the-badge)](https://github.com/makaquinhojr/eventos-madrid/blob/main/data/lugares.json)
[![Auto Update](https://img.shields.io/badge/🤖_Auto_Update-Cada_Lunes_8AM-8B5CF6?style=for-the-badge&logo=githubactions)](https://github.com/makaquinhojr/eventos-madrid/actions)
[![PWA Ready](https://img.shields.io/badge/📱_PWA-Instalable-7C3AED?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)

<br>

### 🎓 Proyecto del **IES Manuel de Falla** · 1º bach · Curso 2025-2026

</div>

---

## 🚀 ¿Qué es EventosMadrid?

**EventosMadrid** es una **Progressive Web App (PWA)** que te permite descubrir **más de 1.240 eventos culturales y de ocio** en tiempo real sobre un mapa interactivo de la Comunidad de Madrid.

### 🎯 El problema que resuelve

- ❌ Las webs oficiales son lentas y difíciles de navegar
- ❌ No hay una vista unificada de todos los eventos de Madrid
- ❌ Es complicado encontrar eventos cerca de ti
- ❌ La información está dispersa en múltiples fuentes

### ✅ Nuestra solución

- ✅ **Mapa interactivo** con más de 1.240 eventos actualizados automáticamente
- ✅ **Filtros avanzados** por tipo, fecha, zona, precio y distancia
- ✅ **3 vistas diferentes**: Mapa, Lista y Calendario
- ✅ **Geolocalización** para encontrar eventos cerca de ti
- ✅ **Sistema de favoritos** para guardar tus eventos preferidos
- ✅ **Compartir** eventos por WhatsApp, Twitter o copiar link
- ✅ **Dashboard de analytics** con gráficos interactivos
- ✅ **100% offline** gracias a Service Workers
- ✅ **Multiidioma**: Español, Inglés y Francés

---

## ✨ Características Principales

### 🗺️ **Mapa Interactivo con Leaflet.js**

- 📍 **+1.240 eventos** renderizados en tiempo real
- 🎨 **Marcadores por categoría** con colores y emojis únicos
- 🔄 **Clustering inteligente** para evitar saturación visual
- 🏛️ **+150 lugares de interés** (museos, teatros, parques...)
- 💬 **Popups detallados** con toda la información del evento
- 🎯 **Click para más info**: dirección, descripción, precio, enlaces

### 📍 **Geolocalización y Distancias**

- 📡 Detecta tu ubicación con **un solo click**
- 📏 Calcula la **distancia exacta** a cada evento
- 🚶 Muestra la distancia en **metros o kilómetros**
- 🎨 Código de colores según cercanía:
  - 🟢 **<1 km** (Verde)
  - 🟡 **1-5 km** (Amarillo)
  - 🔴 **>5 km** (Rojo)
- 🧭 Botón **"Cómo llegar"** con Google Maps integrado

### 🔍 **Filtros Avanzados**

#### 📅 **Cuándo**
- Hoy
- Este fin de semana
- Próximos 7 días
- Este mes

#### 🎭 **Tipo de Evento**
- 🎵 Conciertos
- 🎪 Fiestas
- 🛍️ Mercados
- 🎭 Cultural
- 🍽️ Gastronomía
- ⚽ Deportes
- 👶 Infantil

#### 💰 **Precio**
- 💚 Gratis
- 💰 De pago
- 💸 Precio máximo (slider de 0-100€)

#### 📍 **Zona/Municipio**
- 21 distritos de Madrid Capital
- 22 municipios de la Comunidad

#### 🔎 **Búsqueda en Tiempo Real**
- Por nombre del evento
- Por lugar
- Por descripción
- Por zona

### 📋 **Vista Lista**

- 🃏 **Tarjetas de eventos** con toda la información
- 🔥 Badges automáticos **"HOY"** y **"MAÑANA"**
- 📊 Ordenar por:
  - 📅 Fecha
  - 🔤 Nombre
  - 🎭 Tipo
  - 📍 Distancia (si tienes geolocalización activa)
- 🎯 Botón **"Ver en mapa"** que vuela al marcador
- ❤️ Botón de **favoritos** en cada tarjeta
- 📤 Botón de **compartir** (Web Share API)

### 📅 **Vista Calendario**

- 📆 Calendario mensual con **eventos por día**
- 🎨 Dots de colores por tipo de evento
- 👆 Click en un día para **ver todos sus eventos**
- ⏮️⏭️ Navegación entre meses
- 📊 Contador de eventos por día

### 📊 **Dashboard de Analytics**

- 📈 **3 gráficos interactivos** (Chart.js):
  1. 🍩 **Distribución por tipo** (Doughnut chart)
  2. 📊 **Eventos por zona** (Bar chart - Top 10)
  3. 📈 **Timeline próximos 30 días** (Line chart)
- 🔢 **Stats en tiempo real**:
  - Conciertos, Fiestas, Mercados
  - Cultural, Gastro, Deportes
  - Infantil y eventos Gratis
- ✨ Animación de contadores
- 🎨 Adapta colores al tema (claro/oscuro)

### ❤️ **Sistema de Favoritos**

- 💾 Guarda eventos con un click
- 🗂️ Panel lateral con todos tus favoritos
- 💿 Persistencia en `localStorage`
- 📊 Contador en el botón de favoritos
- 🗑️ Eliminar de favoritos fácilmente

### 📤 **Compartir Nativo**

- 📱 **Web Share API** en móviles
- 📲 Comparte por WhatsApp, Twitter, etc.
- 🔗 Copiar link al portapapeles
- 🎯 URLs únicas por evento (`?evento=123`)
- 🏛️ También para lugares de interés

### 🌐 **Multiidioma (i18n)**

- 🇪🇸 **Español** (por defecto)
- 🇬🇧 **English**
- 🇫🇷 **Français**
- 🔄 Cambio sin recargar la página
- 💾 Persistencia de preferencia
- 🎯 Detección automática del navegador

### 🎨 **Temas y Diseño**

- 🌙 **Modo oscuro** (por defecto)
- ☀️ **Modo claro**
- 💾 Persistencia entre sesiones
- 🎨 Variables CSS para fácil customización
- 📱 **Diseño responsive** (mobile-first)
- ✨ Animaciones suaves y micro-interacciones

### 📱 **PWA (Progressive Web App)**

- 📲 **Instalable** en móviles y escritorio
- 🔌 **Funciona offline** con Service Workers
- 💨 **Network-first strategy** para datos frescos
- 📦 Cache de eventos, lugares y assets
- 🔔 Preparada para notificaciones push

---

## 🤖 Scraper Automático

### 📊 Flujo de Datos

```
┌─────────────────┐
│   APIs Oficiales│
│  esmadrid.com   │
│  ticketmaster   │
│   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  scraper.py     │
│  ├── Fetch      │
│  ├── Parse      │
│  ├── Clean      │
│  ├── Geocode    │
│  └── Dedupe     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  eventos.json   │
│  lugares.json   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Pages   │
│  (Deploy Auto)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    👤 Usuario   │
│  (Browser PWA)  │
└─────────────────┘
```

### 🔧 ¿Qué hace el scraper?

1. 📡 **Consulta 3 APIs oficiales**:
   - API de **esmadrid.com** (eventos municipales)
   - API de **Ticketmaster** (conciertos y espectáculos)
   
   2. 🧹 **Limpia y normaliza** los datos:
   - Elimina HTML y caracteres especiales
   - Unifica formatos de fechas
   - Normaliza precios

3. 🎯 **Categoriza** automáticamente:
   - Por palabras clave en título/descripción
   - Asigna emoji e icono por tipo

4. 🗺️ **Geocodifica** direcciones:
   - Valida coordenadas dentro de Madrid
   - Usa Google Maps Geocoding API de respaldo
   - Asigna zona/distrito automáticamente

5. 🔍 **Elimina duplicados**:
   - Por nombre + fecha + lugar
   - Prioriza eventos con más información

6. 📅 **Filtra eventos pasados**:
   - Solo eventos vigentes
   - Basado en `fecha_fin` o `fecha`

7. 💾 **Actualiza archivos JSON**:
   - `data/eventos.json` (~1.240 eventos)
   - `data/lugares.json` (~150 lugares)

8. 🚀 **Hace commit y push** al repo

### ⏰ Actualización Automática

- 🤖 **GitHub Actions** ejecuta el scraper
- 📅 **Todos los lunes a las 8:00 AM** (UTC)
- 🔄 También se puede **ejecutar manualmente**
- ⚡ Tarda aprox. **2-3 minutos**
- 📊 **Logs completos** en la pestaña Actions

### 📂 Código del Scraper

```python
# scraper/scraper.py (simplificado)

import requests
from geopy.geocoders import Nominatim
from datetime import datetime

APIS = {
    'esmadrid': 'https://datos.madrid.es/egob/catalogo/...',
    'ticketmaster': 'https://app.ticketmaster.com/discovery/...',
}

def scrape_eventos():
    eventos = []
    
    for api_name, url in APIS.items():
        data = requests.get(url).json()
        eventos += parse_eventos(data, api_name)
    
    eventos = limpiar_eventos(eventos)
    eventos = geocodificar_eventos(eventos)
    eventos = eliminar_duplicados(eventos)
    eventos = filtrar_vigentes(eventos)
    
    guardar_json('data/eventos.json', eventos)
    
scrape_eventos()
```

---

## 🛠️ Stack Tecnológico

### 🎨 Frontend

| Tecnología | Uso | Por qué |
|------------|-----|---------|
| **HTML5** | Estructura semántica | Accesibilidad y SEO |
| **CSS3** | Estilos y animaciones | Variables CSS, Grid, Flexbox |
| **JavaScript Vanilla** | Lógica de la app | Sin dependencias pesadas |
| **Leaflet.js** | Mapas interactivos | Ligero, open source, extensible |
| **Leaflet.markercluster** | Agrupación de marcadores | Rendimiento con +1000 markers |
| **Chart.js** | Gráficos interactivos | Simple, responsive, animado |
| **Font Awesome** | Iconos | 1500+ iconos gratuitos |
| **Google Fonts (Inter)** | Tipografía | Moderna, legible, variable |

### 🐍 Backend / Automatización

| Tecnología | Uso | Por qué |
|------------|-----|---------|
| **Python 3.11** | Lenguaje del scraper | Sintaxis simple, librerías potentes |
| **requests** | HTTP requests | De facto para APIs en Python |
| **geopy** | Geocodificación | Soporte para múltiples providers |
| **python-dateutil** | Parsing de fechas | Maneja formatos diversos |
| **GitHub Actions** | CI/CD | Gratis, integrado, cron jobs |

### 🗄️ Datos

| Fuente | Tipo | Cobertura | Eventos |
|--------|------|-----------|---------|
| [ES Madrid API](https://datos.madrid.es) | JSON REST | Madrid capital | ~800 |
| [Ticketmaster API](https://developer.ticketmaster.com/) | JSON REST | Toda España (filtrado Madrid) | ~300 |
| **Lugares de interés** | JSON estático | Comunidad de Madrid | ~150 |

### 🚀 Hosting & Deploy

- **GitHub Pages**: Hosting gratuito, HTTPS, CDN global
- **Deploy automático**: Cada push a `main` se deploya en segundos
- **Custom domain ready**: Preparado para dominio personalizado

---

## 📁 Estructura del Proyecto

```
eventos-madrid/
│
├── 📄 index.html              # Página principal (SPA)
├── 📄 manifest.json           # PWA manifest
├── 📄 sw.js                   # Service Worker (offline)
├── 📄 README.md               # Este archivo
├── 📄 LICENSE                 # MIT License
│
├── 📁 css/
│   └── style.css              # Estilos (variables, modo oscuro, responsive)
│
├── 📁 js/
│   ├── app.js                 # Lógica principal (mapa, filtros, vistas)
│   └── i18n.js                # Sistema de traducciones
│
├── 📁 data/
│   ├── eventos.json           # 1240+ eventos (auto-actualizado)
│   └── lugares.json           # 150+ lugares de interés
│
├── 📁 icons/
│   ├── icon-192.png           # Icono PWA 192x192
│   └── icon-512.png           # Icono PWA 512x512
│
├── 📁 scraper/
│   ├── scraper.py             # Script principal del scraper
│   ├── config.py              # Configuración (APIs, keywords)
│   ├── requirements.txt       # Dependencias Python
│   └── __pycache__/           # Cache de Python (auto)
│
└── 📁 .github/
    └── workflows/
        └── scraper.yml        # GitHub Actions workflow
```

---

## 🚀 Instalación y Uso

### 📦 Opción 1: Usar la versión en vivo (recomendado)

Simplemente abre [**makaquinhojr.github.io/eventos-madrid**](https://makaquinhojr.github.io/eventos-madrid/) en tu navegador.

**Bonus:** Puedes instalarla como PWA:
- **En móvil**: Toca "Añadir a pantalla de inicio"
- **En PC**: Click en el icono ⊕ de la barra de direcciones

### 🛠️ Opción 2: Ejecutar localmente

```bash
# 1. Clona el repositorio
git clone https://github.com/makaquinhojr/eventos-madrid.git
cd eventos-madrid

# 2. Abre con un servidor local (necesario para CORS)
# Opción A: Python
python -m http.server 8000

# Opción B: Node.js (npx http-server)
npx http-server -p 8000

# Opción C: PHP
php -S localhost:8000

# Opción D: VS Code Live Server (extensión)
# Click derecho en index.html → "Open with Live Server"

# 3. Abre http://localhost:8000 en tu navegador
```

### 🤖 Opción 3: Ejecutar el scraper

```bash
# 1. Instala Python 3.11+
# 2. Instala dependencias
cd scraper
pip install -r requirements.txt

# 3. Ejecuta el scraper
python scraper.py

# Los archivos JSON se actualizarán en data/
```

**Nota:** Necesitarás API keys para Ticketmaster. Configúralas en `scraper/config.py`.

---

## 📊 Métricas del Proyecto

<div align="center">

| Métrica | Valor |
|---------|-------|
| 📅 **Eventos activos** | **1.240+** |
| 🏛️ **Lugares de interés** | **150+** |
| 🌍 **Zonas cubiertas** | **43** (21 distritos + 22 municipios) |
| 🎭 **Categorías** | **7** tipos de eventos |
| 📝 **Líneas de código** | **~3.500** (sin contar librerías) |
| 🔄 **Actualizaciones** | **Automáticas cada lunes** |
| ⚡ **Velocidad** | **< 2s** tiempo de carga |
| 📱 **PWA Score** | **95/100** (Lighthouse) |
| ♿ **Accesibilidad** | **92/100** (Lighthouse) |
| 🎨 **Temas** | **2** (claro/oscuro) |
| 🌐 **Idiomas** | **3** (ES/EN/FR) |

</div>

---

## 🗺️ Roadmap

### ✅ **Fase 1: MVP (Completado)**
- [x] Mapa interactivo con Leaflet
- [x] Marcadores por categoría
- [x] Clustering de marcadores
- [x] Filtros básicos (tipo, fecha)
- [x] Vista lista
- [x] Modo oscuro
- [x] Scraper automático
- [x] GitHub Actions

### ✅ **Fase 2: UX Mejorada (Completado)**
- [x] Geolocalización del usuario
- [x] Cálculo de distancias
- [x] Ordenar por distancia
- [x] Badges HOY/MAÑANA
- [x] Panel de estadísticas
- [x] Búsqueda en tiempo real
- [x] Responsive design

### ✅ **Fase 3: Features Avanzadas (Completado)**
- [x] Sistema de favoritos
- [x] Compartir (Web Share API)
- [x] Vista de calendario
- [x] Dashboard de analytics (gráficos)
- [x] PWA instalable
- [x] Multiidioma (i18n)
- [x] Modo offline completo

### 🔮 **Fase 4: Próximamente**
- [ ] Filtro por radio de distancia (slider)
- [ ] Notificaciones push de eventos cercanos
- [ ] Exportar evento a Google Calendar
- [ ] Sistema de recomendaciones (IA)
- [ ] Integración con redes sociales
- [ ] Comentarios y valoraciones de eventos
- [ ] Modo de vista 3D del mapa
- [ ] Búsqueda por voz (Web Speech API)
- [ ] Comparador de eventos (vs. otros días)
- [ ] Rutas optimizadas (visitar múltiples eventos)

---

## 🎓 Caso de Uso Educativo

Este proyecto es parte de **ciencias de la computación** del **IES Manuel de Falla**.

### 📚 Conceptos aplicados

- ✅ **Arquitectura MVC** (separación frontend/backend/datos)
- ✅ **APIs REST** (consumo de datos JSON)
- ✅ **Web scraping** responsable
- ✅ **Geocodificación** y cálculos geoespaciales
- ✅ **CI/CD** con GitHub Actions
- ✅ **Progressive Web Apps** (PWA)
- ✅ **Internacionalización** (i18n)
- ✅ **Accesibilidad** (ARIA, semántica)
- ✅ **Responsive Design** (mobile-first)
- ✅ **Service Workers** (offline-first)
- ✅ **LocalStorage** (persistencia)
- ✅ **Web Share API**
- ✅ **Geolocation API**
- ✅ **Chart.js** (visualización de datos)
- ✅ **Leaflet.js** (mapas web)

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar EventosMadrid:

1. 🍴 **Fork** el repositorio
2. 🌿 Crea una **rama** (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** a la rama (`git push origin feature/amazing-feature`)
5. 🔀 Abre un **Pull Request**

### 🐛 Reportar bugs

Si encuentras un bug, [abre un issue](https://github.com/makaquinhojr/eventos-madrid/issues/new) con:
- Descripción del problema
- Pasos para reproducirlo
- Screenshots (si aplica)
- Navegador y sistema operativo

---

## 📜 Licencia

Este proyecto está bajo la licencia **MIT** - mira el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2026 Diego SB

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 Agradecimientos

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/placeholder" width="100px;" alt=""/><br />
      <sub><b>🐐 Diego Navarro</b></sub><br />
      <sub>Profesor de Tecnología</sub>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100/C60B1E/FFFFFF/?text=AM" width="100px;" alt=""/><br />
      <sub><b>🏛️ Ayuntamiento de Madrid</b></sub><br />
      <sub>API de eventos municipales</sub>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100/8B5CF6/FFFFFF/?text=CM" width="100px;" alt=""/><br />
      <sub><b>🌍 Comunidad de Madrid</b></sub><br />
      <sub>API de eventos regionales</sub>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100/22c55e/FFFFFF/?text=OSM" width="100px;" alt=""/><br />
      <sub><b>🗺️ OpenStreetMap</b></sub><br />
      <sub>Datos cartográficos libres</sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://via.placeholder.com/100/0891B2/FFFFFF/?text=L" width="100px;" alt=""/><br />
      <sub><b>📦 Leaflet.js</b></sub><br />
      <sub>Librería de mapas open source</sub>
    </td>
    <td align="center">
      <img src="https://via.placeholder.com/100/DC2626/FFFFFF/?text=TM" width="100px;" alt=""/><br />
      <sub><b>🎫 Ticketmaster</b></sub><br />
      <sub>API de eventos y conciertos</sub>
    </td>
  <td align="center">
      <img src="https://via.placeholder.com/100/7C3AED/FFFFFF/?text=CJS" width="100px;" alt=""/><br />
      <sub><b>📊 Chart.js</b></sub><br />
      <sub>Gráficos interactivos</sub>
    </td>
  </tr>
</table>

---

## 👨‍💻 Autor

<div align="center">

**Diego SB**

[![GitHub](https://img.shields.io/badge/GitHub-makaquinhojr-181717?style=for-the-badge&logo=github)](https://github.com/makaquinhojr)
[![Instagram](https://img.shields.io/badge/Instagram-ddiegosb._-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/ddiegosb._/)

**IES Manuel de Falla** · 1º Bach · 2025-2026

</div>

---

## 📞 Contacto

¿Tienes preguntas, sugerencias o quieres colaborar?

- 📧 **Email**: dlopeztostado09@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/makaquinhojr/eventos-madrid/issues)
- 🌟 **¿Te gusta el proyecto?** ¡Dale una estrella en GitHub!

---

## 📈 Estado del Proyecto

![GitHub last commit](https://img.shields.io/github/last-commit/makaquinhojr/eventos-madrid?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/makaquinhojr/eventos-madrid?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/makaquinhojr/eventos-madrid?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/makaquinhojr/eventos-madrid?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/makaquinhojr/eventos-madrid?style=flat-square)

---

<div align="center">

### 🌟 Si este proyecto te ha sido útil, ¡dale una estrella! 🌟

**Hecho con ❤️ en Madrid**

[![GitHub stars](https://img.shields.io/github/stars/makaquinhojr/eventos-madrid?style=social)](https://github.com/makaquinhojr/eventos-madrid/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/makaquinhojr/eventos-madrid?style=social)](https://github.com/makaquinhojr/eventos-madrid/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/makaquinhojr/eventos-madrid?style=social)](https://github.com/makaquinhojr/eventos-madrid/watchers)

---

**[⬆ Volver arriba](#-eventosmadrid)**

</div>

---

**¡Gracias por visitar EventosMadrid! 🎉**