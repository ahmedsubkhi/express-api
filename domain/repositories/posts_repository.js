var path = require('path');
var _ = require('lodash');
var root_dir = process.cwd();
var Posts = require(path.join(root_dir, 'domain/models/posts'));

var repo = module.exports = {

  get_all: function(req, res) {
    return new Promise(function(resolve, reject) {
      Posts.find({}, 'title body user created_at updated_at id_post')
      .populate({ path: 'id_user', select: 'username' })
      .sort({ 'created_at' : -1 })
      .exec(function (err, data) {
        var posts = data;

        if (err) {
          reject(err);
        } else {
          resolve(posts);
        }
      });
    });
  },

  get_all_year: function(){
    // Get the month and year of grouped posts
    return new Promise(function(resolve, reject){
      Posts.aggregate(
        [{
          $group: {
            _id: {
              year: { $year: "$created_at" },
              month: { $month : "$created_at" }
            },
            count: { $sum: 1 }
          }
        }]
      ).exec(function(err, data){
        if(err){
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  get_by_month: function(yr, mon){
    // Get item of posts by filter month and year
    return new Promise(function(resolve, reject){
      Posts.aggregate(
        [
        { $project: {
            id_post: 1,
            title: 1,
            month: { $month: "$created_at" },
            year: { $year: "$created_at" }
          } },
        { $match: {
            month: parseInt(mon),
            year: parseInt(yr)
          } },
        { $sort: {"id_post": -1} }
        ]
      ).exec(function(err, data){
        if(err){
          console.log(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },

  get_one: function(id) {
    return new Promise(function(resolve, reject) {
      Posts.findOne({ "id_post":id })
      .populate([
        { path: 'id_user', select: 'username' },
        { path: 'comments.id_user', select: 'username' }
      ])
      .sort({ 'created_at' : -1 })
      .exec(function (err, data) {
        data.comments = _.reject(data.comments, { 'id_user': null });

        var posts = data;

        if (err) {
          reject(err);
        } else {
          if(data){
            resolve(posts);
          } else {
            resolve(null);
          }
        }
      });
    });
  },

  get_one_foradmin: function(id) {
    return new Promise(function(resolve, reject) {
      Posts.findOne({ "id_post":id }, 'title body user created_at updated_at id_post')
      .populate({ path: 'id_user', select: 'username' })
      .sort({ 'created_at' : -1 })
      .exec(function (err, data) {

        var posts = data;

        if (err) {
          reject(err);
        } else {
          if(data){
            resolve(posts);
          } else {
            resolve(null);
          }
        }
      });
    });
  },

  get_latest: function(latest = 5) {
    return new Promise(function(resolve, reject) {
      Posts.find({}, 'title body user created_at updated_at id_post')
      .populate({ path: 'id_user', select: 'username' })
      .sort({ 'created_at' : -1 })
      .limit(latest)
      .exec(function (err, data) {

        var posts = data;

        if (err) {
          reject(err);
        } else {
          if (data) {
            resolve(posts);
          } else {
            resolve(null);
          }
        }
      });
    });
  },

  create: function(req, res) {
    var data = new Posts({
      title: req.body.title,
      body: req.body.body,
      id_user: res.locals.id_user, // get from middleware 'verify_token'
      created_at: new Date,
      updated_at: new Date,
      published: true,
      deleted: false
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
      var datas = {
        title: req.body.title,
        body: req.body.body,
        id_user: res.locals.id_user, // get from middleware 'verify_token'
        updated_at: new Date,
        published: true,
        deleted: false
      };
      Posts.findByIdAndUpdate(id, datas, {}, function(err, data){
        if (err) {
          reject(err);
        } else {
          resolve(datas);
        }
      });
    });
  },

  destroy: function(id) {
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
  },

  create_comment: function(req, res) {
    var comment = {
      id_user: res.locals.id_user, // get from middleware 'verify_token'
      body: req.body.body,
      created_at: new Date,
      updated_at: new Date,
      published: true,
      deleted: false
    };

    return new Promise(function(resolve, reject) {
      Posts.findByIdAndUpdate(req.body._id,
        { $push:{ comments: comment } },
        { safe: true, upsert: true, new : true, runValidators: true }, function(err, data){
          if (err) {
            reject(err);
          } else {
            Posts.findById(req.body._id)
            .populate([
              { path: 'id_user', select: 'username' },
              { path: 'comments.id_user', select: 'username' }
            ])
            .sort({ 'created_at' : -1 })
            .exec(function (err, datas) {

              datas.comments = _.reject(datas.comments, { 'id_user': null });
              var posts = datas;

              if (err) {
                reject(err);
              } else {
                if(data){
                  resolve(posts);
                } else {
                  resolve(null);
                }
              }
            });
          }
      });
    });
  }

}
