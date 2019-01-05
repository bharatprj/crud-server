var jwt = require('jsonwebtoken');

// verifyig token for authentication
var verifyToken = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthorized request');
    }
    let token =  req.headers.authorization.split(' ')[1];
    token = token === "null"?null:token;
    if (token === null) {
        return res.status(401).send('unauthorized token');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('unathorized request');
    }
    req.userId = payload.subject;
    next();
}

module.exports = verifyToken;