/**
 * Import all routers which match <filename>.route.js in current directory
 * and bind them to a path named /<kebabcase-filename>/*
 */

const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const ROUTER_REGEXP = require("../config").Regex.ROUTER_REGEXP;

try {
  let routeName;
  fs.readdirSync(__dirname).map((fileName) => {
    if (ROUTER_REGEXP.test(fileName)) {
      routeName = "/" + _.kebabCase(fileName.split(".")[0]);
      router.use(routeName, require(path.join(__dirname, fileName)));
    }
  });
} catch (err) {
  console.error(err);
}

module.exports = router;
