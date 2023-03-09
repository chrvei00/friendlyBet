const express = require("express");

const {
  createUser,
  auth,
  authCheck,
  logout,
  getLeaderboard,
} = require("../controllers/userController");

const router = express.Router();

router.route("/auth").post(auth).get(authCheck).delete(logout);
router.route("/register").post(createUser);
router.route("/leaderboard").get(getLeaderboard);

module.exports = router;
