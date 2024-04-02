const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const formidable = require("formidable");
const mv = require("mv");

let keepAliveTimeout = 0;

const server = http.createServer(handleRequest);
server.keepAliveTimeout = keepAliveTimeout;

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  //TASK 4
  console.log(`Request - Method: ${req.method}, Path: ${req.url}, Date: ${(new Date()).toDateString()}, Time: ${(new Date()).toLocaleTimeString()}`);

  //TASK 8
  if (isStaticFileRequest(req)) {
    serveStaticFile(req, res);
    //TASK 9
  } else if (isFormUploadRequest(req)) {
    serveFormUploadForm(res);
  } else if (isFormUploadPostRequest(req)) {
    handleFormUpload(req, res);
    //TASK 7
  } else if (isJsonPostRequest(req)) {
    handleJsonPost(req, res);
    //TASK 3
  } else if (isUserGetRequest(req)) {
    serveUser(req, res);
    //TASK 2
  } else if (isHeadersGetRequest(req)) {
    serveHeaders(req, res);
    //TASK 1
  } else if (isConnectionSetRequest(req)) {
    handleConnectionSet(req, res);
    //TASK 6
  } else if (isFormParameterPostRequest(req)) {
    handleFormParameterPost(req, res);
  } else if (isFormParameterGetRequest(req)) {
    serveFormParameterForm(req, res);
    //TASK 5
  } else if (req.method !== 'GET' && req.method !== 'POST') {
    sendResponse(res, 405, "text/plain", "405. Method Not Allowed. Try another method.");
  }
    else {
    serveNotFound(res);
  }

  
}


//TASK 8
function isStaticFileRequest(req) {
  return req.url.startsWith("/public/") && req.method === "GET";
}

function serveStaticFile(req, res) {
  const filename = req.url.slice(8);
  const filePath = path.join(__dirname, "public", filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendResponse(res, 404, "text/plain", "File not found");
    } else {
      sendResponse(res, 200, "text/html", data);
    }
  });
}

//TASK 9
function isFormUploadRequest(req) {
  return req.url === "/upload" && req.method === "GET";
}

function serveFormUploadForm(res) {
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

  sendResponse(res, 200, "text/html", formHtml);
}

function isFormUploadPostRequest(req) {
  return req.url === "/upload" && req.method === "POST";
}

function handleFormUpload(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      sendResponse(res, 500, "text/plain", "Internal Server Error");
    } else {
      const file = files.file;
      const uploadPath = path.join(__dirname, "public", String(file[0].originalFilename));

      mv(String(file[0].filepath), uploadPath, (err) => {
        if (err) {
          console.error("Error when moving a file:", err);
          sendResponse(res, 500, "text/plain", "Internal Server Error");
        } else {
          sendResponse(res, 200, "text/plain", `The file is uploaded along the path: ${uploadPath}`);
        }
      });
    }
  });
}

//TASK 7
function isJsonPostRequest(req) {
  return req.url === "/json" && req.method === "POST";
}

function handleJsonPost(req, res) {
  let body = "";

  req.setEncoding("utf8");

  req.on("data", (chunk) => {
    body += chunk;
  }).on("end", () => {
    console.log("Received data:", body);
    try {
      const requestData = JSON.parse(body);

      const response = {
        __comment: "Ответ.Лабораторная работа 8/10",
        x_plus_y: requestData.x && requestData.y ? requestData.x + requestData.y : null,
        Concatination_s_o: `Сообщение: ${requestData.s}, ${
          requestData.o ? requestData.o.surname || "N/A" : "N/A"
        }, ${requestData.o ? requestData.o.name || "N/A" : "N/A"}`,
        Length_m: requestData.m ? requestData.m.length : 0,
      };

      console.log("Response:", response);

      sendResponse(res, 200, "application/json", JSON.stringify(response));
    } catch (error) {
      console.error("Error parsing JSON:", error);
      sendResponse(res, 400, "text/plain", "Invalid JSON data");
    }
  });
}

//TASK 3
function isUserGetRequest(req) {
  return req.url.startsWith("/user/") && req.method === "GET";
}

function serveUser(req, res) {
  const userId = parseInt(req.url.slice(6), 10);

  if (isNaN(userId)) {
    sendResponse(res, 400, "text/plain", "Invalid parameter: id must be a number");
  } else {
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        sendResponse(res, 500, "text/plain", "Internal Server Error");
      } else {
        const users = JSON.parse(data);
        const user = users.find((user) => user.id === userId);

        if (user) {
          sendResponse(res, 200, "application/json", JSON.stringify(user));
        } else {
          sendResponse(res, 404, "text/plain", `User with id ${userId} not found`);
        }
      }
    });
  }
}

//TASK 2
function isHeadersGetRequest(req) {
  return req.url === "/headers" && req.method === "GET";
}

function serveHeaders(req, res) {
res.setHeader('Content-Type', 'application/json');
  const headers = {
    request: req.headers,
    response: res.getHeaderNames(),
  };
  sendResponse(res, 200, 'application/json', JSON.stringify(headers));
}

//TASK 1
function isConnectionSetRequest(req) {
  return req.url.startsWith("/connection");
}

function handleConnectionSet(req, res) {
  if (req.url.includes("set")) {
    const queryParams = new url.URLSearchParams(req.url.split("?")[1]);
    const setParam = queryParams.get("set");
    if (setParam) {
      keepAliveTimeout = parseInt(setParam, 10);
      server.keepAliveTimeout = keepAliveTimeout;
      sendResponse(res, 200, "text/plain", `keepAliveTimeout set to ${keepAliveTimeout}`);
      return;
    }
  }

  sendResponse(res, 200, "text/plain", `keepAliveTimeout: ${keepAliveTimeout}`);
}

//TASK 6
function isFormParameterPostRequest(req) {
  return req.method === "POST" && req.url === "/formparameter";
}

function handleFormParameterPost(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields) => {
    if (err) {
      sendResponse(res, 500, "text/plain", "Internal Server Error");
      return;
    }

    const textValue = fields.text != '' || "Not provided";
    const numberValue = fields.number != '' || "Not provided";
    const checkboxValue = fields.checkbox ? "Checked" : "Unchecked";
    const radiobuttonValue = fields.radiobutton || "Not provided";
    const textareaValue = fields.textarea != '' || "Not provided";

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

    sendResponse(res, 200, "text/html", responseHtml);
  });
}

function isFormParameterGetRequest(req) {
  return req.method === "GET" && req.url === "/formparameter";
}

function serveFormParameterForm(req, res) {
  fs.readFile("public/form.html", (err, data) => {
    if (err) {
      sendResponse(res, 500, "text/plain", "Internal Server Error");
    } else {
      sendResponse(res, 200, "text/html", data);
    }
  });
}

//TASK 5
function serveNotFound(res) {
  sendResponse(res, 404, "text/plain", "404. Invalid URL. Try another.");
}

function sendResponse(res, statusCode, contentType, data) {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(data);
}


server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
