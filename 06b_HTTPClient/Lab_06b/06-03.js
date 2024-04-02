const http = require('http');

const params = JSON.stringify({x: 101, y: 288, s: 'by,gg,sword'})

const options = {
    host: 'localhost',
    path: '/task3',
    port: 3000,
    method: 'POST'
};

    http.request(options, response => {
    console.log('http.request: status code: ', response.statusCode);

    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        console.log('body:', data);
    });
}).on('error', (error) => console.log(error.message)).end(params);