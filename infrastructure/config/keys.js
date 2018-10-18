require('dotenv').load();

var keys = {
  jwt_verify_key: process.env.JWT_VERIFY_KEY
}

module.exports = keys
