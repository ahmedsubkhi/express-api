var path = require('path');

// declare root path place
var root_dir = process.cwd();


function verify_superuser(req, res, next) {
  var id_group = res.locals.id_group;
  if (!id_group){
    return res.status(403).send({ auth: false, message: 'Not group' });
  } else if(id_group != '5bf8cbe6b6f7b9e024035173') {
    return res.status(403).send({ auth: false, message: 'Not allowed group' });
  } else {
    next();
  }
}

module.exports = verify_superuser;
