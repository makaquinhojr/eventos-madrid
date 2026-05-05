# EventosMadrid

Plataforma web para descubrir eventos culturales y de ocio en la Comunidad de Madrid, con experiencia optimizada para movil, visualizacion en mapa, listado y calendario, y enfoque en accesibilidad e internacionalizacion.

[![Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-7C3AED?style=for-the-badge)](https://makaquinhojr.github.io/eventos-madrid/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## Vision

EventosMadrid nace para resolver un problema claro: la informacion de ocio en Madrid esta dispersa en muchos portales, con mala experiencia de uso en movil y poca adaptacion a turistas internacionales.

La propuesta es una unica interfaz rapida y usable para explorar eventos por ubicacion, fecha, tipo y preferencias personales.

## Posicionamiento

EventosMadrid se posiciona como una iniciativa **startup institucional**: producto digital con mentalidad de negocio y capacidad de colaboracion con administraciones, entidades culturales y partners turisticos.

## Propuesta de valor

- **Todo en un solo sitio:** mapa, lista y calendario sincronizados.
- **Mobile-first real:** interfaz pensada para uso diario en smartphone.
- **Escalable para producto:** arquitectura modular y preparada para evolucion comercial.
- **Accesible e inclusiva:** modo oscuro, alto contraste, texto grande y reduccion de animaciones.
- **Internacional:** sistema i18n con **10 idiomas** y carga modular.
- **Dato vivo:** eventos **actualizados cada semana**.

## Caracteristicas principales

- **Exploracion geoespacial**
  - Mapa interactivo con `Leaflet`.
  - Cluster de marcadores para mantener claridad visual.
  - Popups enriquecidos con acciones rapidas.

- **Vistas complementarias**
  - Vista lista con filtros, ordenacion y densidad.
  - Vista calendario para navegacion por fechas.
  - Cambio de vista inmediato y consistente.

- **Personalizacion y utilidad**
  - Favoritos persistentes.
  - Panel de estadisticas con `Chart.js`.
  - Planificador de ruta para organizar visitas.
  - Heatmap para explorar concentracion de eventos.

- **Experiencia de producto**
  - PWA con soporte offline mediante `service worker`.
  - Interfaz responsive y optimizada para tactil.
  - Componentes visuales modernos (glassmorphism, microinteracciones).

- **Internacionalizacion y contenido**
  - Soporte en **10 idiomas**.
  - Arquitectura modular para ampliar idiomas sin penalizar la carga inicial.
  - Dataset de eventos con **actualizacion semanal**.

## Stack tecnologico

**Frontend**
- HTML5, CSS3 modular, JavaScript (ES Modules)
- `Vite` para desarrollo y build
- `Leaflet` + `leaflet.markercluster`
- `Chart.js`
- `DOMPurify`
- `Font Awesome`

**Infra/Operacion**
- Despliegue estatico (GitHub Pages)
- Estructura preparada para pipeline de datos y automatizacion

## Arquitectura (alto nivel)

El proyecto se organiza en capas para mantener escalabilidad y mantenimiento:

- `index.html`: estructura principal de la app.
- `css/`: estilos separados por responsabilidades (`variables`, `layout`, `components`, `utilities`, `premium`, `mobile-ux`).
- `js/`: logica de aplicacion, estado, modulos y localizacion.
- `data/`: dataset de eventos.
- `sw.js`: capacidades PWA/offline.

Este enfoque permite iterar rapidamente en UI/UX sin comprometer rendimiento ni legibilidad del codigo.

## Instalacion y uso

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
npm run preview
```

## Casos de uso

- **Usuario final:** encontrar planes por zona, fecha y tipo en segundos.
- **Turismo y ciudad:** facilitar acceso a oferta cultural para visitante internacional.
- **Instituciones/partners:** base digital para iniciativas de smart city y promocion local.

## CTA comercial

### Colaboracion abierta

Busco colaboraciones con:

- Ayuntamientos y organismos publicos que quieran modernizar su agenda cultural digital.
- Entidades de turismo, cultura y ocio interesadas en aumentar alcance e impacto.
- Partners tecnologicos para escalar el producto a nivel ciudad/region.

### Que ofrezco

- Producto funcional ya desplegado y demostrable.
- Base tecnica lista para pilotos institucionales.
- Rapidez de iteracion para adaptar branding, fuentes de datos y necesidades operativas.

### Contacto directo para partnership

Si quieres explorar un piloto, colaboracion o acuerdo de integracion:

- Email: [dlopeztostado09@gmail.com](mailto:dlopeztostado09@gmail.com)
- GitHub: [makaquinhojr](https://github.com/makaquinhojr)

## Roadmap sugerido

- Integraciones de ticketing y reserva.
- Recomendaciones personalizadas por comportamiento.
- Alertas geolocalizadas y notificaciones push avanzadas.
- Panel B2B para ayuntamientos, entidades y promotores.

## Diferenciales para "vender" el proyecto

- **Problema real y localizable** (ocio fragmentado en Madrid).
- **Producto visible y demostrable** con demo publica.
- **Calidad de ejecucion** en UX movil, rendimiento y accesibilidad.
- **Base tecnica solida** para evolucionar a SaaS, licenciamiento o partnership institucional.
- **Narrativa startup institucional**: innovacion de producto con aplicacion directa en sector publico.

## Autor

**Diego SB**  
GitHub: [makaquinhojr](https://github.com/makaquinhojr)  
Contacto: [dlopeztostado09@gmail.com](mailto:dlopeztostado09@gmail.com)

## Licencia

Este proyecto se distribuye bajo licencia [MIT](LICENSE).
