// Servidor estático para el preview de EventosMadrid.
// Sirve el repositorio raíz desde la raíz "/" (sin prefijo) para que el
// service worker registrado bajo /eventos-madrid/ NO interfiera en el
// preview. También se mantiene /eventos-madrid/ como alias.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..'); // raíz del repositorio
const PREFIX = '/eventos-madrid';
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.map': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  const raw = decodeURIComponent(req.url.split('?')[0]);
  let urlPath = raw;

  // Alias: /eventos-madrid/... → servir desde la raíz del repo
  if (urlPath.startsWith(PREFIX)) {
    urlPath = urlPath.slice(PREFIX.length) || '/';
  }

  // Sin sufijo → index.html (la app vive en la raíz del repo)
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';

  let filePath = path.join(ROOT, urlPath);

  // Seguridad: evitar path traversal fuera de ROOT
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(ROOT))) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(resolved, (err, stat) => {
    if (!err && stat.isDirectory()) {
      filePath = path.join(resolved, 'index.html');
    }
    fs.readFile(filePath, (err2, data) => {
      if (err2) {
        res.writeHead(404); res.end('Not Found: ' + urlPath); return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        // No cachear en el preview para que cada recarga sea fresca
        'Cache-Control': 'no-store'
      });
      res.end(data);
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`EventosMadrid static server en http://0.0.0.0:${PORT}/`);
});
