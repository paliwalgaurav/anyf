const
    express = require('express'),
    router = express.Router(),
    got = require('got');

const ACCESS_KEY = '0bb504f88a145ce4b6b216a7ae12541f';

router.get('/:baseCurrency', async (req, res, next) => {
    if (req.params.baseCurrency) {
        const response = await got(`http://data.fixer.io/api/latest?access_key=${ACCESS_KEY}&symbols=SEK,${req.params.baseCurrency}`, {
            headers: {
                json: true
            },
        }).catch(err => console.error(err));

        res.json(JSON.parse(response.body));
    }
  });

module.exports = router;
