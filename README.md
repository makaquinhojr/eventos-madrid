<div align="center">

![EventosMadrid Logo](https://img.shields.io/badge/EventosMadrid-Innovación_Turística-C60B1E?style=for-the-badge&logo=googleearth&logoColor=white)

# EventosMadrid: La Evolución del Ocio Multilingüe e Inteligente

**Plataforma Integral de Eventos Culturales y de Ocio para la Comunidad de Madrid. Diseñada a nivel Enterprise.**

[![🌐 Live Demo](https://img.shields.io/badge/🌐_DEMO_EN_VIVO-makaquinhojr.github.io/eventos--madrid-4CAF50?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)
[![PWA Ready](https://img.shields.io/badge/📱_PWA-100%25_Offline_Ready-7C3AED?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)
[![Arquitectura](https://img.shields.io/badge/⚡_Vite-Dynamic_Import-FFD500?style=for-the-badge&logo=vite&logoColor=black)](https://vitejs.dev/)
[![Auto Update](https://img.shields.io/badge/🤖_ETL-Python_Pipeline-8B5CF6?style=for-the-badge&logo=python)](https://github.com/makaquinhojr/eventos-madrid/actions)

<br>

### 🏛️ Transformando la Cultura de Madrid en una Experiencia Digital Sin Precedentes
</div>

---

## 🚀 Resumen Ejecutivo

**EventosMadrid** no es solo una web; es una **Solución Tecnológica de Nivel Institucional**. Creada como una *Progressive Web App (PWA)* de próxima generación, resuelve la fragmentación de la oferta cultural de la Comunidad de Madrid unificando todas las fuentes de datos (municipales y privadas) en una sola interfaz ultrarrápida, hiper-personalizada y multilingüe.

Nuestro objetivo es presentarnos como la **herramienta definitiva** para potenciar el turismo, facilitar accesibilidad ciudadana y promover el ecosistema cultural madrileño mediante un software de talla mundial.

### 🎯 El Problema (Status Quo)
- **Fragmentación:** La oferta de ocio se encuentra dispersa en docenas de portales desactualizados y con pobre rendimiento.
- **Barrera Idiomática Turística:** El turista internacional depende de traductores externos para comprender la agenda cultural local.
- **Falta de Rendimiento Céntrico:** Interfaces toscas en móvil que no aprovechan las capacidades nativas de los smartphones.

### ✅ La Solución (Nuestra Plataforma)
- **Centralización Autónoma:** Pipeline ETL (Extracción, Transformación, Carga) con algoritmos de IA en Python que purga, deduce la localización y unifica datos automáticamente todas las semanas sin intervención humana.
- **"Lazy Loading" Multilingüe (9 Idiomas):** Arquitectura Vite que carga los módulos de idiomas (Inglés, Coreano, Chino, Coreano...) dinámicamente bajo demanda, reduciendo latencia.
- **Diseño Apple-Tier (Glassmorphism):** Estética rica y fluida con micro-animaciones, logrando un *engagement* y un "Efecto WOW" en el primer segundo de uso.

---

## ✨ Suite de Características Premium

### 🗺️ **Motor Geoespacial Híbrido**
- Renderizado de **más de 1.240 eventos paralelos** a 60 hercios.
- **Clustering Topológico Inteligente:** Agrupación dinámica de puntos en los polígonos del mapa para evitar asfixia visual, vital en centros turísticos masivos.
- **Algoritmo de Ruteo Inteligente:** Funciones de optimización geométrica ("Mi Ruta") para que los turistas planeen itinerarios de un punto de interés a otro.

### 🌐 **Sistema i18n Altamente Escalable**
- Una arquitectura de diccionarios separada por módulos ES6 nativos, cargados vía resoluciones de promesas (`await import`). Soporte instantáneo de **9 idiomas (incluyendo asiáticos y europeos)**, con capacidad arquitectónica para escalar a +100 sin latencia en la carga inicial de la aplicación.
- **Auto-Traducción en Tiempo Real** para la descripción específica y el título del evento conectando API asíncronas externas de lenguaje iterativo.

### 📊 **Inteligencia de Datos y Dashboards**
- Visualización de KPI interactivos con `Chart.js` integrados sobre distribuciones turísticas de mercados, fiestas, y eventos infantiles, útiles de forma recíproca para los propios gestores municipales.

### ⚙️ **Accesibilidad Universal (Aesthetics & WCAG)**
- **Glassmorphism Layer:** Componentes esmerilados e interacciones dinámicas de agua y fricción acrílica (*ripple effect*).
- Modos adaptativos: Alteración del alto contraste, tamaño extendido para la comunidad de tercera edad y temas sensibles foto-lumínicamente. Soporte completo de **Modo Oscuro/Claro** del sistema nativo (Android/iOS).

---

## 🤖 El Cerebro: Pipeline ETL Autónomo

EventosMadrid está desconectado del "trabajo manual". Su sistema de recolección Python reside y opera de manera autónoma en contenedores escalables de la nube.

1. **Ingesta Multi-Hub**: Consume nativamente de los nodos gubernamentales de *datos.madrid.es* e indexa fuentes de ticket privadas (ej. *Ticketmaster*).
2. **Geodetección Natural:** Convierte "direcciones texto" brutas en coordenadas lat/lng (Logística de Geocoding Vector).
3. **Despliegue GitHub Actions:** El flujo se eyecta puntualmente los Lunes a primera hora, compilando el repositorio de eventos en formato JSON encriptado de bajísimo peso para el PWA.

---

## 🛠️ Arquitectura de Software Nivel Enterprise

La re-escritura con el _Stack_ Tecnológico moderno posiciona a este proyecto como top tier en mantenibilidad, escalado modular y tolerancia a fallos.

### Frontend
- **Vite Bundler:** Compilación superagresiva para PWA. Fragmentación (Code Splitting) agresivo, Drop Console y depuración nativa en `esnext`.
- **CSS Modular Orientado a Utilidad:** Separa contundentemente Variables, Layout, Componentes Core y una capa superior `premium.css` para inyectar transiciones gráficas.
- **Patrón Offline Persistente:** Un Service Worker construido bajo la estrategia *Network-First fallback to Cache*, lo que significa que un turista bajo tierra usando el metro tiene la aplicación **100% activa**. 

### Backend Data Pipeline
- **Python 3.11** Core
- **Geopy & Dateutil**
- Pipeline de Integración Continua (CI/CD)

---

## 📈 Potencial de Negocio (Para Instituciones Públicas / Start-ups)

*EventosMadrid* se postula no como un mapa, si no como el esqueleto digital de la "Ciudad Inteligente" (Smart-City). La arquitectura actual facilita:
1. **Pasarelas de Compra**: Modularización lista para engarzar un SDK de pagos sin fricción.
2. **Geofencing Analytics**: Permite lanzar Push Notifications si un usuario PWA cruza físicamente a menos de 100m de un museo.
3. **Impacto Económico Medible**: Conducir al turismo extranjero hacia distritos periféricos usando recomendaciones visuales (mapas de calor interactivos incrustados).

---

## 💼 Autor y Postulación Comercial

<div align="center">

**Diego SB**

Proyecto de desarrollo tecnológico y modelado turístico para la modernización de la agenda de ocio de la Comunidad de Madrid. Buscando activamente partners institucionales o de aceleración tecnológica para llevar la Smart-City un paso más lejos.

[![GitHub](https://img.shields.io/badge/GitHub-makaquinhojr-181717?style=for-the-badge&logo=github)](https://github.com/makaquinhojr)
[![Email](https://img.shields.io/badge/Email-Contacto_Directo-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dlopeztostado09@gmail.com)
</div>

---

> Distribuido bajo Licencia **MIT**. Arquitectura patentable para despliegues municipales escalables. Ver [LICENSE](LICENSE).
<div align="center">
<b>Ingeniería y Diseño hecho con ❤️ en Madrid, España.</b>
</div>