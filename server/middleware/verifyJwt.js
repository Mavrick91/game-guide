const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
