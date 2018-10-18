var mongoose = require('mongoose');

require('dotenv').load();

var username = process.env.MONGODB_USERNAME;
var password = process.env.MONGODB_PASSWORD;
var credential = (username) ? (username + ':' + password + '@') : '';
var database_name = process.env.MONGODB_DATABASE;
var uri = 'mongodb://'+ credential + 'localhost:27017/' + database_name;

var options = {
  auth: { "authSource": "admin" },
  useNewUrlParser: true,
  useCreateIndex: true
}

mongoose.connect(uri, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB !');
});


module.exports = mongoose
