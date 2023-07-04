const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');
const { getGameDetails } = require('../controllers/gameDetailsController');
const { getGames } = require('../controllers/gamesController');
const { getAllGames } = require('../controllers/allGamesController');

const router = express.Router();

router.use(verifyJwtMiddleware);

router.get('/', getGames);
router.get('/all-games', getAllGames);
router.get('/:gameId', getGameDetails);

module.exports = router;
