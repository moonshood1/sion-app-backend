const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.statics = {
  async checkPassword(password, userPass) {
    const match = await bcrypt.compareSync(password, userPass);
    return match;
  },
};

module.exports = mongoose.model("Admin", adminSchema);
