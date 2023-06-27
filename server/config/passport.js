const passport = require('passport');
const { steamStrategy } = require('../auth/passport');

passport.use(steamStrategy);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
