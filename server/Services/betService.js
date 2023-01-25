const betModel = require("../models/bet");
 
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