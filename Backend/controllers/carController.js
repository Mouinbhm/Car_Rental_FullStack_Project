const carModel = require("../models/carModel");

module.exports.getAllCars = async (req, res) => {
  try {
    const carsList = await carModel.find();
    res.status(200).json(carsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addCar = async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      category,
      transmission,
      fuel,
      seats,
      dailyRate,
    } = req.body;

    const car = new carModel({
      make,
      model,
      year,
      category,
      transmission,
      fuel,
      seats,
      dailyRate,
    });

    const addedCar = await car.save();
    res.status(201).json({ addedCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCar = await carModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({ updatedCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCar = await carModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
