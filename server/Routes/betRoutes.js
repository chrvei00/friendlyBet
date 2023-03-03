const express = require("express");

const {
  getAllBets,
  createBet,
  getBetById,
  placeBet,
} = require("../Controllers/betController");

const router = express.Router();

router.route("/").get(getAllBets).post(createBet);
router.route("/getbet/:id").get(getBetById);
router.route("/placeBet/:id").get(getBetById);

module.exports = router;
