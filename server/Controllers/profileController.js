const profileService = require("../services/profileService");
 
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.json({ data: profiles, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createProfile = async (req, res) => {
  try {
    const profile = await profileService.createProfile(req.body);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getProfileById = async (req, res) => {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateProfile = async (req, res) => {
  try {
    const profile = await profileService.updateProfile(req.params.id, req.body);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await profileService.deleteProfile(req.params.id);
    res.json({ data: profile, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};