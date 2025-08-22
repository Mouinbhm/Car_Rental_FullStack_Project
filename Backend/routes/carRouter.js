var express = require("express");
var router = express.Router();
const os = require("os");

const carController = require("../controllers/carController");

router.get("/getAllCars", carController.getAllCars);
router.post("/addCar", carController.addCar);

module.exports = router;
