const authRoutes = require('./auth');
const userRoutes = require('./user');
const gamesRoutes = require('./games');
const friendsRoutes = require('./friends');

module.exports = {
  auth: authRoutes,
  user: userRoutes,
  games: gamesRoutes,
  friends: friendsRoutes,
};
