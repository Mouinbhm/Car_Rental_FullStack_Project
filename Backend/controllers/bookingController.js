// Backend/controllers/bookingController.js
const Booking = require("../models/Booking");

// Helpers
const diffDays = (startISO, endISO) => {
  try {
    const s = new Date(startISO);
    const e = new Date(endISO);
    const ONE = 1000 * 60 * 60 * 24;
    const d = Math.ceil((e - s) / ONE);
    return d > 0 ? d : 1;
  } catch {
    return 1;
  }
};

const computedStatus = (b) => {
  if (b.status) return b.status;
  try {
    const start = new Date(`${b.pickupDate}T${b.pickupTime || "00:00"}`);
    const end = new Date(`${b.returnDate}T${b.returnTime || "00:00"}`);
    const now = new Date();
    if (isNaN(start) || isNaN(end)) return "Upcoming";
    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "Active";
  } catch {
    return "Upcoming";
  }
};

const bookingPrice = (b) => {
  if (typeof b.estimatedTotal === "number" && b.estimatedTotal >= 0) {
    return b.estimatedTotal;
  }
  const daily = b.car?.dailyRate || 0;
  const days = diffDays(
    `${b.pickupDate}T${b.pickupTime || "00:00"}`,
    `${b.returnDate}T${b.returnTime || "00:00"}`
  );
  return daily * days;
};

// Create a booking
exports.createBooking = async (req, res) => {
  try {
    const {
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      firstName,
      lastName,
      email,
      phone,
      additionalDriver = false,
      childSeat = false,
      fullTank = false,
      carId,
      car,
      estimatedTotal,
      notes,
      status,
    } = req.body;

    if (
      !pickupLocation ||
      !dropoffLocation ||
      !pickupDate ||
      !pickupTime ||
      !returnDate ||
      !returnTime ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const booking = await Booking.create({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      firstName,
      lastName,
      email,
      phone,
      additionalDriver,
      childSeat,
      fullTank,
      carId: carId || car?._id || undefined,
      car: car || undefined,
      estimatedTotal:
        typeof estimatedTotal === "number"
          ? estimatedTotal
          : bookingPrice({
              car,
              pickupDate,
              pickupTime,
              returnDate,
              returnTime,
            }),
      notes,
      status,
    });

    res.status(201).json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create booking", error: err.message });
  }
};

// Get all bookings
exports.getAllBookings = async (_req, res) => {
  try {
    const list = await Booking.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: err.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch booking", error: err.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update booking", error: err.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete booking", error: err.message });
  }
};

// Dashboard stats
exports.getBookingStats = async (_req, res) => {
  try {
    const list = await Booking.find().sort({ createdAt: -1 });

    const statusCounts = { Upcoming: 0, Active: 0, Completed: 0, Cancelled: 0 };
    let totalRevenue = 0;

    // Monthly revenue (last 6 months including current)
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: d.toLocaleString("default", { month: "short" }),
      });
    }
    const revenueMap = months.reduce((acc, m) => ({ ...acc, [m.key]: 0 }), {});

    const activeCarIds = new Set();

    list.forEach((b) => {
      const st = computedStatus(b);
      if (!statusCounts[st]) statusCounts[st] = 0;
      statusCounts[st] += 1;

      const price = bookingPrice(b);
      totalRevenue += price;

      const created = b.createdAt ? new Date(b.createdAt) : null;
      if (created) {
        const key = `${created.getFullYear()}-${String(
          created.getMonth() + 1
        ).padStart(2, "0")}`;
        if (revenueMap[key] !== undefined) {
          revenueMap[key] += price;
        }
      }

      if (st === "Active") {
        const id = b.carId || b.car?._id;
        if (id) activeCarIds.add(String(id));
      }
    });

    const monthlyRevenue = {
      labels: months.map((m) => m.label),
      data: months.map((m) => revenueMap[m.key]),
    };

    const recent = list.slice(0, 8).map((b) => ({
      _id: b._id,
      customer: `${b.firstName || ""} ${b.lastName || ""}`.trim() || "—",
      car: b.car
        ? `${b.car.make || ""} ${b.car.model || ""}`.trim() ||
          b.car.name ||
          "Vehicle"
        : "Vehicle",
      pickupDate: b.pickupDate,
      returnDate: b.returnDate,
      status: computedStatus(b),
      price: bookingPrice(b),
    }));

    res.json({
      totalRevenue,
      statusCounts,
      monthlyRevenue,
      recent,
      activeBookedCarIdsCount: activeCarIds.size, // used by dashboard to compute Available vs Booked cars
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to compute stats", error: err.message });
  }
};
