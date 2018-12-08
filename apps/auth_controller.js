var path = require('path');
var passport = require('passport');

var root_dir = process.cwd();

var auth_repository = require(path.join(root_dir, 'domain/repositories/auth_repository'));
var users_repository = require(path.join(root_dir, 'domain/repositories/users_repository'));

module.exports = {

  login: function(req, res) {
    auth_repository.login(req, res).then(function(data) {
      res.json(data);
    }, function(err){
      console.log("Error login");
      console.log(err);
    });
  },

  register: function(req, res){
    auth_repository.register(req, res).then(function(data) {
      res.json(data);
    }, function(err){
      console.log("Error register");
      console.log(err);
    });
  },

  activate: function(req, res){
    auth_repository.activate(req, res).then(function(data) {
      res.json(data);
    }, function(err){
      console.log("Error activation");
      console.log(err);
    });
  }

}
