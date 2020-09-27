const express = require("express");
const router = express.Router();
const responseUtil = require("../utils/responseUtils");

/* GET users listing. */
router.get("/", function (req, res, next) {
  return responseUtil.success(
    res,
    200,
    `respond with a resource to ${req.connection.remoteAddress}`
  );
});

router.get("/err", (req, res, next) => {
  try {
    throw new Error("Some kind of error");
  } catch (err) {
    err.status = 409;
    err.httpMessage = "That's suck...";
    next(err);
  }
});

module.exports = router;
