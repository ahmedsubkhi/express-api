var path = require('path');
var root_dir = process.cwd();
var db = require(path.join(root_dir, 'infrastructure/config/database'));


const auto_increment = db.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, { versionKey: false });

AutoIncrement = db.model('auto_increment', auto_increment);

module.exports = AutoIncrement;
