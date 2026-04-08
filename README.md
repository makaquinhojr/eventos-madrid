# Eventos Madrid

Este proyecto es una página web sencilla para mostrar eventos en Madrid usando datos locales.

## Contenido del proyecto

- `index.html` - página principal que carga la aplicación.
- `css/style.css` - estilos básicos de la interfaz.
- `js/app.js` - lógica JavaScript para leer y mostrar los eventos.
- `data/eventos.json` - datos de ejemplo con los eventos disponibles.

## Cómo usar

1. Abre `index.html` en un navegador.
2. La página cargará los eventos desde `data/eventos.json`.
3. Navega por la lista de eventos para ver información relevante.

## Notas

- El proyecto no requiere servidor; funciona localmente si el navegador permite cargar archivos JSON desde el sistema de archivos.
- Si hay problemas con la carga de `data/eventos.json`, usa un servidor local simple como `python3 -m http.server` desde la carpeta del proyecto.

## Licencia

Proyecto abierto para uso y adaptación personal.
