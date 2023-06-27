require("dotenv").config();

const express = require("express");
const passport = require("passport");
const cors = require("cors");
const { steamStrategy } = require("./auth/passport.js");
const { authRoutes } = require("./routes/auth.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const PORT = 4000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(passport.initialize());

passport.use(steamStrategy);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const verifyJwtMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

app.use("/auth", authRoutes);

app.get("/me", (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(200).send(null);
  }

  res.status(200).json(jwt.verify(token, process.env.JWT_SECRET));
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
