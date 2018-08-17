var path = require('path');
var root_dir = process.cwd();
var Posts = require(path.join(root_dir, 'domain/models/posts'));
var { Users } = require(path.join(root_dir, 'domain/models/users'));

var repo = module.exports = {

  get_all: function(req, res) {
    return new Promise(function(resolve, reject) {
      Posts.find(function (err, data) {
        var posts = data;
        var data_post = [];

        if (err) {
          reject(err);
        } else {
          Users.find(function (err, d_user) {
            posts.map(function(p, i){ // Looping posts data
              p = p.toObject(); // Convert p from string to Object
              var usr_index = d_user.findIndex(u => u._id == p.id_user); // Find index of 'users' Collections  depending by id_user that wrote to 'posts' Collections
              p.user = d_user[usr_index]; // push data user gotten to 'p' variable
              data_post[i] = p; // push all variable 'p' saved to 'data_post'
            });
            if (err) {
              reject(err);
            } else {
              resolve(data_post);
            }
          });
        }
      });
    });
  },

  get_one: function(id) {
    return new Promise(function(resolve, reject) {
      Posts.findOne({ "id_post":id }, function (err, data) {
        if (err) {
          reject(err);
        } else {
          Users.findById(data.id_user, function (err, d_user) {
            var data_post = data.toObject(); // Convert 'data' from string to Object
            data_post.user = d_user;
            if (err) {
              reject(err);
            } else {
              console.log(data_post);
              resolve(data_post);
            }
          });
        }
      });
    });
  },

  create: function(req, res) {
    var data = new Posts({
      title: req.body.title,
      body: req.body.body,
      id_user: res.locals.id_user,
      created_at: new Date,
      updated_at: new Date
    });

    return new Promise(function(resolve, reject) {
      data.save(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  update: function(req, res, id) {
    return new Promise(function(resolve, reject) {
      Posts.findById(id, function(err, data){

        var datas = {
          title: req.body.title,
          body: req.body.body,
          id_user: res.locals.id_user,
          updated_at: new Date
        };
        data.set(datas);

        data.update(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });

      });
    });
  },

  delete: function(id) {
    var data = Posts.findById(id);
    return new Promise(function(resolve, reject) {
      data.remove(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

}
