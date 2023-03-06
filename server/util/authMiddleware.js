const checkLoggedIn = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.send({ message: "Not logged in." });
  }
};

const checkAdministrator = (req, res, next) => {
  if (req.session.user.admin) {
    next();
  } else {
    res.send({ message: "Not administrator." });
  }
};

module.exports = { checkLoggedIn, checkAdministrator };
