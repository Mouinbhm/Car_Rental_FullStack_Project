const OsServices = require("../services/OsServices");

module.exports.getOsInformation = async (req, res) => {
  try {
    const OsInformation = await OsServices.getData();
    res.status(200).json(OsInformation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
