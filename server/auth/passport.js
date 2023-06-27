const { Strategy } = require("passport-steam");
const passport = require("passport");

const steamStrategy = new Strategy(
  {
    returnURL: "http://localhost:4000/auth/steam/redirect",
    realm: "http://localhost:4000/",
    apiKey: process.env.STEAM_API_KEY,
  },
  (identifier, profile, done) => {
    process.nextTick(() => {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
);

passport.use(steamStrategy);

module.exports = { steamStrategy };
