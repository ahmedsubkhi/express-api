var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/posts_controller'));

// declare middleware
var verify_token = require(path.join(root_dir, 'interface/middlewares/verify_token'));

router.get('/', controller.get_all);
router.get('/admin/posts', verify_token, controller.get_all);
router.get('/latest', controller.getLatest);
router.get('/bymonth/:yr/:mon', controller.get_by_month);
router.get('/year', controller.get_all_year);
router.get('/:id', controller.get_one);
router.post('/', verify_token, controller.create);
router.post('/:id', verify_token, controller.update);
router.delete('/:id', verify_token, controller.delete);



module.exports = router;
