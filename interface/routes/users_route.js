var express = require('express');
var path = require('path');
var router = express.Router();

var root_dir = process.cwd();

var controller = require(path.join(root_dir, 'apps/users_controller'));

/* GET users listing. */
router.post('/login', controller.login);

router.get('/', controller.get_all);
router.get('/:id', controller.get_one);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.delete('/:id', controller.delete);



module.exports = router;
