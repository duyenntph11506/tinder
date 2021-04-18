var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

/* GET users listing. */
router.post("/insertUser", usersController.insertUser);
router.put("/editUser", usersController.updateUser);
router.post("/delete", usersController.deleteUser);
router.get("/search", usersController.findUsers);
router.get("/:id", usersController.findUser);
router.get("/", usersController.readUsers);

module.exports = router;
