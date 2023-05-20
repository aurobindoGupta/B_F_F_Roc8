const express = require("express");
const axios = require("axios");

const playlistRouter = express.Router();

const fetchSpotifyAccessToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const response = await axios.post(
    url,
    {
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

const fetchSpotifyPlaylistsData = async () => {
  const url = `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`;
  const access_token = await fetchSpotifyAccessToken();
  console.log("yo", access_token);
  const playlistData = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return playlistData;
};

const fetchPlaylistData = async (playlist_id) => {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
  const access_token = await fetchSpotifyAccessToken();
  const playlistData = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return playlistData;
};

playlistRouter.get("/", async (req, res) => {
  const spotifyData = await fetchSpotifyPlaylistsData();
  console.log("Playlist Displayed");
  res.render("playlist", {
    title: "Auro's playLists",
    activities: spotifyData.data.items,
  });
});

playlistRouter.get("/:playlistId", async (req, res) => {
  const { playlistId } = req.params;
  const playlistData = await fetchPlaylistData(playlistId);
  res.render("playlistData", {
    title: `Playlist: ${playlistData.data.name}`,
    activities: playlistData.data.tracks.items,
  });
});

module.exports = { playlistRouter };
