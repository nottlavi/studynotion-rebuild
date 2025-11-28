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
    description: {
      required: true,
      type: String,
    },
    price: {
      type: Number,
      required: true,
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
    thumbnail: {
      type: String,
      required: true,
    },
    benifits: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      required: true,
    },
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
