# Análisis técnico y propuesta de mejoras — EventosMadrid

**Fecha:** 2026-08-12
**Alcance:** revisión de todo el repositorio (`index.html`, `css/`, `js/`, `sw.js`, `scraper/`, `data/`, configuración y CI).

---

## 1. Resumen ejecutivo

Es un proyecto muy completo a nivel funcional (mapa, lista, calendario, estadísticas, favoritos, rutas, i18n con 10 idiomas, PWA). Sin embargo, la arquitectura de **código cliente es un monolito** y hay **varios problemas de higiene, seguridad y coherencia de build** que conviene resolver antes de seguir añadiendo funcionalidad. Los puntos críticos son:

1. **`js/main.js` de 3.653 líneas** sin separar en módulos (con `js/modules/store.js` duplicando su estado… ¡sin usarse!).
2. **Deuda de build:** Vite está configurado pero **no se usa para lo desplegado** (el `index.html` carga los módulos fuente directamente y solo hay un workflow de scraper, no de deploy). Hay dependencias cargadas por CDN con **versiones que no coinciden** con `package.json`.
3. **Seguridad:** se usa mucho `innerHTML` con concatenación; DOMPurify se aplica en muchos sitios pero **no en todos**.
4. **Higiene:** `.pyc` versionados, `scratch_i18n.py` con ruta local de Windows, un `console.log` de depuración en producción, y `package.json` con `description` corrupto.
5. **i18n incompleto:** hay muchas cadenas en español "quemadas" fuera de los ficheros de traducción.

A continuación, cada problema con su solución propuesta y prioridad.

---

## 2. Problemas y propuestas de mejora

### 2.1. Bug / deuda: dependencias duplicadas y versiones inconsistentes

`package.json` declara `chart.js ^4.5.1`, `leaflet.markercluster ^1.5.3`, `dompurify ^3.4.0`, `leaflet ^1.9.4`. Pero en tiempo de ejecución:

- `index.html` carga `chart.js@4.4.0` y `leaflet.markercluster@1.4.1` (versiones **distintas** a las de package.json).
- `js/main.js` importa DOMPurify desde un CDN **fijo** `dompurify@3.0.9`, también distinto del de package.json (`^3.4.0`).
- `index.html` carga Leaflet y Chart.js por CDN aunque son dependencias npm instaladas.

**Riesgo:** divergencia de versiones, imposibilidad de auditarlas con `npm audit`, y quiebra de la funcionalidad offline (el service worker excluye esos dominios).

**Propuesta (alta prioridad):**
- Importar `leaflet`, `chart.js`, `dompurify` y `leaflet.markercluster` desde `node_modules` con `import ... from 'leaflet'` etc., y dejar que Vite los empaquete en `dist/assets/vendor.*.js` (ya hay un `manualChunks` para `vendor`).
- Eliminar los `<script src=...cdn...>` de `index.html` y el `import` por URL de DOMPurify.
- Dejar **un único origen de verdad** de versiones (package.json).

---

### 2.2. La build de Vite no se usa para lo desplegado (arquitectura rota)

`index.html` referencia directamente `js/i18n.js`, `js/main.js` y `js/modules/constants.js` como ES modules en bruto. No hay ningún workflow que ejecute `vite build` ni que despliegue `dist/` (el único workflow es `scraper.yml`). Resultado: **en producción (GitHub Pages) se sirven los fuentes sin bundle ni minificado**, y el `npm run build` actualmente no produce nada que se use.

**Propuesta (alta prioridad):**
- Decidir el modelo de entrega. Opciones:
  - **A)** Dejar de usar Vite y servir fuentes ES modules directamente (más simple para GH Pages). Requiere que el service worker cachee los módulos/locales (ver 2.4).
  - **B)** Migrar de verdad a build: que `index.html` apunte a `dist/`, añadir workflow `deploy.yml` (GitHub Actions con `actions/deploy-pages` o `peaceiris/actions-gh-pages`) que haga `npm ci && npm run build`.
- Mi recomendación es la **opción B** (rendimiento, minificado, control de versiones), pero si se prefiere simplicidad, la A es coherente. Lo importante es dejar de tener un build muerto.

---

### 2.3. Monolito `js/main.js` y estado duplicado (deuda principal de mantenibilidad)

- `js/main.js` (3.653 líneas) mezcla: favoritos, share, mapa, filtros, lista, calendario, charts, ajustes, rutas, heatmap, temas, geolocalización, toasts, i18n UI… Todo en un fichero.
- Existe `js/modules/store.js` que exporta `AppState` con **exactamente el mismo estado** que las variables globales de `main.js` (`map`, `allEvents`, `currentFilteredEvents`, `favorites`, `routePlannerMode`…). **`store.js` no se importa en ningún sitio** → código muerto + dos fuentes de verdad.

**Propuesta (prioridad media, gran impacto en mantenibilidad):**
- Eliminar `store.js` (o, mejor, hacer de él la fuente única de estado y migrar las `let` globales a accesos a `AppState`).
- Dividir `main.js` en módulos por responsabilidad, manteniendo la compatibilidad con los `onclick` inline globales:
  - `js/modules/favorites.js`
  - `js/modules/map.js`
  - `js/modules/filters.js`
  - `js/modules/list.js`
  - `js/modules/calendar.js`
  - `js/modules/charts.js`
  - `js/modules/route.js`
  - `js/modules/settings.js`
  - `js/modules/share.js`
- Cada módulo exporta sus funciones y se registran en `window` solo las que usan los `onclick` inline (ya hay un bloque de "EXPORTACIONES GLOBALES" al final que centraliza esto).

---

### 2.4. Service worker: cache incompleto e infraestructura manual frágil

En `sw.js`:
- `ARCHIVOS_ESTATICOS` precachea solo `index.html`, `css/style.css`, `js/main.js`, `js/i18n.js` — **no** los CSS restantes, ni `js/modules/*`, ni `js/locales/*`, ni los iconos/manifest. Con los módulos ES en bruto, **el modo offline quedará roto** para gran parte de la app.
- La versión de cache se sube **manualmente** (`CACHE_VERSION = 'v3'` con comentario "súbelo manualmente"), algo fácil de olvidar → usuarios con app obsoleta.
- Las URLs cachean `eventos.json` por "stale" posiblemente desactualizado frente al `data/` reciente (ver lógica de red en el resto del archivo).

**Propuesta:**
- Incluir en el precache (o precache generado automáticamente tras el build) **todos** los assets estáticos reales: `css/*.css`, `js/modules/*.js`, `js/locales/*.js`, `manifest.json`, `icons/*`. Si se migra a build (2.2), precachear los `dist/assets/*` con el plugin `vite-plugin-pwa` o generando la lista en build time.
- Automatizar la versión de cache en el paso de CI (inyectar hash del build en `CACHE_VERSION`).

---

### 2.5. Seguridad: `innerHTML` con concatenación y sanitizado incompleto

Se usa `innerHTML` con interpolación de datos en muchas funciones. DOMPurify está bien aplicado en varios casos (`safeNombre`, `safeLugar`, etc.), pero quedan huecos:

- `getLinkHTML(evento)` y `getBotonMasInfo(evento)`: insertan `evento.url` **directamente en `href`** sin sanitizar. Aunque `esLinkUtil` comprueba que empiece por `http`, conviene sanitizar igualmente.
- `compartirLugar`: el modal inserta `lugar.nombre` y `lugar.lugar` **sin sanitizar**.
- `compartirEvento`: usa `safeNombre`, pero el botón de copiar usa `safeUrl` mientras `compartirLugar` usa `url` crudo → inconsistencia.
- Gestos `onclick` inline con datos interpolados (`onclick="toggleFavorite(${evento.id})"`) y atributos con comillas sin escapar de forma uniforme.
- `document.title` y varios `aria-label` toman texto de datos sin sanitizar.

**Propuesta (alta prioridad):**
- Sanitizar **siempre** los campos de datos antes de insertarlos en HTML/atributos. Crear un helper `safeAttr()` y usar `DOMPurify.sanitize()` de forma uniforme.
- Migrar los manejadores inline a **delegación de eventos** con `data-id` en lugar de `onclick="fn(${id})"` (más seguro y mantenible).
- Configurar una CSP en `index.html` (si se quitan los scripts externos se simplifica mucho).

---

### 2.6. Higiene del repositorio

1. **`.pyc` versionados:** `scraper/__pycache__/*.pyc` están en git. Añadir `__pycache__/`, `*.pyc` a `.gitignore` y `git rm -r --cached`.
2. **`scratch_i18n.py`:** script desechable con una ruta local de Windows (`d:/aaauuraaa/...`) y lógica de "find/replace" frágil. Debería eliminarse o, si se quiere conservar, convertirse en un script limpio bajo `scripts/`.
3. **`package.json`:** el campo `description` vale literalmente `"<div align=\"center\">"` (un valor corrupto que rompe metadatos). Reemplazarlo por una descripción real.
4. **Debug en producción:** en `js/i18n.js`, el método `t()` tiene un `console.log` de depuración para `months.april`/`months.may`. Eliminarlo.
5. **Autor sin normalizar:** `README.md` dice "Diego SB" y "dlopeztostado09@gmail.com"; `package.json` autor vacío y licencia `ISC` mientras el README dice MIT y `LICENSE` es MIT. Unificar autor y licencia.

---

### 2.7. i18n incompleto (cadenas quemadas)

Hay numerosos textos en español dentro del código, fuera de los ficheros de traducción:

- Toasts: `'🏛️ Lugares visibles'`, `'🏛️ Lugares ocultos'`, `'📍 Activa tu ubicación primero'`, `'❌ No se pudo copiar'`.
- Empty state: `'No se encontraron eventos'`, `'Prueba a cambiar los filtros'`, `'Limpiar filtros'`.
- `aria-label="Cerrar"` en modales.
- `categoriaNombre()` devuelve nombres en español fijos (`Museo`, `Teatro`…) en lugar de usar i18n.

**Propuesta (prioridad media):**
- Mover todas esas cadenas a `js/locales/*.js` (hay claves como `common.showing`, `filters.zone.all`, etc. ya usadas) y llamar a `t()`.
- Traducir `categoriaNombre` vía claves (`place.category.museo`, etc.).

---

### 2.8. Consistencia de datos entre conjuntos

- `data/eventos.json` usa `id` numérico (`1`, `2`…), mientras `data/lugares.json` usa `id` tipo `"lugar-001"`. No es un bug actual, pero es una inconsistencia que complica reutilizar utilidades y el sistema de favoritos/rutas.
- En `eventos.json` hay eventos con `fecha` anterior a hoy y `fecha_fin` lejano (p. ej. `2022-12-14` → `2027-01-01`); el filtro del frontend y el scraper ya contemplan `fecha_fin`, pero conviene documentarlo y validarlo en el scraper para evitar datos "eternos" que ensucian estadísticas.

**Propuesta:** unificar el tipo de `id` o documentar la convención; añadir una validación de sanidad de fechas en `scraper.py` (rango razonable de `fecha_fin`).

---

### 2.9. Rendimiento y carga

- `initCharts()` se invoca en cada `displayEvents`/`loadEvents` y reconstruye 3 gráficos; el gráfico de línea hace **30 filtrados sobre `currentFilteredEvents`** dentro de un bucle (`O(30×n)`). Se puede precomputar un mapa de fecha→conteo en una sola pasada.
- `displayEvents` reconstruye todos los marcadores en cada render. Con ~600 eventos puede ser costoso; con `chunkedLoading` de markercluster se mitiga, pero se puede hacer diff por zoom/visión.
- `renderFavoritesList`, listas y popups reconstruyen HTML grande en cada acción; con delegación de eventos y fragmentos (`DocumentFragment`) se evita reflow.
- El `setTimeout(() => i18n.updateUI(), 100)` tras `load` es un hack; mejor disparar la actualización cuando se cargue el idioma.

**Propuesta:** optimizar los puntos anteriores (precomputación de agregados, fragmentos, evitar re-creación innecesaria de gráficos).

---

### 2.10. Accesibilidad

- Modales (`compartir`, filtros, stats, favoritos, ajustes) gestionan `trapFocus` pero **no restauran el foco** al cerrarse ni siempre bloquean el scroll de fondo.
- Uso masivo de elementos con `onclick` en `<div>` (p. ej. `favorite-item-main` con `role="button"`) que no siempre soportan Enter/Espacio.
- `aria-label` a veces se construye con datos sin escapar.

**Propuesta:** crear un helper de modal reutilizable (apertura/cierre con foco, `aria-hidden`, `Escape`, restauración de foco, bloqueo de scroll), y añadir manejo de teclado a los elementos tipo botón.

---

### 2.11. Configuración de build

- `vite.config.js`: `minify: false` y `target: 'esnext'` en producción. `esnext` puede dejar fuera navegadores antiguos; con `minify` activo (o `terser`/`esbuild`) se reduce el bundle.
- `base: '/eventos-madrid/'` y el `start_url`/`scope` del manifest y la ruta del SW están hardcodeados al subruta de GH Pages. Para dev en local o futuro despliegue en otro dominio habría que parametrizarlos (por ejemplo vía `process.env.BASE_URL` o relativo).

---

## 3. Plan de acción sugerido (por prioridad)

| # | Prioridad | Acción | Esfuerzo |
|---|-----------|--------|----------|
| 1 | Alta | Corregir `package.json` (`description`, autor, licencia) y eliminar debug `console.log` en `i18n.js` | 10 min |
| 2 | Alta | Quitar `.pyc` de git + añadir a `.gitignore`; eliminar `scratch_i18n.py` | 10 min |
| 3 | Alta | Sanear `innerHTML`/URLs con DOMPurify de forma uniforme (incl. `getLinkHTML`, `compartirLugar`) | 0,5–1 día |
| 4 | Alta | Unificar dependencias: importar desde npm y quitar CDNs; fijar una sola versión | 0,5 día |
| 5 | Alta | Decidir modelo de build y conectar `vite build` + workflow de deploy (o eliminar el build muerto) | 1 día |
| 6 | Media | Completar el precache del service worker + automatizar `CACHE_VERSION` | 0,5 día |
| 7 | Media | Completar i18n (toasts, empty states, `categoriaNombre`, aria) | 0,5 día |
| 8 | Media | Eliminar/usar `store.js` y modularizar `main.js` | 2–3 días |
| 9 | Media | Optimizaciones de rendimiento (charts precomputados, fragmentos, delegación) | 1 día |
| 10 | Baja | Mejoras de accesibilidad (modales con foco, teclado) | 1 día |
| 11 | Baja | Parametrizar `base`/`start_url`/SW path | 0,5 día |

---

## 4. Conclusión

La base funcional es sólida y el producto está bien resuelto a nivel de UX. Las mejoras de **mayor impacto** son las de coherencia de build (2.1/2.2), **seguridad de renderizado** (2.5) e **higiene** (2.6), que son de bajo coste. La **modularización** (2.3) es la mejora de mayor valor a medio plazo para que el proyecto siga creciendo sin deuda acumulada. El resto son pulidos de calidad (i18n, rendimiento, a11y).

> Nota: este documento no modifica el código. Si quieres, puedo aplicar cualquiera de estas mejoras (empezando por las de prioridad alta) en una serie de cambios.
