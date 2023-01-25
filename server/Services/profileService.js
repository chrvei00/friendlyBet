const profileModel = require("../models/profile");
 
exports.getAllProfiles = async () => {
  return await profileModel.find();
};
 
exports.createProfile = async (profile) => {
  return await profileModel.create(profile);
};
exports.getProfileById = async (id) => {
  return await profileModel.findById(id);
};
 
exports.updateProfile = async (id, profile) => {
  return await profileModel.findByIdAndUpdate(id, profile);
};
 
exports.deleteProfile = async (id) => {
  return await profileModel.findByIdAndDelete(id);
};