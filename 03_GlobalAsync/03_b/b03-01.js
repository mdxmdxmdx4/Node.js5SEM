const http = require("http");

function firstJob() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello World");
    }, 2000);
  });
}

async function handleRequestWithAsyncAwait(req, res) {
  if (req.url === "/") {
    try {
      const result = await firstJob();

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(result);
      res.end();
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write(error.message);
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
  }
}

function handleRequestWithPromise(req, res) {
  if (req.url === "/") {
    const result = firstJob();

    result
      .then((data) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(data);
        res.end();
      })
      .catch((error) => {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write(error.message);
        res.end();
      });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
  }
}

const server1 = http.createServer(handleRequestWithPromise);
server1.listen(3000, () => {
  console.log("Сервер  запущен на порту 3000");
});



const server2 = http.createServer(handleRequestWithAsyncAwait);
server2.listen(3001, () => {
  console.log("Сервер 2 запущен на порту 3001");
});
