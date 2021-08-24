const JWT = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token from header
    const Token = req.header('x-auth-token');

    // Check if no token is present
    if (!Token) {
        return res.status(401).json({ msg: "There was no token present. Please try again." })
    }

    // Verify token
    try {
        const decoded = JWT.verify(Token, config.get('JWT_Token'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "You do not have permission to do this action." })
    }
}