const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Photo title is required"],
  },
  description: {
    type: String,
    required: [true, "Photo description is required"],
  },
  url: {
    type: String,
    required: [true, "image is required"],
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
