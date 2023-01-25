const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const betSchema = new Schema({
    title: String,
    oddsW: Number,
    oddsL: Number,
    description: String
});

module.exports = mongoose.model("bet", betSchema);