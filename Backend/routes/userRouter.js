var express = require("express");
var router = express.Router();
const os = require("os");

const userController = require("../controllers/userController");
router.get("/getAllUsers", userController.getAllUsers);

module.exports = router;
