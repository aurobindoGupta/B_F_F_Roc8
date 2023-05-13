const express = require("express");

const app = express();

const MyMidddleware = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

const crashHAndler = (err, req, res, next) => {
  if (err) {
    console.err(err.stack);
  }
  res.send("Internal Server Error");
};

app
  .use(express.static("public"))
  .get("/", (req, res) => {
    throw Error("cant visit");
    res.send("Home");
  })
  .get("/about", MyMidddleware, (req, res) => {
    res.send("About");
  })
  .use(crashHAndler)
  .listen(3000, () => {
    console.log("server started");
  });
