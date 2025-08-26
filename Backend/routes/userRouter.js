var express = require("express");
var router = express.Router();
const os = require("os");

const userController = require("../controllers/userController");

router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getUserByPhone/:phone", userController.getUserByPhone);
router.post("/addClient", userController.addClient);
router.delete("/deleteUser/:id", userController.deleteUser);
router.put("/updateUser/:id", userController.updateUser);

module.exports = router;
