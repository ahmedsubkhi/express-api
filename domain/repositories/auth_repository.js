var path = require('path');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var root_dir = process.cwd();

var Users = require(path.join(root_dir, 'domain/models/users'));
var keys = require(path.join(root_dir, 'infrastructure/config/keys'));

var repo = module.exports = {

  compare_password: function (password, password_hashed) {
    return bcrypt.compareSync(password, password_hashed);
  },

  login: function(req, res) {
    return new Promise(function(resolve, reject) {
      Users.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
          reject(err);
        } else {
          if(user){
            // check if the password is valid
            var passwordIsValid = repo.compare_password(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Invalid email or password' });

            // if user is found and password is valid
            // create a token
            var token = jwt.sign({ id_user: user._id, username: user.username }, keys.jwt_verify_key, {
              algorithm: 'HS256',
              expiresIn: 86400 // expires in 24 hours
            });

            // return the information including token as JSON
            //res.status(200).send({ auth: true, token: token });
            resolve({ auth: true, token: token, message: 'Login succeded' });
          } else {
            return res.status(401).send({ auth: false, token: null, message: 'Email or password is empty' })
          }
        }

      });
    });
  }

}
