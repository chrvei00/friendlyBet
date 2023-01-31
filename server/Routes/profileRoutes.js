const express = require("express");
const {
  getAllProfiles,
  getProfileByName,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  auth,
  authCheck,
  logout
} = require("../Controllers/profileController");
 
const router = express.Router();

router.route("/all").get(getAllProfiles)
router.route("/login").post(auth).get(authCheck);
router.route("/logout").delete(logout);
router.route("/register").post(createProfile);
router.route("/:id").put(updateProfile).delete(deleteProfile).get(getProfileById);
 
module.exports = router;