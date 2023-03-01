const express = require("express");

const {
  getAllUsers,
  createUser,
  auth,
  authCheck,
  logout,
} = require("../Controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/auth").post(auth).get(authCheck).delete(logout);
router.route("/register").post(createUser);

module.exports = router;
