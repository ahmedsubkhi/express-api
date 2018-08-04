var path = require('path');
var root_dir = process.cwd();
var db = require(path.join(root_dir, 'infrastructure/config/database'));

const users = db.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

Users = db.model('users', users);

module.exports = { Users };
