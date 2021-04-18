var express = require("express");
var router = express.Router();
const UsersController = require("../controllers/usersController");

/* GET signin listing. */
router.get("/", function (req, res, next) {
  res.render("signin");
});

module.exports = router;
