var path = require('path');
var express = require('express');
var routes = express.Router();

var appDir = process.cwd();

var index = require(path.join(appDir, 'interface/routes/index'));
var users = require(path.join(appDir, 'interface/routes/users'));

routes.use('/', index);
routes.use('/index', index);
routes.use('/users', users);

module.exports = routes
