const express = require("express");

const {
  getAllBets,
  createBet,
  getBetById,
  placeBet,
} = require("../controllers/betController");
const { checkLoggedIn } = require("../util/authMiddleware");

const router = express.Router();

router.route("/").get(getAllBets).post(checkLoggedIn, createBet);
router.route("/getbet/:id").get(getBetById);
router.route("/placeBet/:id").post(checkLoggedIn, placeBet);

module.exports = router;
