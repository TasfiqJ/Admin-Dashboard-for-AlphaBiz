const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true }, // URL of the uploaded file
  eventDate: { type: Date }, // Optional for events
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", contentSchema);