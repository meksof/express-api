const jwt = require('jsonwebtoken');
const config = require('../config/env');

// Generate an Access Token for the given User ID
function generateAccessToken(userId) {
    const expiresIn = '1 hour';
    const audience = config.jwt.audience;
    const issuer = config.jwt.issuer;
    const secret = config.jwt.secretOrKey;

    const token = jwt.sign({}, secret, {
        expiresIn: expiresIn,
        audience: audience,
        issuer: issuer,
        subject: userId.toString()
    });

    return token;
}

module.exports = {
    generateAccessToken: generateAccessToken
}
