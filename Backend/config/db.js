const mongoose = require("mongoose");
module.exports.connectDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      "mongodb+srv://belhajmouin:eBWcEy1GVmZ7EqHu@cluster0.xhaybla.mongodb.net/"
    )
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
    });
};
