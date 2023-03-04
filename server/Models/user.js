const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  date: { type: Date, default: Date.now },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  approved: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  total: { type: Number, default: 5000 },
  activeBets: [{ betID: String, winOrLose: Boolean, amount: Number }],
  prevBets: [{ betID: String, amount: Number }],
});

module.exports = mongoose.model("user", userSchema);
