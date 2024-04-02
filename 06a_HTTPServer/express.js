const express = require('express');
const formidable = require('formidable');
const mv = require('mv');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

let keepAliveTimeout = 0;

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(
    `Request - Method: ${req.method}, Path: ${req.url}, Date: ${new Date().toDateString()}, Time: ${new Date().toLocaleTimeString()}`
  );
  next();
});

app.get('/public/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public', filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.status(200).type('text/html').send(data);
    }
  });
});

app.get('/upload', (req, res) => {
  const formHtml = `
    <html>
      <head>
        <title>File Upload Form</title>
      </head>
      <body>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <label for="file">Select a file:</label>
          <input type="file" name="file" id="file"><br>
          <input type="submit" value="Upload">
        </form>
      </body>
    </html>
  `;

  res.status(200).type('text/html').send(formHtml);
});

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const file = files.file;
      const uploadPath = path.join(__dirname, 'public', String(file[0].originalFilename));

      mv(String(file[0].filepath), uploadPath, (err) => {
        if (err) {
          console.error('Error when moving a file:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send(`The file is uploaded along the path: ${uploadPath}`);
        }
      });
    }
  });
});

app.post('/json', (req, res) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  }).on('end', () => {
    console.log('Received data:', body);
    try {
      const requestData = JSON.parse(body);

      const response = {
        __comment: 'Ответ.Лабораторная работа 8/10',
        x_plus_y: requestData.x && requestData.y ? requestData.x + requestData.y : null,
        Concatination_s_o: `Сообщение: ${requestData.s}, ${
          requestData.o ? requestData.o.surname || 'N/A' : 'N/A'
        }, ${requestData.o ? requestData.o.name || 'N/A' : 'N/A'}`,
        Length_m: requestData.m ? requestData.m.length : 0,
      };

      console.log('Response:', response);

      res.status(200).json(response);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(400).send('Invalid JSON data');
    }
  });
});

app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    res.status(400).send('Invalid parameter: id must be a number');
  } else {
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Internal Server Error');
      } else {
        const users = JSON.parse(data);
        const user = users.find((user) => user.id === userId);

        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send(`User with id ${userId} not found`);
        }
      }
    });
  }
});

app.get('/headers', (req, res) => {
  const headers = JSON.stringify(req.headers);
  res.status(200).json(headers);
});

app.use('/connection', (req, res) => {
  if (req.query.set) {
    const setParam = parseInt(req.query.set, 10);
    if (!isNaN(setParam)) {
      keepAliveTimeout = setParam;
      res.status(200).send(`keepAliveTimeout set to ${keepAliveTimeout}`);
      return;
    }
  }

  res.status(200).send(`keepAliveTimeout: ${keepAliveTimeout}`);
});

app.post('/formparameter', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }

    const textValue = fields.text !== '' ? fields.text : 'Not provided';
    const numberValue = fields.number !== '' ? fields.number : 'Not provided';
    const checkboxValue = fields.checkbox ? 'Checked' : 'Unchecked';
    const radiobuttonValue = fields.radiobutton ? fields.radiobutton : 'Not provided';
    const textareaValue = fields.textarea !== '' ? fields.textarea : 'Not provided';

    const responseHtml = `
      <html>
        <head>
          <title>Form Parameter Result</title>
        </head>
        <body>
          <h1>Form Parameter Values</h1>
          <p>Text: ${textValue}</p>
          <p>Number: ${numberValue}</p>
          <p>Checkbox: ${checkboxValue}</p>
          <p>Radio Button: ${radiobuttonValue}</p>
          <p>Textarea: ${textareaValue}</p>
        </body>
      </html>
    `;

    res.status(200).type('text/html').send(responseHtml);
  });
});

app.get('/formparameter', (req, res) => {
  fs.readFile('public/form.html', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).type('text/html').send(data);
    }
  });
});

app.use((req, res) => {
  res.status(404).send('404. Invalid URL. Try another.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
