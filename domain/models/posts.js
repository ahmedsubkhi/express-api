var path = require('path');
var root_dir = process.cwd();

var db = require(path.join(root_dir, 'infrastructure/config/database'));

var AutoIncrement = require(path.join(root_dir, 'domain/models/auto_increment'));

var posts = db.Schema({
  id_post: Number,
  title: String,
  body: String,
  id_user: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  published: Boolean,
  deleted: Boolean
}, { versionKey: false });


posts.pre('save', function(next) {
  var self = this;
  AutoIncrement.findByIdAndUpdate({ _id: 'id_post' }, { $inc: { seq: 1 } }, { upsert: true , new: true }, function(err, data){
    if (err) {
      next(err);
    } else {
      self.id_post = data.seq;
      next();
    }
  });
});

Posts = db.model('posts', posts);


module.exports = Posts;
