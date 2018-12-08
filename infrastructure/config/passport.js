var passport = require('passport');
require('dotenv').load();


var GoogleTokenStrategy = require('passport-google-token').Strategy;
passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY
},
function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

