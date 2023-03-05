const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const betSchema = new Schema({
  title: String,
  oddsW: Number,
  oddsL: Number,
  description: String,
  author: String,
  deadline: Date,
  approved: { type: Boolean, default: false },
  winOrLoss: { type: Boolean, default: null },
  finished: { type: Boolean, default: false },
  finishedDate: { type: Date, default: null },
  closedBy: { type: String, default: null },
});

module.exports = mongoose.model("bet", betSchema);
