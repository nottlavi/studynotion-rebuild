const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    default: null,
  },
  dob: {
    type: Date,
    default: null,
  },
  about: {
    type: String,
    trim: true,
    default: null,
  },
  contactNumber: {
    type: Number,
    minLength: [10, "Contact number must be at least 10 digits"],
    default: null,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
