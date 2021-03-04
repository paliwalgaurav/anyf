const
    express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken')
    dotenv = require('dotenv');

router.post('/', function(req, res, next) {
    dotenv.config(); // to read .env file
    const newToken = generateAuthenticationToken(req.body.user);
    res.json(newToken);
});

/**
 * get authentication headers
 * and verify token
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const getAuthenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    })
}

/**
 * creates new token for new user
 * @param user
 * @returns {*}
 */
const generateAuthenticationToken = (user) => {
    return (
        jwt.sign(
            {user},
            process.env.TOKEN,
            {
                expiresIn: '12h'
            })
    );
}

module.exports = [router, getAuthenticateToken];
