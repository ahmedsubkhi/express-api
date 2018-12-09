var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/users_controller'));

// declare middleware
var verify_token = require(path.join(root_dir, 'interface/middlewares/verify_token'));
var verify_superuser = require(path.join(root_dir, 'interface/middlewares/verify_superuser'));

/* GET users listing. */
router.get('/', verify_token, verify_superuser, controller.get_all);
router.get('/:id', verify_token, verify_superuser, controller.get_one);
router.post('/', verify_token, verify_superuser, controller.create);
router.post('/:id', verify_token, verify_superuser, controller.update);
router.delete('/:id', verify_token, verify_superuser, controller.destroy);



module.exports = router;
