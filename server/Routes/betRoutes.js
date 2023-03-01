const express = require("express");

const {
  getAllBets,
  createBet,
  getBetById,
  placeBet,
  deleteBet,
} = require("../Controllers/betController");

const router = express.Router();

router.route("/").get(getAllBets).post(createBet);
router.route("/placeBet/:id").get(getBetById).post(placeBet).delete(deleteBet);

module.exports = router;
