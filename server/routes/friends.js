const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');
const { getFriends } = require('../controllers/friendsController');

const router = express.Router();

router.use(verifyJwtMiddleware);

router.get('/', getFriends);

module.exports = router;
