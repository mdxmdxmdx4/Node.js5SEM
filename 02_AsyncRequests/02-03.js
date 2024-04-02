const http = require('http');

const port = 5000;

const server = http.createServer((req, res) => {
  // Добавьте следующий заголовок, чтобы разрешить запросы с другого порта
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

  if (req.url === '/api/name' && req.method === 'GET') {
    // Формируем текстовый ответ с вашей фамилией, именем и отчеством
    const fullName = 'Лешук Дмитрий Игоревич';

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(fullName);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
