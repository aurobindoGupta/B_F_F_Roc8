const express = require("express");

const { engine } = require("express-handlebars");
const { playlistRouter } = require("./router/playlistRouter");
const { gitActivityRouter } = require("./router/gitActivityRouter");
const { booksRouter } = require("./router/booksRouter");
const { animeRouter } = require("./router/animeRouter");

require("dotenv").config();

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(
  express.static(__dirname, {
    extensions: ["webp"],
  })
);

app.use("/playlists", playlistRouter);
app.use("/github", gitActivityRouter);
app.use("/books", booksRouter);
app.use("/anime", animeRouter);

app.get("/", (req, res) => {
  res.render("home", {
    title: "Aurobindo Gupta",
  });
});

app.listen(3000, () => {
  console.log("Server Started");
});
