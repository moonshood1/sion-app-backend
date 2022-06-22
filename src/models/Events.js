const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    media: {
      type: Array,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
