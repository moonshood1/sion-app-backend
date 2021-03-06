const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    secondText: {
      type: String,
      default: null,
    },
    thirdText: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    image: {
      type: String,
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

module.exports = mongoose.model("Event", eventSchema);
