// Backend/routes/contactRouter.js
const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

// Create (submit form)
router.post("/addMessage", contactController.addMessage);

// Admin utilities
router.get("/getAllMessages", contactController.getAllMessages);
router.get("/getMessage/:id", contactController.getMessageById);
router.put("/updateMessageStatus/:id", contactController.updateMessageStatus);
router.delete("/deleteMessage/:id", contactController.deleteMessage);

module.exports = router;
