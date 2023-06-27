const authRoutes = require('./auth');
const userRoutes = require('./user');

module.exports = {
  auth: authRoutes,
  user: userRoutes
};
