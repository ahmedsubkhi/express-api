var path = require('path');
var bcrypt = require('bcrypt');
var root_dir = process.cwd();
var Users = require(path.join(root_dir, 'domain/models/users'));

var repo = module.exports = {

  generate_password: function (password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  get_all: function(req, res) {
    return new Promise(function(resolve, reject) {
      Users.find()
      .populate({ path: 'id_group', select: 'name' })
      .exec(function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },

  get_one: function(id) {
    return new Promise(function(resolve, reject) {
      Users.findById(id)
      //.populate({ path: 'id_group', select: 'name' })
      .exec(function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },

  get_one_byemail: function(id) {
    return new Promise(function(resolve, reject) {
      Users.findById(id)
      .populate({ path: 'id_group', select: 'name' })
      .exec(function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },

  create: function(req, res) {
    var user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: repo.generate_password(req.body.password),
      name: req.body.name,
      id_group: req.body.id_group,
      active: true,
      created_at: new Date,
      updated_at: new Date
    });

    return new Promise(function(resolve, reject) {
      user.save(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },

  update: function(req, res, id) {
    return new Promise(function(resolve, reject) {
      Users.findById(id, function(err, user){

        if(req.body.username) { user.set({ username : req.body.username }); }
        if(req.body.email) { user.set({ email : req.body.email }); }
        if(req.body.password) { user.set({ password : repo.generate_password(req.body.password) }); }
        if(req.body.id_group) { user.set({ id_group : req.body.id_group }); }
        user.set({ updated_at : new Date });

        user.save(function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });

      });
    });
  },

  destroy: function(id) {
    var user = Users.findById(id);
    return new Promise(function(resolve, reject) {
      user.remove(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },

  save_registration: function(data) {
    return new Promise(function(resolve, reject) {
      var userIsFound = {};

      Users.findOne({ "email": data.email })
      .exec(function (err, userFound) {
        if (err) {
          reject(err);
        } else {
          if(userFound){
            resolve(userFound);
          }

          var user = new Users({
            username: data.name.replace(" ","").toLowerCase(),
            email: data.email,
            password: null,
            name: data.name,
            id_group: "5bfa4c9db1739d10df78457a", // Guest group
            active: false,
            created_at: new Date,
            updated_at: new Date
          });

          user.save(function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      });

    });
  },

  activate_registration: function(req, res) {
    return new Promise(function(resolve, reject) {
      Users.findOne({ "email": req.body.email }, function (err, user) {

        if(!req.body.password || !req.body.username || !req.body.email || !req.body.name){
          resolve(null);
          return false;
        }

        if(req.body.username) { user.set({ username : req.body.username }); }
        if(req.body.email) { user.set({ email : req.body.email }); }
        if(req.body.name) { user.set({ name : req.body.name }); }

        user.set({ password : repo.generate_password(req.body.password) });
        user.set({ active : true });
        user.set({ updated_at : new Date });

        user.save(function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });

      });
    });
  }

}
