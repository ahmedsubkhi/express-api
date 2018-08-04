var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/myaccount_controller'));

router.get('/', controller.status);


module.exports = router;
