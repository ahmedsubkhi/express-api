var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/users_controller'));

/* GET users listing. */
router.get('/', controller.users_controller);

module.exports = router;
