const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function authToken(request, response, next) {
    console.log(request.headers);
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return response.status(401).json({error: "Unauthorized access"});

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        if (decoded == null) {
            response.status(401).json({error: "Unautorized access"});
        };

        next();
    } catch(err) {
        response.status(401).json({error: "Unauthorized access"});
        throw err;
        return;
    };
    
}

module.exports = authToken;