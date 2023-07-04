const axios = require('axios');
const { STEAM_API_URL } = require('../config/apiUrls');

async function getFriends(req, res, next) {
  try {
    const { steamid } = req.user;
    const params = {
      steamid,
      key: process.env.STEAM_API_KEY,
      relationship: 'all',
      format: 'json',
    };

    const {
      data: { friendslist },
    } = await axios.get(`${STEAM_API_URL}/ISteamUser/GetFriendList/v0001/`, {
      params,
    });

    const friendsPromises = friendslist.friends.map((friend) =>
      axios.get(`${STEAM_API_URL}/ISteamUser/GetPlayerSummaries/v2/`, {
        params: {
          steamids: friend.steamid,
          key: process.env.STEAM_API_KEY,
          format: 'json',
        },
      })
    );

    const friends = await Promise.all(friendsPromises);

    const formattedFriends = friends
      .map((friend) => friend.data.response)
      .map((friend) => friend.players[0]);

    res.status(200).json(formattedFriends);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFriends,
};
