const profile = require("../models/profile");
const profileModel = require("../models/profile");
 
exports.getAllProfiles = async () => {
  return await profileModel.find();
};
 
exports.createProfile = async (profile) => {
  return await profileModel.create(profile);
};
exports.getProfileByName = async (name) => {
  return await profileModel.findOne({ name: name });
};

exports.getProfileById = async (profile) => {
  return await profileModel.findById(profile.id);
}

exports.updateProfile = async (id, profile) => {
  return await profileModel.findByIdAndUpdate(id, profile);
};
 
exports.deleteProfile = async (id) => {
  return await profileModel.findByIdAndDelete(id);
};