const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const betSchema = new Schema({
  title: String,
  oddsW: Number,
  oddsL: Number,
  description: String,
  author: String,
  approved: { type: Boolean, default: false },
  winOrLoss: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
});

module.exports = mongoose.model("bet", betSchema);
