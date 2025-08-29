// Backend/models/contactModel.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    phone: { type: String, trim: true },
    subject: {
      type: String,
      required: true,
      enum: ["booking", "modification", "fleet", "payment", "other"],
    },
    message: { type: String, required: true, trim: true },
    agreedToPrivacy: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactSchema);
