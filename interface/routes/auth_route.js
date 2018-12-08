var express = require('express');
var path = require('path');
var passport = require('passport');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/auth_controller'));

// declare middleware
var verify_token = require(path.join(root_dir, 'interface/middlewares/verify_token'));


router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/activate', verify_token, controller.activate);


module.exports = router;
