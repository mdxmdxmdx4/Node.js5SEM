const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (pathname === '/task2') {
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    if (!isNaN(x) && !isNaN(y)) {
      const sum = x + y;
      const difference = x - y;
      const product = x * y;

      const result = {
        sum,
        difference,
        product,
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid parameters');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
