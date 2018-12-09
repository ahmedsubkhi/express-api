var path = require('path');
var request = require("request");

// declare root path place
var root_dir = process.cwd();

require('dotenv').load();


function verify_recaptcha(req, res, next) {
  var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
    recaptcha_url += "secret=" + process.env.GOOGLE_RECAPTCHA_SECRET_KEY + "&";
    recaptcha_url += "response=" + req.body["g-recaptcha-response"] + "&";
    recaptcha_url += "remoteip=" + req.connection.remoteAddress;

  request(recaptcha_url, function(error, resp, body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.status(403).send({ auth: false, message: 'Captcha validation failed' });
    }
    next();
  });
}

module.exports = verify_recaptcha;
