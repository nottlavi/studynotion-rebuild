const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  subsections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
});

module.exports = mongoose.model("Section", sectionSchema);
