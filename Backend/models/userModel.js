const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/,
    message: "please fill a valid email",
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    message:
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
  },
  phone: { type: String, required: true },
  role: { type: String, enum: ["client", "admin"], default: "client" },
  userImg: { type: String, required: false, default: "client.png" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
