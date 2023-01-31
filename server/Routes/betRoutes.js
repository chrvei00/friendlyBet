const express = require("express");

const {
  verifyToken,
} = require("../middleware/auth")

const {
  getAllBets,
  createBet,
  getBetById,
  updateBet,
  deleteBet,
} = require("../Controllers/betController");
 
const router = express.Router();
 
router.route("/").get(verifyToken, getAllBets).post(verifyToken, createBet);
router.route("/:id").get(getBetById).put(updateBet).delete(deleteBet);
 
module.exports = router;