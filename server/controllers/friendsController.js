const axios = require('axios');
const { STEAM_API_URL } = require('../config/apiUrls');
const { getGamesForUser } = require('./gamesController');

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

    const friendsPromises = data.friendslist.friends.map((friend) =>
      axios.get(`${STEAM_API_URL}/ISteamUser/GetPlayerSummaries/v0002/`, {
        params: {
          steamids: friend.steamid,
          key: process.env.STEAM_API_KEY,
          format: 'json',
        },
      })
    );

    const friendsResponses = await Promise.all(friendsPromises);
    const friendsWithGames = friendsResponses.map(
      async (friendResponse, index) => {
        const friendSteamId = friendResponse.data.response.players[0].steamid;
        const games = await getGamesForUser(friendSteamId);

        return {
          ...friendResponse.data.response.players[0],
          friend_since: data.friendslist.friends[index].friend_since,
          games,
        };
      }
    );

    const friends = await Promise.all(friendsWithGames);

    res.status(200).json(friends);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFriends,
};
