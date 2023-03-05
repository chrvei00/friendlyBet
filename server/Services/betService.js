const betModel = require("../models/bet");
const userModel = require("../models/user");

exports.getAllBets = async () => {
  return await betModel.find();
};

exports.createBet = async (bet) => {
  return await betModel.create(bet);
};
exports.getBetById = async (id) => {
  return await betModel.findById(id);
};

exports.updateBet = async (id, bet) => {
  return await betModel.findByIdAndUpdate(id, bet);
};

exports.deleteBet = async (id) => {
  return await betModel.findByIdAndDelete(id);
};

exports.placeBet = async (id, amount, winOrLose, user) => {
  user.activeBets.push({ betID: id, winOrLose: winOrLose, amount: amount });
  user.total = user.total - amount;
  return await userModel.findByIdAndUpdate(user._id, user, { new: true });
};
