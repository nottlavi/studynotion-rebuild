const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  subsections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Section", sectionSchema);
