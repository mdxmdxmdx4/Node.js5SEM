const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/task3') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
        try {
        const postData = JSON.parse(data);

        if (postData.x !== undefined && postData.y !== undefined && postData.s !== undefined) {
          const sum = postData.x + postData.y;
          const stringsArray = postData.s.split(',');

          const result = {
            sum,
            stringsArray,
          };

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid parameters');
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON format');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
