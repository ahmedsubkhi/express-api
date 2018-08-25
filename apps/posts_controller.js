var path = require('path');
var root_dir = process.cwd();

var posts_repository = require(path.join(root_dir, 'domain/repositories/posts_repository'));

module.exports = {
  get_all: function(req, res) {
    posts_repository.get_all(req, res).then(function(data) {
      res.json(data);
    }, function(err){
      res.json(err);
      console.log("Error retrieve data");
    });
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  },

  get_one: function(req, res) {
    var id = req.params.id;
    posts_repository.get_one(id).then(function(data) {
      res.json(data);
    }, function(err){
      res.json(err);
      console.log("Error retrieve data");
    });
  },

  create: function(req, res) {
    posts_repository.create(req, res).then(function(data) {
      res.json(data);
    }, function(err){
      res.json(err);
      console.log("Error saving data");
    });
  },

  update: function(req, res) {
    var id = req.params.id;
    posts_repository.update(req, res, id).then(function(data) {
      res.json({
        updated_id: id,
        newdata: data
      });
    }, function(err){
      res.json(err);
      console.log("Error updating data");
    });
  },

  delete: function(req, res) {
    var id = req.params.id;
    posts_repository.delete(id).then(function(stat) {
      res.json({
        deleted_id: id,
        status: stat
      });
    }, function(err){
      res.json(err);
      console.log("Error delete data");
    });
  }

}
