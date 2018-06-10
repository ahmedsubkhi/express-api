var path = require('path');
var root_dir = process.cwd();
var { users, db } = require(path.join(root_dir, 'domain/models/users'));
var returned_data;

module.exports = {
  getAll: function(req, res)
  {
    all_users = db.model('users', users);
    return new Promise(function(resolve, reject) {
      all_users.find(function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }
}
