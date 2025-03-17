// Simple HTTP server to serve the static export
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456; // Using an uncommon port to avoid conflicts
const STATIC_DIR = path.join(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Handle root path
  let url = req.url;
  if (url === '/') {
    url = '/index.html';
  }
  
  // Handle clean URLs (e.g., /simulator instead of /simulator.html)
  if (!path.extname(url) && !url.endsWith('/')) {
    const htmlFile = `${url}.html`;
    if (fs.existsSync(path.join(STATIC_DIR, htmlFile))) {
      url = htmlFile;
    }
  }
  
  // Resolve the file path
  const filePath = path.join(STATIC_DIR, url);
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found, serve 404 page
      res.writeHead(404, { 'Content-Type': 'text/html' });
      fs.readFile(path.join(STATIC_DIR, '404.html'), (err, data) => {
        if (err) {
          res.end('404 - File Not Found');
        } else {
          res.end(data);
        }
      });
      return;
    }
    
    // Get the file extension
    const ext = path.extname(filePath);
    
    // Set the content type
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 - Internal Server Error');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`
=============================================
   Groovy Surf App Server
=============================================

Server running at: http://localhost:${PORT}

Available pages:
- Home:         http://localhost:${PORT}/
- Simulator:    http://localhost:${PORT}/simulator
- Dashboard:    http://localhost:${PORT}/dashboard
- Brand:        http://localhost:${PORT}/brand
- MCP:          http://localhost:${PORT}/mcp

Press Ctrl+C to stop the server
=============================================
  `);
});