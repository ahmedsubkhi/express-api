var path = require('path');
var express = require('express');
var routes = express.Router();

// declare root path place
var root_dir = process.cwd();

// declare route files
var index = require(path.join(root_dir, 'interface/routes/index_route'));
var users = require(path.join(root_dir, 'interface/routes/users_route'));
var auth = require(path.join(root_dir, 'interface/routes/auth_route'));

// declare middleware
var verify_token = require(path.join(root_dir, 'interface/middlewares/verify_token'));

// list of routes
routes.use('/', index);
routes.use('/index', index);
routes.use('/users', verify_token, users);
routes.use('/auth', auth);

module.exports = routes
