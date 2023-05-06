const http = require("http");

//?create server
// const serverVariable = http.createServer((request, response) => {

//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello World!\n");
// });

// serverVariable.listen(3000, () => {
//   console.log("server UP n RUNNING");
// });

//?create server listn req
const requestListner = (request, response) => {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("<h1>Welcome HOME PG!!</h1>\n");
  } else if ((request.url === "/about")) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to ABOUT PG!\n");
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 NOT FOUMD!\n");
  }
};

const server = http.createServer(requestListner);
server.listen(3000, () => {
  console.log("server UP n RUNNING");
});
