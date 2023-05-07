// const http = require("http");

//?create server
// const serverVariable = http.createServer((request, response) => {

//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello World!\n");
// });

// serverVariable.listen(3000, () => {
//   console.log("server UP n RUNNING");
// });

//?create server listn req
// const requestListner = (request, response) => {
//   if (request.url === "/") {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.end("<h1>Welcome HOME PG!!</h1>\n");
//   } else if ((request.url === "/about")) {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Welcome to ABOUT PG!\n");
//   } else {
//     response.writeHead(404, { "Content-Type": "text/plain" });
//     response.end("404 NOT FOUMD!\n");
//   }
// };

// const server = http.createServer(requestListner);
// server.listen(3000, () => {
//   console.log("server UP n RUNNING");
// });

//?listining to query params and responding accoringly.

const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);

  // Get the pathname from the parsed URL
  const pathname = parsedUrl.pathname;

  // Get the Query params
  const queryParams = parsedUrl.query;
 console.log(queryParams);
  // Determine the response based on the pathname
  let responseText = "";

  switch (pathname) {
    case "/":
      if (queryParams.search)
        responseText =
          "Welcome to the homepage! You searched for: " + queryParams.search;
      else responseText = "No search was made";
      break;
    case "/about":
      responseText = "This is the about page.";
      break;
    default:
      responseText = "Page not found.";
      break;
  }

  // Set the content type and send the response
  res.setHeader("Content-Type", "text/plain");
  res.end(responseText);
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
