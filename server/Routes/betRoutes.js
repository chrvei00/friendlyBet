const express = require("express");
const {
  getAllBets,
  createBet,
  getBetById,
  updateBet,
  deleteBet,
} = require("../Controllers/betController");
 
const router = express.Router();
 
router.route("/").get(getAllBets).post(createBet);
router.route("/:id").get(getBetById).put(updateBet).delete(deleteBet);
 
module.exports = router;