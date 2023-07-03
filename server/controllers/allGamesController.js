const axios = require('axios');
const { STEAM_API_URL } = require('../config/apiUrls');

async function getAllGames(req, res, next) {
  try {
    const params = {
      format: 'json',
    };

    const response = await axios.get(
      `${STEAM_API_URL}/ISteamApps/GetAppList/v0002/`,
      {
        params,
        responseType: 'stream',
      }
    );
    response.data.pipe(res);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllGames,
};
