const mongoose = require("mongoose");

const uploadSchema = mongoose.Schema({
  imgName: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model("upload", uploadSchema);
