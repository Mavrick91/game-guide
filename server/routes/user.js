const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');
const { getLocation } = require('../controllers/locationController');
const User = require('../models/User');

const router = express.Router();

router.get('/isAuthenticated', isAuthenticated);

router.use(verifyJwtMiddleware);

router.get('/me', getProfile);
router.get('/location', getLocation);

router.post('/logout', logout);

function isAuthenticated(req, res) {
  const token = req.cookies.jwt;
  res.status(200).json(!!token);
}

async function getProfile(req, res) {
  const user = await User.findOne({ steamid: req.user.steamid });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
}

function logout(req, res) {
  res.clearCookie('jwt');
  res.status(200).json();
}

module.exports = router;
