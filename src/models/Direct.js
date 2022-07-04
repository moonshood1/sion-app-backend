const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const STATUS = {
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
};

const directSchema = new Schema(
  {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: [STATUS.SCHEDULED, STATUS.PUBLISHED],
      default: STATUS.SCHEDULED,
    },
    isNext: {
      type: Boolean,
      default: false,
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Direct", directSchema);
