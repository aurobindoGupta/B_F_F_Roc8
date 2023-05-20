const express = require("express");
const axios = require("axios");
const gitActivityRouter = express.Router();

const fetchGithubActivity = async (username) => {
  const url = `https://api.github.com/users/${username}/events/public`;

  const response = await axios.get(url);

  return response.data;
};

gitActivityRouter.get("/", async (req, res) => {
  const gitActivity = await fetchGithubActivity("aurobindoGupta");
  res.render("github", {
    title: "Auro",
    activities: gitActivity,
  });
});

module.exports = { gitActivityRouter };
