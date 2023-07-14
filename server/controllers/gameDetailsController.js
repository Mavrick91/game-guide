const axios = require('axios');
const { STEAM_API_URL } = require('../config/apiUrls');

async function getGameDetails(req, res, next) {
  const {
    params: { gameId },
  } = req;

  try {
    const params = {
      format: 'json',
      appid: gameId,
    };

    const { data } = await axios.get(
      `${STEAM_API_URL}/ISteamNews/GetNewsForApp/v2/`,
      { params }
    );

    res.status(200).send(data.appnews);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGameDetails,
};
