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

exports.placeBet = async (id, amount, user) => {
  user.activeBets.push({ betID: id, amount: amount });
  user.total -= amount;
  return await userModel.findByIdAndUpdate(user.id, user);
};
