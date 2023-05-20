const express = require("express");
const { Client } = require("@notionhq/client");
require("dotenv").config();


const booksRouter = express.Router();

const bookNotion = new Client({ auth: process.env.NOTION_DB_BOOKS_SECRET });


const fetchBooksdb = async () => {
  const response = await bookNotion.databases.query({
    database_id: process.env.NOTION_DB_BOOKS_ID,
  });
  return response;
};

booksRouter.get("/", async (req, res) => {
  const booksRes = await fetchBooksdb();

  res.render("books", {
    title: "Books",
    activities: booksRes.results,
  });
});

module.exports = { booksRouter };
