var path = require('path');
var root_dir = process.cwd();
var db = require(path.join(root_dir, 'infrastructure/config/database'));

require(path.join(root_dir, 'domain/models/groups'));

var schemaOptions = {
  toObject: {
    virtuals: true // activate alias fields
  },
  toJSON: {
    virtuals: true // activate alias fields
  },
  versionKey: false // disable versionKey that default created by Mongoose
};

const users = db.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: String,
  id_group: { type: db.Schema.Types.ObjectId, ref: 'groups' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, schemaOptions);

users.virtual('group').get(function () { // created new alias 'group' fields in 'user' schema
  return this.id_group;
});

Users = db.model('users', users);

module.exports = Users;
