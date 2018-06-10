var path = require('path');
var root_dir = process.cwd();

var users_repository = require(path.join(root_dir, 'domain/repositories/users_repository'));

module.exports.users_controller = function(req, res) {

  users_repository.getAll(req, res).then(function(user) {
    res.json(user);
  }, function(err){
    console.log("Error retrieve data");
  });

}
