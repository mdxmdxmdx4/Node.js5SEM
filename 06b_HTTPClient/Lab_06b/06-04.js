const http = require('http');

const params = JSON.stringify(
    {
        _comment: "Запрос. Лабараторная работа 6/8",
        x : 1,
        y : 2,
        s : "Сообщение",
        m : ["1","2","3"],
        o : {"surname" : "Иванов", "name": "Иван"}
    }
);

const options = {
    host: 'localhost',
    path: '/json',
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