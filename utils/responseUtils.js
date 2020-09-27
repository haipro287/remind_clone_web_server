const ErrMessage = require("../config").HTTPErrorMessage;
const debug = require("debug")("remind-clone:server");

exports.error = (res, code = 500, message = ErrMessage.DEFAULT) => {
  res.set("Content-Type", "application/problem+json");
  return res.status(code).json({ error: { code, message } });
};

exports.success = (res, code = 200, data) => {
  return res.status(code).json({ data });
};
