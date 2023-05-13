const express = require("express");
const bodyParser = require("body-parser");
const urlsData = require("./urls.json");
const shortid = require("shortid");
const fs = require("fs");

const app = express();

app
  .use(bodyParser.json())
  .get("/:shortUrl", (req, res) => {
    const { shortUrl } = req.params;

    const foundUrl = urlsData.find((item) => item.short_url === shortUrl);

    if (foundUrl) {
      res.redirect(foundUrl.original_url);
    } else {
      res.send({ error: "URL not found" });
    }
  })
  .post("/shorten", (req, res) => {
    const { url: originalUrl } = req.body;

    const foundUrl = urlsData.find((item) => item.original_url === originalUrl);

    if (foundUrl) {
      res.send(foundUrl);
    } else {
      const shortUrl = shortid.generate();

      const newUrl = {
        original_url: originalUrl,
        short_url: shortUrl,
      };
      urlsData.push(newUrl);

      fs.writeFileSync("./urls.json", JSON.stringify(urlsData));

      res.send(newUrl);
    }
  })
  .listen(3000, () => {
    console.log("Server Started");
  });
