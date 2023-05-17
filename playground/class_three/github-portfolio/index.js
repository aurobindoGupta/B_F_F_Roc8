const express = require("express");
const axios = require("axios");
const { engine } = require("express-handlebars");

const fetchGithubActivity = async (username) => {
  const url = `https://api.github.com/users/${username}/events/public`;

  const response = await axios.get(url);

  return response.data;
};

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/:username", async (req, res) => {
  const { username } = req.params;
  const activity = await fetchGithubActivity(username);
  // res.setHeader("content-type", "text/html");
  // res.send(`
  // <h1>portfolio</h1>
  // <p>my github</p>
  // <pre>${JSON.stringify(activity)}</pre>
  // `);

  res.render("home", {
    title: `${username}'s portfolio`,
    activities: activity,
  });
});

app.listen(3000, () => {
  console.log("Server Started");
});
