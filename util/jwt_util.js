const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load info ENV
dotenv.config();

const encodeTokenJwt = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '12h'});
};

module.exports = { encodeTokenJwt };