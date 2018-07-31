var path = require('path');
var root_dir = process.cwd();

var users_repository = require(path.join(root_dir, 'domain/repositories/users_repository'));

module.exports = {
  get_all: function(req, res) {
    users_repository.get_all(req, res).then(function(user) {
      res.json(user);
    }, function(err){
      res.json(err);
      console.log("Error retrieve data");
    });
  },

  get_one: function(req, res) {
    var id = req.params.id;
    users_repository.get_one(id).then(function(user) {
      res.json(user);
    }, function(err){
      res.json(err);
      console.log("Error retrieve data");
    });
  },

  create: function(req, res) {
    users_repository.create(req, res).then(function(user) {
      res.json(user);
    }, function(err){
      res.json(err);
      console.log("Error saving data");
    });
  },

  update: function(req, res) {
    var id = req.params.id;
    users_repository.update(req, res, id).then(function(user) {
      res.json({
        updated_id: id,
        newdata: user
      });
    }, function(err){
      res.json(err);
      console.log("Error updating data");
    });
  },

  delete: function(req, res) {
    var id = req.params.id;
    users_repository.delete(id).then(function(stat) {
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
