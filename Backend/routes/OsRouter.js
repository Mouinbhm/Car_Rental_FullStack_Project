var express = require("express");
var router = express.Router();
const os = require("os");

const OsController = require("../controllers/OsController");
router.get("/getOsInformation", OsController.getOsInformation);

module.exports = router;
