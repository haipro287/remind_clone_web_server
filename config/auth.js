const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const secretOrKey = process.env.PASSPORT_SECRET || "secretOrKey";

// TODO: Extract JWT Token from cookie
const options = {
  secretOrKey,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

// TODO: Implement token verification
const verify = async (payload, done) => {};

passport.use(new JWTStrategy(options, verify));

exports.createToken = (payload) => {
  return jwt.sign(payload, secretOrKey, {
    expiresIn: 86400,
  });
};

auth.verifyToken = (token) => {
  return jwt.verify(token, secretOrKey);
};

auth.jwtAuth = () => {
  return passport.authenticate("jwt", { session: false });
};

// TODO: Implement socket authentication
auth.socketAuth = () => {};
