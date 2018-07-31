var path = require('path');
var root_dir = process.cwd();

var auth_repository = require(path.join(root_dir, 'domain/repositories/auth_repository'));

module.exports = {

  login: function(req, res) {
    auth_repository.login(req, res).then(function(data) {
      res.json({
        logindata: data
      });
    }, function(err){
      console.log("Error login");
    });
  }

}
