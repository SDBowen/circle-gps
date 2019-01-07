const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
// const { jwtKey } = require("../config/jwtConfig");

const User = mongoose.model("users");

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_KEY;

module.exports = passport => {
  passport.use(
    new Strategy(options, (jwtPayload, done) => {
      // Find user by id and return user detail
      User.findById(jwtPayload.id)
        .then(returnedUser => {
          if (returnedUser) {
            return done(null, returnedUser);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
