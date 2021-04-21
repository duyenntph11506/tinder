var express = require("express");
var router = express.Router();

const usersController = require("../controllers/usersController");

/* GET users listing. */
router.post("/insertUser", usersController.insertUser);
router.post("/insertUserApi", usersController.insertUserApi);
router.post("/findUserApi", usersController.findUserApi);
router.post("/delete", usersController.deleteUser);

router.put("/editUser", usersController.updateUser);
router.put("/editUserApi", usersController.updateUserApi);

router.delete("/deleteUserApi", usersController.deleteUserApi);

router.get("/getUsersApi", usersController.readUsersApi);
router.get("/search", usersController.findUsers);
router.get("/:id", usersController.findUser);
router.get("/", usersController.readUsers);

module.exports = router;
