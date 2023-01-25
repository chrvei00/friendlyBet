const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: String,
    password: String,
    total: {type: Number, default: 5000},
    activeBets: {type: Array, default: []},
    approved: {type: Boolean, defulat: false},
    admin: {type: Boolean, defulat: false}
});

module.exports = mongoose.model("profile", profileSchema);