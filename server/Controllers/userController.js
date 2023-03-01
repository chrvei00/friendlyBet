const user = require("../models/user");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const { sessionizeUser } = require("../util/authUtil");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ data: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserByName = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await userService.getuserByName(username);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserByName(req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "du må ha navn og passord" });
    } else if (await userService.getUserByName(username)) {
      return res.status(400).json({ message: "brukernavn allerede i bruk" });
    } else {
      const hashedPwd = await bcrypt.hash(password, 5);
      req.session.user = await userService.createUser(
        new user({ username: username, password: hashedPwd })
      );
      res.status(200).json({ data: req.session.user, message: "user created" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json({ data: user, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.auth = async (req, res) => {
  try {
    const { username, password } = req.body;
    user.findOne({ username: username }).then(async (user) => {
      if (!user) {
        return res.status(400).json({ message: "Profil finnes ikke" });
      } else if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .json({ message: "Profil matcher ikke passordet" });
      } else {
        req.session.user = user;
        return res.status(200).json({ data: user, message: "Logget inn." });
      }
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

exports.authCheck = async (req, res) => {
  const sessUser = req.session.user;
  if (sessUser) {
    return res.status(201).json({ data: user, message: "success" });
  } else {
    return res.status(401).json({ message: "!success" });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    //destroy session
    if (err) throw err;
    res.clearCookie("session-id"); // clear cookie
    res.send("Logget ut.");
  });
};
