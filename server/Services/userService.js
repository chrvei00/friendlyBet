const userModel = require("../models/user");

exports.getAllUsers = async () => {
  return await userModel.find();
};

exports.createUser = async (user) => {
  return await userModel.create(user);
};
exports.getUserByName = async (username) => {
  return await userModel.findOne({ username: username });
};

exports.getUserById = async (user) => {
  return await userModel.findById(user.id);
};

exports.updateUser = async (id, user) => {
  return await userModel.findByIdAndUpdate(id, user, { new: true });
};

exports.deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
