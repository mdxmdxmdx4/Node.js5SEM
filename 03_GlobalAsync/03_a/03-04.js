const http = require('http');
const url = require('url');
const fetch = require('node-fetch');

function factorial(n, callback) {
    if (n === 0) {
        process.nextTick(() => callback(1));
    } else {
        process.nextTick(() => factorial(n - 1, (result) => callback(n * result)));
    }
}

const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url,true).query;
    const k = parseInt(queryObject.k);
    factorial(k, (fact) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`${k}, ${fact}`);
    });
});

server.listen(5000, '127.0.0.1', () => {
    console.log('Сервер работает по адресу http://localhost:5000');
});

const server2 = http.createServer(async (req, res) => {
    let results = '';
    const startTime = Date.now();
    for (let i = 1; i <= 20; i++) {
        const response = await fetch(`http://localhost:5000/fact?k=${i}`);
        const data = await response.text();
        const timeElapsed = Date.now() - startTime;
        const [k, fact] = data.split(', ');
        results += `${i}.Результат: ${timeElapsed}-${k}/${fact}\n`;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(`<pre>${results}</pre>`);
});

server2.listen(3000, '127.0.0.1', () => {
    console.log('Сервер работает по адресу http://localhost:3000');
});
