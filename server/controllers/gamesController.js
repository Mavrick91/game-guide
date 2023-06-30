const axios = require('axios');
const { convertMinutesToTime } = require('../utils/format');
const { STEAM_API_URL, STEAM_MEDIA_URL } = require('../config/apiUrls');

const STEAM_API_KEY = process.env.STEAM_API_KEY;

async function fetchGameData(endpoint, steamid) {
  try {
    const params = {
      steamid,
      include_appinfo: true,
      include_played_free_games: true,
      key: STEAM_API_KEY,
      format: 'json',
    };

    const response = await axios.get(
      `${STEAM_API_URL}/IPlayerService/${endpoint}`,
      { params }
    );
    return response.data.response.games?.map(formatGameData) || [];
  } catch (error) {
    throw new Error(error);
  }
}

function formatGameData(game) {
  return {
    appid: game.appid,
    name: game.name,
    playtimeForever: convertMinutesToTime(game.playtime_forever),
    logoUrl: `${STEAM_MEDIA_URL}/${game.appid}/${game.img_icon_url}.jpg`,
  };
}

async function getGames(req, res, next) {
  try {
    const { steamid } = req.user;
    const [ownedGames, playedRecently] = await Promise.all([
      fetchGameData('GetOwnedGames/v0001/', steamid),
      fetchGameData('GetRecentlyPlayedGames/v0001/', steamid),
    ]);

    res.status(200).json({ ownedGames, playedRecently });
  } catch (error) {
    next(error);
  }
}

async function getGamesForUser(steamid) {
  try {
    const [ownedGames, playedRecently] = await Promise.all([
      fetchGameData('GetOwnedGames/v0001/', steamid),
      fetchGameData('GetRecentlyPlayedGames/v0001/', steamid),
    ]);

    return { ownedGames, playedRecently };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getGames,
  getGamesForUser,
};
