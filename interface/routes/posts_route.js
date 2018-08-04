var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/posts_controller'));

// declare middleware
var verify_token = require(path.join(root_dir, 'interface/middlewares/verify_token'));

router.get('/', controller.get_all);
router.get('/:id', controller.get_one);
router.post('/', verify_token, controller.create);
router.post('/:id', verify_token, controller.update);
router.delete('/:id', verify_token, controller.delete);



module.exports = router;
