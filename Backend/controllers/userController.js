const userModel = require("../models/userModel");

module.exports.getAllUsers = async (req, res) => {
  try {
    const usersList = await userModel.find({});
    res.status(200).json({ usersList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUserByPhone = async (req, res) => {
  try {
    const user = await userModel.findOne({ phone: req.params.phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addClient = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, userImg } = req.body;
    const role = "client";

    const user = new userModel({
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
      userImg,
    });
    const addedUser = await user.save();
    res.status(200).json({ addedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
