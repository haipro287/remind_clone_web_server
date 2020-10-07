const User = require("../models/User");

exports.getUserById = (id) => {
  return User.query().findById(id);
};
