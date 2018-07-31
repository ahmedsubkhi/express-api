var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/auth_controller'));

router.post('/login', controller.login);


module.exports = router;
