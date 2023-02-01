const betService = require("../services/betService");
 
exports.getAllBets = async (req, res) => {
  try {
    const bets = await betService.getAllBets();
    res.json({ data: bets, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createBet = async (req, res) => {
  try {
    const bet = await betService.createBet(req.body);
    res.json({ data: bet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getBetById = async (req, res) => {
  try {
    const bet = await betService.getBetById(req.params.id);
    res.json({ data: bet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateBet = async (req, res) => {
  try {
    const bet = await betService.updateBet(req.params.id, req.body);
    res.json({ data: bet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteBet = async (req, res) => {
  try {
    const bet = await betService.deleteBet(req.params.id);
    res.json({ data: bet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};