const betService = require("../services/betService");
const userService = require("../services/userService");

exports.getAllBets = async (req, res) => {
  try {
    const bets = await betService.getAllBets();
    res.json({ data: bets, status: "success" });
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

exports.createBet = async (req, res) => {
  try {
    const { title, oddsW, oddsL, description, deadline } = req.body;
    const bet = await betService.createBet({
      title: title,
      oddsW: oddsW,
      oddsL: oddsL,
      description: description,
      deadline: deadline,
      author: req.session.user.username,
    });
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
    const { amount, winOrLose } = req.body;
    const id = req.params.id;
    const user = req.session.user;

    if (!amount || !winOrLose || !id || !user) {
      return res.status(400).json({ message: "missing data" });
    } else if (user.total < amount) {
      return res.status(400).json({ message: "not enough money" });
    } else {
      const newUser = await betService.placeBet(id, amount, winOrLose, user);
      req.session.user = newUser;
      res.json({ data: newUser, status: "success" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.closeBet = async (req, res) => {
  try {
    const bet = req.body;
    await userService.getAllUsers().then((users) => {
      users.forEach((user) => {
        user.activeBets.forEach(async (activeBet) => {
          if (
            activeBet.betID === bet._id &&
            activeBet.winOrLose === bet.winOrLose
          ) {
            user.activeBets = user.activeBets.filter(
              (bet) => bet.betID !== activeBet.betID
            );
            //TODO
            const profit = bet.winOrLose
              ? activeBet.amount * bet.oddsW
              : activeBet.amount * bet.oddsL;
            user.prevBets.push({
              betID: activeBet.betID,
              winOrLose: activeBet.winOrLose,
              amount: activeBet.amount,
              profit: profit,
            });
            user.total += profit;
            req.session.user = await userService.updateUser(user._id, user);
          }
        });
      });
    });
    const newBet = await betService.updateBet(req.params.id, bet);
    res.json({ data: newBet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
