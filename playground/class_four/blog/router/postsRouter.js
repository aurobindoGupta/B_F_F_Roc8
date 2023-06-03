const express = require("express");
const fs = require("fs");
const path = require("path");
const { posts } = require("../data/postsData");


const postsRouter = express.Router();


postsRouter.get("/", (req, res) => {
  res.json(posts);
});

postsRouter.post("/", (req, res) => {
  const { userId, title, body } = req.body;
  if (!userId || !title || !body) {
    res.status(400).send("Missing Required Fields");
  } else {
    const newPost = {
      userId,
      title,
      body,
      id: posts.length + 1,
    };
    posts.push(newPost);

    fs.writeFileSync(
      path.resolve(__dirname, "../data/posts.json"),
      JSON.stringify(posts)
    );
    res.json(newPost);
  }
});

postsRouter.get("/:id", (req, res) => {
  const post = posts.find((each) => each.id === parseInt(req.params.id));
  if (post) res.json(post);
  else res.status(404).send("Post Not Found");
});

postsRouter.get("/:id/comments", (req, res) => {
  const commentList = comments.filter(
    (item) => item.postId === parseInt(req.params.id)
  );
  res.json(commentList);
});

module.exports = { postsRouter };
