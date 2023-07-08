const Game = require('../models/Game');

async function getAllGames(req, res, next) {
  try {
    const result = await Game.find();

    res.send(result).status(200);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllGames,
};
