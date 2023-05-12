const http = require("http");

//*expensive operation
//* non-Blocking
function sleep(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
}

//*blocking Operation
//? this code is sycronous because of the while loop.
// const startTime = Date.now();
// while (Date.now() - startTime < 5000) {}

const server = http.createServer(async (req, res) => {
  if (req.url === "/blocking") {
    //?simulating blocking operation
    const startTime = Date.now();
    while (Date.now() - startTime < 5000) {
      //?do nothing just block the code execution by 5 secs
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("this is a blocking request.\n");
  } else if (req.url === "/non-blocking") {
    //? simulting a non-blocking operation
    await sleep(5000);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is a non-Blocking request.\n");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found.\n");
  }
});
server.listen(3000, () => {
  console.log("Server running");
});
