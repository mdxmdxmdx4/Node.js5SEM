const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const filePath = 'MyFile.png';
const uploadUrl = 'http://localhost:3000/upload';

const form = new FormData();
form.append('file', fs.createReadStream(filePath));

axios.post(uploadUrl, form, {
  headers: {
    ...form.getHeaders()
  }
})
  .then(response => {
    console.log('Server response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
