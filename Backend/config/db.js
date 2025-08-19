const mongoose = require("mongoose");
module.exports.connectDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.URL_MONGODB)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
    });
};
