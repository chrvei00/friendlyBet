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
    bet.author = req.session.user.username;
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

exports.placeBet = async (req, res) => {
  try {
    if (req.session.user.totalBalance < req.body.amount) {
      return res.status(400).json({ message: "not enough money" });
    } else {
      const user = await betService.placeBet(
        req.params.id,
        req.body.amount,
        req.session.user
      );
      res.json({ data: user, status: "success" });
    }
  } catch (err) {
    console.log(err.message);
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

exports.deleteBet = async (req, res) => {
  try {
    const bet = await betService.deleteBet(req.params.id);
    res.json({ data: bet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
