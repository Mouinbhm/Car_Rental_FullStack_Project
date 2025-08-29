// Backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Create
router.post("/create", bookingController.createBooking);

// Read
router.get("/getAll", bookingController.getAllBookings);
router.get("/get/:id", bookingController.getBookingById);

// Update
router.put("/update/:id", bookingController.updateBooking);

// Delete
router.delete("/delete/:id", bookingController.deleteBooking);

// Stats (for dashboard)
router.get("/stats", bookingController.getBookingStats);

module.exports = router;
