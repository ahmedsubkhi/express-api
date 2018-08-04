var path = require('path');
var root_dir = process.cwd();
var Posts = require(path.join(root_dir, 'domain/models/posts'));

var repo = module.exports = {

  get_all: function(req, res) {
    return new Promise(function(resolve, reject) {
      Posts.find(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  get_one: function(id) {
    return new Promise(function(resolve, reject) {
      Posts.findById(id, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
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
