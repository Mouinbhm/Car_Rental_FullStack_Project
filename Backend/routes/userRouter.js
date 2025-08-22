var express = require("express");
var router = express.Router();
const os = require("os");

const userController = require("../controllers/userController");

router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.post("/addClient", userController.addClient);

module.exports = router;
