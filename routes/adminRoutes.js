const express = require("express");

const {
  updateBet,
  deleteBet,
  getAllBets,
  closeBet,
} = require("../controllers/betController");

const {
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/bet/:id").put(updateBet).delete(deleteBet);
router.route("/bet/all").get(getAllBets);
router.route("/bet/close/:id").put(closeBet);
router.route("/user/:id").put(updateUser).delete(deleteUser);
router.route("/user/all").get(getAllUsers);

module.exports = router;
