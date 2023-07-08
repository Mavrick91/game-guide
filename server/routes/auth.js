const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.get(
  '/steam',
  passport.authenticate('steam', { failureRedirect: '/', session: false })
);

router.get(
  '/steam/redirect',
  passport.authenticate('steam', { failureRedirect: '/', session: false }),
  async (req, res) => {
    const user = req.user['_json'];
    const token = generateJwtToken(user);

    const userExist = await User.findOne({ steamid: user.steamid });
    if (!userExist) {
      await User.create(user);
    }

    setJwtCookie(res, token);

    res.redirect('http://localhost:3000/');
  }
);

const generateJwtToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const setJwtCookie = (res, token) => {
  res.cookie('jwt', token, {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    // secure: true, // Enable this option if using HTTPS
    // SameSite: "strict", // Add this option for more strict cookie handling
  });
};

module.exports = router;
