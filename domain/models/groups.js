var path = require('path');
var root_dir = process.cwd();

var db = require(path.join(root_dir, 'infrastructure/config/database'));

var schemaOptions = {
  versionKey: false // disable versionKey that default created by Mongoose
};

var groups = db.Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, schemaOptions);


Groups = db.model('groups', groups);


module.exports = Groups;
