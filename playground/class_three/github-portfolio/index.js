const express = require("express");
const axios = require("axios");

const fetchGithubActivity = async (username) => {
  const url = `https://api.github.com/users/${username}/events/public`;

  const response = await axios.get(url);

  return response.data;
};

const app = express();

app.get("/", async (req, res) => {
  const activity = await fetchGithubActivity("aurobindoGupta");
  res.send(activity);
});

app.listen(3000, () => {
  console.log("Server Started");
});
