const express = require("express");
const { Client } = require("@notionhq/client");
require("dotenv").config();

const animeRouter = express.Router();

const animeNotion = new Client({ auth: process.env.NOTION_DB_ANIME_SECRET });

const fetchAnimedb = async () => {
  const response = await animeNotion.databases.query({
    database_id: process.env.NOTION_DB_ANIME_ID,
  });
  return response;
};

animeRouter.get("/", async (req, res) => {
  const animeRes = await fetchAnimedb();

  res.render("anime", {
    title: "Anime",
    activities: animeRes.results,
  });
});

module.exports = { animeRouter };
