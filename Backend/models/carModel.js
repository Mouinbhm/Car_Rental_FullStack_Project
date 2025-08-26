const mongoose = require("mongoose");

const specsSchema = new mongoose.Schema(
  {
    engine: { type: String, trim: true }, // ex: "1.5L 4-cylinder"
    consumption: { type: String, trim: true }, // ex: "5.1L/100km"
    doors: { type: Number, min: 2, max: 6 },
    luggage: { type: Number, min: 0 },
    year: {
      type: Number,
      min: 1886,
      max: new Date().getFullYear() + 1,
    },
  },
  { _id: false }
);

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

    // Champs pour ton front
    image: { type: String, trim: true },
    features: { type: [String], default: [] },
    description: { type: String, trim: true },
    specs: specsSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
