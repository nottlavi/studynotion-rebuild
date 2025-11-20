const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    instructor: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
