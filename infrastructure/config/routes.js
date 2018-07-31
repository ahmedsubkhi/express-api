var path = require('path');
var express = require('express');
var routes = express.Router();

var root_dir = process.cwd();

var index = require(path.join(root_dir, 'interface/routes/index_route'));
var users = require(path.join(root_dir, 'interface/routes/users_route'));
var auth = require(path.join(root_dir, 'interface/routes/auth_route'));

routes.use('/', index);
routes.use('/index', index);
routes.use('/users', users);
routes.use('/auth', auth);

module.exports = routes
