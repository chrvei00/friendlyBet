const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: String,
    password: Number,
    total: Number,
    activeBets: Array
});

module.exports = mongoose.model("profile", profileSchema);