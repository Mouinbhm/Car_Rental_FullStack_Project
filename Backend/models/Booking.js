// Backend/models/Booking.js
const mongoose = require("mongoose");

const CarSnapshotSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
    make: String,
    model: String,
    category: String,
    image: String,
    dailyRate: Number,
    features: [String],
    specs: {
      engine: String,
      fuel: String,
      year: Number,
      doors: Number,
      luggage: Number,
      consumption: String,
    },
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema(
  {
    // who/what is being booked
    car: CarSnapshotSchema, // snapshot of the car at time of booking (optional but recommended)
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, // optional reference

    // rental details
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    pickupDate: { type: String, required: true }, // ISO date string (yyyy-mm-dd)
    pickupTime: { type: String, required: true }, // HH:mm
    returnDate: { type: String, required: true },
    returnTime: { type: String, required: true },

    // driver/customer
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/,
    },
    phone: { type: String, required: true, trim: true },

    // add-ons
    additionalDriver: { type: Boolean, default: false },
    childSeat: { type: Boolean, default: false },
    fullTank: { type: Boolean, default: false },

    // status + totals
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    estimatedTotal: { type: Number, default: 0 }, // optional precomputed total
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
