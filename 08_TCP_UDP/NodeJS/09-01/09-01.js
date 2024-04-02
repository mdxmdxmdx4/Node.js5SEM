const net = require('net');

const HOST = '0.0.0.0';
const PORT = 3000;

const server = net.createServer().listen(PORT, () => {console.log(`Server started on port ${PORT}...`)});

server.on('connection', socket => {
    console.log('user connected');

    socket.on('data', data => {
        console.log(`message from client: "${data}"`);
        socket.write(`ECHO: ${data}`);
    });

    socket.on('close', () => {
        console.log('user disconnected');
    });

    socket.on("error", (error) => {
        console.log(`Error: ${error}`);
    });
});

