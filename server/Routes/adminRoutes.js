const express = require("express");

const { updateBet, deleteBet } = require("../Controllers/betController");

const { updateUser, deleteUser } = require("../Controllers/userController");

const router = express.Router();

router.route("/bet/:id").put(updateBet).delete(deleteBet);
router.route("/user/:id").put(updateUser).delete(deleteUser);

module.exports = router;
