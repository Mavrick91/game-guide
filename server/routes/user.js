const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');

const router = express.Router();

router.use(verifyJwtMiddleware);

router.get('/me', (req, res) => {
  res.status(200).json(req.user);
});

router.get('/logout', (req, res) => {
  const ress = res.clearCookie('jwt');
  console.log("🚀 ~ ress", ress)
  res.status(200).send();
});

module.exports = router;
