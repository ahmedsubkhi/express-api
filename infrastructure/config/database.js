var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express_app');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB !');
});


module.exports = mongoose
