var path = require('path');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var passport = require('passport');

var root_dir = process.cwd();

var Users = require(path.join(root_dir, 'domain/models/users'));
var users_repository = require(path.join(root_dir, 'domain/repositories/users_repository'));
var keys = require(path.join(root_dir, 'infrastructure/config/keys'));

var repo = module.exports = {

  compare_password: function (password, password_hashed) {
    return bcrypt.compareSync(password, password_hashed);
  },

  login: function(req, res) {
    return new Promise(function(resolve, reject) {
      Users.findOne({ email: req.body.email })
      //.populate({ path: 'id_group', select: 'name' })
      .exec(function (err, user) {
        if (err) {
          reject(err);
        } else {
          if(user){
            // check if the password is valid
            var passwordIsValid = repo.compare_password(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, message: 'Invalid email or password' });

            // if user is found and password is valid
            // create a token
            var token = jwt.sign({ id_user: user._id, username: user.username, id_group: user.id_group }, keys.jwt_verify_key, {
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
  },

  register: function(req, res){
    return new Promise(function(resolve, reject) {
      passport.authenticate('google-token', { session: false, scope: ['email', 'profile'] }, function(err, user, info){

        if (err) {
          reject({ "auth":false, "message":err });
        }
        if (!user) {
          resolve({ "auth":false, "message":"No user authenticated" });
        }

        users_repository.save_registration(user._json).then(function(data) {

          // if user authenticated
          // create a token
          var token = jwt.sign({ id_user: data._id, username: data.username, id_group: data.id_group }, keys.jwt_verify_key, {
            algorithm: 'HS256',
            expiresIn: 86400 // expires in 24 hours
          });

          resolve({ "auth":true, "message":"User success authenticated", "data": data, "token": token });
        });
      })(req, res);
    });
  },

  activate: function(req, res){
    return new Promise(function(resolve, reject) {
      users_repository.activate_registration(req, res).then(function(data){
        if(!data){
          resolve({ "auth":false, "message":"Some field empty or not completed" });
          return false;
        }
        // if user authenticated
        // create a token
        var token = jwt.sign({ id_user: data._id, username: data.username, groupname: data.id_group }, keys.jwt_verify_key, {
          algorithm: 'HS256',
          expiresIn: 86400 // expires in 24 hours
        });

        resolve({ "auth":true, "message":"User success activated", "data": data, "token": token });

      }, function(err){
        console.log(err);
      });
    });
  }

}
