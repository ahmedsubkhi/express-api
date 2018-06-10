var path = require('path');
var root_dir = process.cwd();
var db = require(path.join(root_dir, 'infrastructure/config/database'));

const users = db.Schema({
  username: String,
  email: String,
  password: String
});

module.exports = { users, db };
