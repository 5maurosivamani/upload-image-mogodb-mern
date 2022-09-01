const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/upload_image");
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
