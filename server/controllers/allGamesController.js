const axios = require('axios');
const { STEAM_API_URL } = require('../config/apiUrls');

async function getAllGames(req, res, next) {
  try {
    const params = {
      format: 'json',
    };

    const { data } = await axios.get(
      `${STEAM_API_URL}/ISteamApps/GetAppList/v2`,
      {
        params,
      }
    );

    const filteredGame = data.applist.apps.filter((game) => game.name);

    res.send(filteredGame).status(200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllGames,
};
