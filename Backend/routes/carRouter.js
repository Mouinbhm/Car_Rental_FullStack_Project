// Backend/routes/carRouter.js
const express = require("express");
const router = express.Router();

const carController = require("../controllers/carController");
const uploadfile = require("../middlewares/uploadFile");

router.get("/getAllCars", carController.getAllCars);
router.post("/addCar", uploadfile.single("image"), carController.addCar);
router.put(
  "/updateCar/:id",
  uploadfile.single("image"),
  carController.updateCar
);
router.delete("/deleteCar/:id", carController.deleteCar);
router.get("/getCarByCategory/:category", carController.getCarByCategory);

// Stats (for dashboard)
router.get("/stats", carController.getCarStats);

module.exports = router;
