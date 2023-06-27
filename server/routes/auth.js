const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRoutes = express.Router();

authRoutes.get(
  "/steam",
  passport.authenticate("steam", { failureRedirect: "/", session: false })
);

authRoutes.get(
  "/steam/redirect",
  passport.authenticate("steam", { failureRedirect: "/", session: false }),
  (req, res) => {
    const user = req.user["_json"];
    const token = generateJwtToken(user);

    setJwtCookie(res, token);

    res.redirect("http://localhost:3000/");
  }
);

const generateJwtToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const setJwtCookie = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true, // Cookie cannot be accessed by client-side JavaScript
    // secure: true, // Enable this option if using HTTPS
    // SameSite: "strict", // Add this option for more strict cookie handling
  });
};

module.exports = { authRoutes };
