// Backend/controllers/contactController.js
const ContactMessage = require("../models/ContactModel");

module.exports.addMessage = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      agreedToPrivacy,
    } = req.body;

    if (!agreedToPrivacy) {
      return res
        .status(400)
        .json({ message: "Privacy policy must be accepted." });
    }

    const created = await ContactMessage.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      agreedToPrivacy: true,
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllMessages = async (req, res) => {
  try {
    const list = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await ContactMessage.findById(id);
    if (!msg) return res.status(404).json({ message: "Not found" });
    res.status(200).json(msg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "new" | "in_progress" | "resolved"
    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await ContactMessage.findByIdAndDelete(id);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
