const http = require('http');
const fs = require('fs');

const port = 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/png' && req.method === 'GET') {
    fs.readFile('pic.png', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
