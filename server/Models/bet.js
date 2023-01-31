const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const Schema = mongoose.Schema;

const betSchema = new Schema({
    title: String,
    oddsW: String,
    oddsL: String,
    description: String,
    approved: {type: Boolean, default: false},
    winOrLoss: {type: Boolean, default: false},
    finished: {type: Boolean, default: false}
});

module.exports = mongoose.model("bet", betSchema);