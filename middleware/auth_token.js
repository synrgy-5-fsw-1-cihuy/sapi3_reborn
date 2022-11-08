function authToken(request, response, next) {
    console.log(request.headers);
    if(request.headers["authorization"] != null) {
        // Check token
        next();
        return;
    }

    response.status(401).json({error: "Unauthorized access"});
}

module.exports = authToken;