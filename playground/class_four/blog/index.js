const express = require("express");
const bodyParser = require("body-parser");
const { postsRouter } = require("./router/postsRouter");
const comments = require("./data/comments.json");

const app = express();

app.use(bodyParser.json());

app.use("/posts", postsRouter);

app.get("comments", (req, res) => {
  res.json(comments);
});

app.get("/comments/findByEmail/:email", (req, res) => {
  const commentList = comments.filter(
    (each) => each.email === req.params.email
  );
  res.json(commentList);
});

app.listen(3000, () => {
  console.log("Server Started");
});
