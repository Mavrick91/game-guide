const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');
const { getLocation } = require('../controllers/locationController');

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

function getProfile(req, res) {
  res.status(200).json(req.user);
}

function logout(req, res) {
  res.clearCookie('jwt');
  res.status(200).json();
}

module.exports = router;
