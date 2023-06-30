const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');
const axios = require('axios');
const { convertMinutesToTime } = require('../utils/format');

const STEAM_API_URL = 'http://api.steampowered.com';
const STEAM_MEDIA_URL =
  'http://media.steampowered.com/steamcommunity/public/images/apps';
const GEONAMES_API_URL = 'http://api.geonames.org/searchJSON';

const router = express.Router();

router.get('/isAuthenticated', isAuthenticated);
router.use(verifyJwtMiddleware);
router.get('/me', getProfile);
router.post('/logout', logout);
router.get('/location', getLocation);
router.get('/games', getGames);
router.get('/friends', getFriends);

function isAuthenticated(req, res) {
  const token = req.cookies.jwt;
  return res.status(200).json(!!token);
}

function getProfile(req, res) {
  res.status(200).json(req.user);
}

function logout(req, res) {
  res.clearCookie('jwt');
  res.sendStatus(200);
}

async function getLocation(req, res, next) {
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
}

async function getGames(req, res, next) {
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
      axios.get(`${STEAM_API_URL}/IPlayerService/GetOwnedGames/v0001/`, {
        params,
      }),
      axios.get(
        `${STEAM_API_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/`,
        { params }
      ),
    ]);

    const ownedGames =
      gamesOwned.data.response.games?.map(formatGameData) || [];
    const playedRecently =
      recentlyPlayed.data.response.games?.map(formatGameData) || [];

    res.status(200).json({ ownedGames, playedRecently });
  } catch (error) {
    next(error);
  }
}

async function getFriends(req, res, next) {
  try {
    const { steamid } = req.user;
    const params = {
      steamid,
      key: process.env.STEAM_API_KEY,
      relationship: 'all',
      format: 'json',
    };

    const { data } = await axios.get(
      `${STEAM_API_URL}/ISteamUser/GetFriendList/v0001/`,
      { params }
    );

    const friendsPromise = data.friendslist.friends.map((friend) => {
      return axios.get(
        `${STEAM_API_URL}/ISteamUser/GetPlayerSummaries/v0002/`,
        {
          params: {
            steamids: friend.steamid,
            key: process.env.STEAM_API_KEY,
            format: 'json',
          },
        }
      );
    });

    const friendsResponse = await Promise.all(friendsPromise);
    const friends = friendsResponse.map((friend, index) => ({
      ...friend.data.response.players[0],
      friend_since: data.friendslist.friends[index].friend_since,
    }));

    res.status(200).json({ friends });
  } catch (error) {
    next(error);
  }
}

function formatGameData(game) {
  return {
    appid: game.appid,
    name: game.name,
    playtime_forever: convertMinutesToTime(game.playtime_forever),
    img_logo_url: `${STEAM_MEDIA_URL}/${game.appid}/${game.img_icon_url}.jpg`,
  };
}

module.exports = router;
