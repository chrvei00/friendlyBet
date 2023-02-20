const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  total: { type: Number, default: 5000 },
  activeBets: { type: Array, default: [] },
  prevBets: { type: Array, default: [] },
  approved: { type: Boolean, defulat: false },
  admin: { type: Boolean, defulat: false },
});

module.exports = mongoose.model("user", userSchema);
