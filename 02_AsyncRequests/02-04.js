const http = require('http');
const fs = require('fs');

const port = 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/name' && req.method === 'GET') {
    const fullName = 'Лешук Дмитрий Игоревич';
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(fullName);
  } else if (req.url === '/xmlhttprequest' && req.method === 'GET') {
    fs.readFile('xmlhttprequest.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
