const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');
const axios = require('axios');
const { convertMinutesToTime } = require('../utils/format');

const STEAM_API_URL = 'http://api.steampowered.com/IPlayerService';
const STEAM_MEDIA_URL =
  'http://media.steampowered.com/steamcommunity/public/images/apps';
const GEONAMES_API_URL = 'http://api.geonames.org/searchJSON';

const router = express.Router();

router.get('/isAuthenticated', (req, res) => {
  const token = req.cookies.jwt;
  return res.status(200).json(!!token);
});

router.use(verifyJwtMiddleware);

router.get('/me', (req, res) => {
  res.status(200).json(req.user);
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.sendStatus(200);
});

router.get('/location', async (req, res, next) => {
  try {
    const { loccountrycode, locstatecode, loccityid } = req.user;

    const [steamResponse, geonamesResponse] = await Promise.all([
      axios.get(
        `https://steamcommunity.com/actions/QueryLocations/${loccountrycode}/${locstatecode}/`
      ),
      axios.get(GEONAMES_API_URL, {
        params: {
          country: loccountrycode,
          adminCode1: locstatecode,
          maxRows: 1,
          username: process.env.GEONAMES_USERNAME,
        },
      }),
    ]);

    const location = steamResponse.data.find(
      (item) => item.cityid === loccityid
    );
    const [{ countryCode: country, countryName, name: region }] =
      geonamesResponse.data.geonames;

    res.status(200).json({
      country,
      countryName,
      region,
      city: location ? location.cityname : 'City not found',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/games', async (req, res, next) => {
  try {
    const { steamid } = req.user;
    const params = {
      steamid,
      include_appinfo: true,
      include_played_free_games: true,
      key: process.env.STEAM_API_KEY,
      format: 'json',
    };

    const [gamesOwned, recentlyPlayed] = await Promise.all([
      axios.get(`${STEAM_API_URL}/GetOwnedGames/v0001/`, { params }),
      axios.get(`${STEAM_API_URL}/GetRecentlyPlayedGames/v0001/`, { params }),
    ]);

    const ownedGames =
      gamesOwned.data.response.games?.map(formatGameData) || [];
    const playedRecently =
      recentlyPlayed.data.response.games?.map(formatGameData) || [];

    res.status(200).json({ ownedGames, playedRecently });
  } catch (error) {
    next(error);
  }
});

function formatGameData(game) {
  return {
    appid: game.appid,
    name: game.name,
    playtime_forever: convertMinutesToTime(game.playtime_forever),
    img_logo_url: `${STEAM_MEDIA_URL}/${game.appid}/${game.img_icon_url}.jpg`,
  };
}

module.exports = router;
