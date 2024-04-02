const http = require('http');
const url = require('url');

function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/fact' && parsedUrl.query.k !== undefined) {
        const k = parseInt(parsedUrl.query.k);
        const fact = factorial(k);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ k: k, fact: fact }));
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Укажите правильный адрес и параметр k');
    }
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Сервер работает по адресу http://localhost:5000');
});
