const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: null,
    },
    magazine: {
      type: Schema.Types.ObjectId,
      ref: "Magazine",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentSchema);
