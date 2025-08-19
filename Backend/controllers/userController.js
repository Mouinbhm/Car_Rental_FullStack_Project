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
