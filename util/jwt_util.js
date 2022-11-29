const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load info ENV
dotenv.config();

const encodeTokenJwt = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '12h'});
};

const checkTokenJwt = async (token) => {
    return await jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = { encodeTokenJwt, checkTokenJwt };