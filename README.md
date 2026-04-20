# 🎉 EventosMadrid

<div align="center">

![EventosMadrid Banner](https://img.shields.io/badge/EventosMadrid-Descubre_Madrid-C60B1E?style=for-the-badge&logo=googleearth&logoColor=white)

**Plataforma Integral de Eventos Culturales y de Ocio en la Comunidad de Madrid**

[![🌐 Live Demo](https://img.shields.io/badge/🌐_DEMO_EN_VIVO-makaquinhojr.github.io/eventos--madrid-4CAF50?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)
[![GitHub Stars](https://img.shields.io/github/stars/makaquinhojr/eventos-madrid?style=for-the-badge&logo=github&color=yellow)](https://github.com/makaquinhojr/eventos-madrid/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[![Eventos Activos](https://img.shields.io/badge/📅_Eventos_Activos-1240+-FF6B35?style=for-the-badge)](https://github.com/makaquinhojr/eventos-madrid/blob/main/data/eventos.json)
[![Lugares](https://img.shields.io/badge/🏛️_Lugares_de_Interés-150+-0891B2?style=for-the-badge)](https://github.com/makaquinhojr/eventos-madrid/blob/main/data/lugares.json)
[![Auto Update](https://img.shields.io/badge/🤖_Auto_Update-Cada_Lunes_8AM-8B5CF6?style=for-the-badge&logo=githubactions)](https://github.com/makaquinhojr/eventos-madrid/actions)
[![PWA Ready](https://img.shields.io/badge/📱_PWA-Instalable-7C3AED?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)

<br>

### 🏙️ Proyecto de Innovación Tecnológica para la Comunidad de Madrid

</div>

---

## 🚀 Visión General

**EventosMadrid** es una **Progressive Web App (PWA)** de alto rendimiento diseñada para modernizar la forma en que los ciudadanos y turistas descubren eventos culturales y de ocio en la Comunidad de Madrid. Muestra **más de 1.240 eventos** en tiempo real sobre un mapa interactivo.

Este proyecto personal nace con la misión de ser presentado como una solución innovadora a las instituciones de la **Comunidad de Madrid**, centralizando la oferta cultural dispersa en una interfaz unificada, ultrarrápida y accesible.

### 🎯 El problema que resuelve

- ❌ Las plataformas institucionales actuales suelen ser difíciles de navegar en dispositivos móviles.
- ❌ No existe una vista unificada que centralice eventos municipales, regionales y de plataformas privadas.
- ❌ Dificultad para encontrar eventos geolocalizados cerca del usuario en tiempo real.
- ❌ Barreras idiomáticas y de accesibilidad para turistas.

### ✅ La solución arquitectónica

- ✅ **Mapa interactivo de alta densidad** con más de 1.240 eventos actualizados automáticamente mediante scraping inteligente.
- ✅ **Geolocalización precisa** para calcular distancias y rutas hacia eventos cercanos.
- ✅ **Filtros avanzados en tiempo real** por tipo, fecha, zona, precio y distancia.
- ✅ **Planificador de rutas** para crear itinerarios culturales personalizados.
- ✅ **100% offline-ready** gracias a una estrategia avanzada de Service Workers.
- ✅ **Multiidioma nativo (9 idiomas)**: Español, Inglés, Francés, Alemán, Portugués, Italiano, Chino, Japonés y Coreano.
- ✅ **Arquitectura modular ultrarrápida** empaquetada y optimizada con **Vite**.

---

## ✨ Características Principales

### 🗺️ **Mapa Interactivo Híbrido**
- 📍 **+1.240 eventos** renderizados a 60FPS.
- 🔄 **Clustering dinámico** para evitar sobresaturación visual en zonas céntricas.
- 🏛️ **+150 lugares de interés histórico y cultural** de la Comunidad de Madrid.
- 🎯 Integración fluida con Google Maps para navegación *turn-by-turn*.

### 📍 **Geointeligencia y Distancias**
- 📡 Detección de ubicación con un solo click.
- 📏 Cálculo de proximidad exacta y asignación de rangos visuales (<1km, 1-5km, >5km).

### 🔍 **Motor de Búsqueda y Filtrado**
- 📅 **Temporal**: Hoy, fin de semana, próximos 7 días, mes actual.
- 🎭 **Categorización AI**: Conciertos, Fiestas, Mercados, Cultura, Gastronomía, Deportes, Infantil.
- 💰 **Precios**: Eventos gratuitos, de pago, o por límite de presupuesto.
- 📍 **Espacial**: Filtrado por los 21 distritos de Madrid Capital y 22 municipios de la Comunidad.

### 📊 **Dashboard Analítico**
- 📈 Gráficos interactivos (Chart.js) que muestran la distribución cultural de la Comunidad.
- 🔢 Estadísticas en tiempo real de la oferta de ocio disponible.

### ⚙️ **Personalización y Accesibilidad (WCAG)**
- 🌙 **Tema oscuro y claro** con soporte nativo de sistema.
- 🎨 Temas de acento personalizados (Sunset, Forest, Ocean, Berry).
- 👁️ Modo de alto contraste y ajustes de fuentes grandes para accesibilidad.
- 🌍 Traducción automática de eventos (i18n en la nube).

### 📱 **Progressive Web App (PWA)**
- 📲 Instalable como aplicación nativa (iOS y Android).
- 🔌 **Network-first strategy** para garantizar disponibilidad de datos sin conexión.

---

## 🤖 Sistema Autónomo de Recopilación de Datos (Data Pipeline)

El proyecto cuenta con un scraper en Python que se ejecuta autónomamente en la nube, alimentando el frontend sin intervención manual.

### 🔧 Arquitectura del Pipeline:

1. 📡 **Integración de APIs Oficiales**: Consume datos del catálogo de *datos.madrid.es* y *Ticketmaster API*.
2. 🧹 **ETL y Normalización**: Limpia HTML, estandariza fechas y homogeneiza precios.
3. 🗺️ **Geocodificación Automática**: Asigna coordenadas precisas y distritos a eventos sin información espacial.
4. 🤖 **Categorización Semántica**: Asigna categorías e iconos basados en el análisis del texto.
5. 🔍 **Deduplicación**: Algoritmo de detección para evitar mostrar el mismo evento múltiples veces.

⏰ El pipeline se ejecuta vía **GitHub Actions** todos los lunes a las 8:00 AM (UTC).

---

## 🛠️ Stack Tecnológico

La arquitectura ha sido refactorizada recientemente para asegurar escalabilidad y un entorno de desarrollo profesional, migrando de scripts monolíticos a un sistema modular moderno.

### 🎨 Frontend

| Tecnología | Rol |
|------------|-----|
| **Vite** | Bundler de ultra-alta velocidad, HMR y optimización de assets. |
| **Arquitectura CSS Modular** | Estilos divididos lógicamente (`variables`, `layout`, `components`, `utilities`) para mantenibilidad sin preprocesadores pesados. |
| **ES6+ Modules** | Lógica de negocio y manejo de estado segregados. |
| **Leaflet.js & MarkerCluster** | Motor geoespacial ligero y de alto rendimiento. |
| **Chart.js** | Visualización interactiva de métricas. |
| **Service Workers** | Manejo de caché y capacidades PWA. |

### 🐍 Backend Data Pipeline

| Tecnología | Rol |
|------------|-----|
| **Python 3.11** | Lenguaje núcleo del pipeline ETL. |
| **requests & python-dateutil** | Consumo REST y parsing cronológico. |
| **geopy** | Motor de geocodificación espacial. |
| **GitHub Actions** | Automatización CI/CD y despliegue del flujo de datos. |

---

## 🚀 Despliegue y Desarrollo Local

### 🛠️ Entorno de Desarrollo (Vite)

Para correr la versión de desarrollo local con Hot Module Replacement (HMR):

```bash
# 1. Clona el repositorio
git clone https://github.com/makaquinhojr/eventos-madrid.git
cd eventos-madrid

# 2. Instala las dependencias (Vite, dependencias de desarrollo)
npm install

# 3. Levanta el servidor local ultra-rápido
npm run dev

# 4. Construye para producción (generará la carpeta /dist optimizada)
npm run build
```

### 🤖 Pipeline de Datos Local

```bash
cd scraper
pip install -r requirements.txt
python scraper.py
```

---

## 📈 Impacto y Futuro

Este proyecto demuestra cómo el uso de tecnologías modernas, integradas con los **datos abiertos de la Comunidad de Madrid**, puede generar herramientas de valor público, intuitivas y eficientes. 

El código base modularizado con Vite permite añadir nuevas funcionalidades como integraciones de compra de entradas, IA para recomendaciones de itinerarios turísticos y notificaciones geo-cercadas (Geofencing) de manera estructurada y escalable.

---

## 👨‍💻 Autor

<div align="center">

**Diego SB**

Proyecto de desarrollo de software enfocado a smart-cities e innovación tecnológica para la Comunidad de Madrid.

[![GitHub](https://img.shields.io/badge/GitHub-makaquinhojr-181717?style=for-the-badge&logo=github)](https://github.com/makaquinhojr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com)
[![Email](https://img.shields.io/badge/Email-Contacto-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dlopeztostado09@gmail.com)

</div>

---

## 📜 Licencia

Distribuido bajo licencia **MIT**. Ver [LICENSE](LICENSE) para más información.

<div align="center">
**Hecho con ❤️ en Madrid**
</div>