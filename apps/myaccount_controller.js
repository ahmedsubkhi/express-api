var path = require('path');
var root_dir = process.cwd();

var users_repository = require(path.join(root_dir, 'domain/repositories/users_repository'));

module.exports = {

  status: function(req, res) {
    var id = res.locals.id_user; // get id from middleware

    users_repository.get_one(id).then(function(data) {
      res.json(data);
    }, function(err){
      res.json(err);
      console.log("Error retrieve data");
    });
  }

}
