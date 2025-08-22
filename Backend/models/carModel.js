const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: {
      type: Number,
      required: true,
      min: 1886,
      max: new Date().getFullYear() + 1,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "economy",
        "compact",
        "midsize",
        "fullsize",
        "suv",
        "van",
        "pickup",
        "luxury",
        "sport",
        "other",
      ],
    },

    transmission: {
      type: String,
      required: true,
      enum: ["manual", "automatic"],
    },

    fuel: {
      type: String,
      required: true,
      enum: ["gasoline", "diesel", "hybrid", "electric", "lpg", "other"],
    },

    seats: { type: Number, required: true, min: 1 },
    dailyRate: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      required: true,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
