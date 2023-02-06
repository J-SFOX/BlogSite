const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user')
const env = process.env

module.exports = function(_passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = env.SECRET;
    _passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("passport Call is here")
        console.log("this the payload " + JSON.stringify(jwt_payload))
        // getting the user by id from the token
        User.getUserById ( jwt_payload.data._id , (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // so I can create a new account but not to systematic
            }
        });
    }));
}
