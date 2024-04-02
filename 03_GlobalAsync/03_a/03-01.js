const http = require('http');
const readline = require('readline');

let state = 'norm';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>${state}</h1>`);
});

server.listen(5000, '127.0.0.1', () => {
    console.log(`Сервер работает по адресу http://localhost:5000`);
    process.stdout.write(`${state} -> `);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const newState = input.trim();
    if (['norm', 'stop', 'test', 'idle', 'exit'].includes(newState)) {
        if (newState === 'exit') {
            rl.close();
            process.exit();
        } else {
            console.log(`reg = ${state} --> ${newState}`);
            state = newState;
        }
    } else {
        console.log(`Ошибка: ${newState}`);
    }
    process.stdout.write(`${state} -> `);
});
