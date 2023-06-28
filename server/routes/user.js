const express = require('express');
const verifyJwtMiddleware = require('../middleware/verifyJwt');
const axios = require('axios');

const router = express.Router();

router.get('/isAuthenticate', (req, res) => {
  const token = req.cookies.jwt;

  return res.status(200).json(!!token);
});

router.use(verifyJwtMiddleware);

router.get('/me', (req, res) => {
  res.status(200).json(req.user);
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.status(200).send();
});

router.get('/location', async (req, res) => {
  try {
    const BASE_URL = 'http://api.geonames.org';
    const USERNAME = process.env.GEONAMES_USERNAME;

    const { loccountrycode, locstatecode, loccityid } = req.user;

    const [steamResponse, geonamesResponse] = await Promise.all([
      axios.get(
        `https://steamcommunity.com/actions/QueryLocations/${loccountrycode}/${locstatecode}/`
      ),
      axios.get(`${BASE_URL}/searchJSON`, {
        params: {
          country: loccountrycode,
          adminCode1: locstatecode,
          maxRows: 1,
          username: USERNAME,
        },
      }),
    ]);

    const location = steamResponse.data.find(
      (item) => item.cityid === loccityid
    );

    const [{ countryCode: country, countryName, name: region }] =
      geonamesResponse.data.geonames;

    res.status(200).json({
      country,
      countryName,
      region,
      city: location ? location.cityname : 'City not found',
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching location data.' });
  }
});

module.exports = router;
