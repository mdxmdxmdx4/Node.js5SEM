const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const responseHtml = `
    <html>
      <head>
        <title>Request Information</title>
      </head>
      <body>
        <h1>Request Information</h1>
        <p>Method: ${req.method}</p>
        <p>URI: ${req.url}</p>
        <p>HTTP Version: ${req.httpVersion}</p>
        <h2>Headers:</h2>
        <pre>${JSON.stringify(req.headers, null, 2)}</pre>
        <h2>Request Body:</h2>
        <pre>${req.method === 'POST' ? 'POST-request has been sended' : 'No request body for this request type.'}</pre>
      </body>
    </html>
  `;

  res.end(responseHtml);
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
