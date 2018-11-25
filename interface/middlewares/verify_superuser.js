var path = require('path');

// declare root path place
var root_dir = process.cwd();


function verify_superuser(req, res, next) {
  var groupname = res.locals.groupname;
  if (!groupname){
    return res.status(403).send({ auth: false, message: 'Not group' });
  } else if(groupname != 'SUPERUSER') {
    return res.status(403).send({ auth: false, message: 'Not allowed group' });
  } else {
    next();
  }
}

module.exports = verify_superuser;
