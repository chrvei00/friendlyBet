import React from "react";
import { logout } from "../util/api";

const handleLogout = (e, updateUser) => {
  e.preventDefault();
  logout()
    .then((res) => {
      updateUser(null);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

function Navbar(props) {
  const admin = () => {
    if (props.user.admin) {
      return (
        <li className="nav-item">
          <a
            className={
              window.location.pathname === "/admin"
                ? "nav-link text-danger fw-bold"
                : "nav-link text-danger"
            }
            href="/admin"
          >
            ADMIN
          </a>
        </li>
      );
    } else {
      return null;
    }
  };

  return (
    <nav className="navbar sticky-top navbar-expand-sm bg-body-tertiary navbar-dark bg-dark mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/bets">
          <h3>friendlyBet</h3>
        </a>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={
                  window.location.pathname === "/bets"
                    ? "nav-link active"
                    : "nav-link"
                }
                aria-current="page"
                href="/bets"
              >
                Bets
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  window.location.pathname === "/createbet"
                    ? "nav-link active"
                    : "nav-link"
                }
                aria-current="page"
                href="/createbet"
              >
                Create bet
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  window.location.pathname === "/leaderboard"
                    ? "nav-link active"
                    : "nav-link"
                }
                href="/leaderboard"
              >
                Leaderboard
              </a>
            </li>
            <li>
              <a
                className={
                  window.location.pathname === "/profile"
                    ? "nav-link active"
                    : "nav-link"
                }
                href="/profile"
              >
                {props.user.username} ({props.user.total})
              </a>
            </li>
            {admin()}
          </ul>
          <form className="d-flex">
            <button
              className="btn btn-outline-danger"
              type="submit"
              onClick={(e) => {
                handleLogout(e, props.updateUser);
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
