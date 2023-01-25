const express = require("express");
const {
  getAllProfiles,
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} = require("../Controllers/profileController");
 
const router = express.Router();
 
router.route("/").get(getAllProfiles).post(createProfile);
router.route("/:id").get(getProfileById).put(updateProfile).delete(deleteProfile);
 
module.exports = router;