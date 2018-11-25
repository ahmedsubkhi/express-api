var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/posts_controller'));

// declare middleware
var verify_token = require(path.join(root_dir, 'interface/middlewares/verify_token'));
var verify_superuser = require(path.join(root_dir, 'interface/middlewares/verify_superuser'));

router.get('/', controller.get_all);
router.get('/admin/posts', verify_token, verify_superuser, controller.get_all);
router.get('/latest', controller.get_latest);
router.get('/bymonth/:yr/:mon', controller.get_by_month);
router.get('/year', controller.get_all_year);
router.get('/admin/:id', controller.get_one_foradmin);
router.get('/:id', controller.get_one);
router.post('/', verify_token, verify_superuser, controller.create);
router.post('/:id', verify_token, verify_superuser, controller.update);
router.delete('/:id', verify_token, verify_superuser, controller.destroy);

router.post('/:id/addcomment', verify_token, controller.create_comment);


module.exports = router;
