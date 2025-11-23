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
    tags: {
      type: [String],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
