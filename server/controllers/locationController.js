const axios = require('axios');
const { GEONAMES_API_URL } = require('../config/apiUrls');

async function getLocation(req, res, next) {
  try {
    const { loccountrycode, locstatecode, loccityid } = req.user;

    const [steamResponse, geonamesResponse] = await Promise.all([
      axios.get(
        `https://steamcommunity.com/actions/QueryLocations/${loccountrycode}/${locstatecode}/`
      ),
      axios.get(GEONAMES_API_URL, {
        params: {
          country: loccountrycode,
          adminCode1: locstatecode,
          maxRows: 1,
          username: process.env.GEONAMES_USERNAME,
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
    next(error);
  }
}

module.exports = {
  getLocation,
};
