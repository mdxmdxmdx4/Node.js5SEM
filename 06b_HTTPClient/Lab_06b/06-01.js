const http = require('http');

const options =
{
    host: 'localhost',
    path: '/user/2',
    port: 3000,
    method: 'GET'
};

    http.request(options, response => {
    console.log('http.request: statusCode: ', response.statusCode);
    console.log('http.request: statusMessage: ', response.statusMessage);

    let data = '';
    response.on('data', (chunk) => {
        data += chunk;
    });
    response.on('end', () => {
        console.log('body:', data);
    });
}).on('error', (error) => console.log(error.message)).end();
