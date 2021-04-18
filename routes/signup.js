var express = require("express");
var router = express.Router();
const userSchema = require("../models/userSchema");

/* GET signin listing. */
router.get("/", function (req, res, next) {
  res.render("signup");
});

module.exports = router;
