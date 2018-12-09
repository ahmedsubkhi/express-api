var jwt = require('jsonwebtoken');
var path = require('path');

// declare root path place
var root_dir = process.cwd();

var keys = require(path.join(root_dir, 'infrastructure/config/keys'));


function verify_token(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, keys.jwt_verify_key, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    res.locals = decoded;
    next();
  });
}

module.exports = verify_token;
