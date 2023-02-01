const express = require("express");

const {
  getAllBets,
  createBet,
} = require("../Controllers/betController");
 
const router = express.Router();
 
router.route("/").get(getAllBets).post(createBet);
 
module.exports = router;