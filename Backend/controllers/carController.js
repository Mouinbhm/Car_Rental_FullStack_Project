// Backend/controllers/carController.js
const carModel = require("../models/carModel");

module.exports.getAllCars = async (req, res) => {
  try {
    const carsList = await carModel.find().sort({ createdAt: -1 });
    res.status(200).json(carsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addCar = async (req, res) => {
  try {
    const body = { ...req.body };

    // If features comes as a comma-separated string, convert to array
    if (typeof body.features === "string") {
      body.features = body.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // If specs comes as a JSON string, parse it
    if (typeof body.specs === "string") {
      try {
        body.specs = JSON.parse(body.specs);
      } catch (_) {}
    }

    // If a file is uploaded, store the public path
    if (req.file) {
      body.image = `/images/${req.file.filename}`;
    }

    const car = new carModel(body);

    const addedCar = await car.save();
    res.status(201).json(addedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (typeof updatedData.features === "string") {
      updatedData.features = updatedData.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    if (typeof updatedData.specs === "string") {
      try {
        updatedData.specs = JSON.parse(updatedData.specs);
      } catch (_) {}
    }

    if (req.file) {
      updatedData.image = `/images/${req.file.filename}`;
    }

    const updatedCar = await carModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await carModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCarByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const cars = await carModel.find({ category });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stats (total cars, by status/category)
module.exports.getCarStats = async (_req, res) => {
  try {
    const cars = await carModel.find({});
    const totalCars = cars.length;

    const statusCounts = {};
    const categoryCounts = {};
    cars.forEach((c) => {
      const s = c.status || "Unknown";
      statusCounts[s] = (statusCounts[s] || 0) + 1;
      const cat = c.category || "Other";
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    res.json({
      totalCars,
      statusCounts,
      categoryCounts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to compute car stats", error: err.message });
  }
};
