const mongoose = require("mongoose");
const _ = require("lodash");

const Schema = mongoose.Schema;

const STATES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const videosSchema = new Schema(
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
    thumbnail: {
      type: String,
      default: null,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    state: {
      type: String,
      enum: [STATES.ACTIVE, STATES.INACTIVE],
      default: STATES.ACTIVE,
    },
    isWelcome: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = _.assign(mongoose.model("Video", videosSchema), STATES);
