var path = require('path');
var root_dir = process.cwd();

var db = require(path.join(root_dir, 'infrastructure/config/database'));

require(path.join(root_dir, 'domain/models/users'));

var AutoIncrement = require(path.join(root_dir, 'domain/models/auto_increment'));

var schemaOptions = {
  toObject: {
    virtuals: true // activate alias fields
  },
  toJSON: {
    virtuals: true // activate alias fields
  },
  versionKey: false // disable versionKey that default created by Mongoose
};

var comment = db.Schema({
  id_user: { type: db.Schema.Types.ObjectId, ref: 'users' },
  body: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  published: Boolean,
  deleted: Boolean
}, schemaOptions);

comment.virtual('user').get(function () { // created new alias 'user' fields in 'comment' schema
  return this.id_user;
});


var posts = db.Schema({
  id_post: Number,
  title: { type: String, required: true },
  body: { type: String, required: true },
  id_user: { type: db.Schema.Types.ObjectId, required: true, ref: 'users' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  published: Boolean,
  deleted: Boolean,
  comments: [comment],
}, schemaOptions);

posts.virtual('user').get(function () { // created new alias 'user' fields in 'comment' schema
  return this.id_user;
});

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
