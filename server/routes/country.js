const
    express = require('express'),
    router = express.Router()
    got = require('got'),
    getAuthenticate = require('./authentication');

const COUNTRY_API_END = 'https://restcountries.eu/rest/v2/all';

router.get('/', getAuthenticate, async (req, res, next) => {
    const response = await got(`${COUNTRY_API_END}`, {
      headers: {
        json: true
      },
    }).catch(err => {console.error(err)});

    res.json(JSON.parse(response.body));
  });

module.exports = router;
