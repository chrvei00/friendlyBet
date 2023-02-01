const express = require("express");

const {
  getAllUsers,
  getUserByName,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  auth,
  authCheck,
  logout
} = require("../Controllers/userController");
 
const router = express.Router();

router.route("/all").get(getAllUsers)
router.route("/login").post(auth).get(authCheck);
router.route("/logout").delete(logout);
router.route("/register").post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser).get(getUserById);
 
module.exports = router;