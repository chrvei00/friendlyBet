import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRouteUser, ProtectedRouteAdmin } from "./util/auth";
import Auth from "./pages/Auth";
import Bets from "./pages/Bets";
import CreateBet from "./pages/CreateBet";
import Leaderbaord from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import { checkAuth, getBets, getLeaderboard } from "./util/api";

function App() {
  const updateUser = (user) => {
    window.localStorage.setItem("user", JSON.stringify(user));
  };

  const updateBets = (bets) => {
    window.localStorage.setItem("bets", JSON.stringify(bets));
  };

  const updateLeaderboard = (leaderboard) => {
    window.localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  };

  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      updateUser(null);
    }

    if (!window.localStorage.getItem("bets")) {
      updateBets([]);
    }

    if (!window.localStorage.getItem("leaderboard")) {
      updateLeaderboard([]);
    }

    checkAuth()
      .then((res) => {
        if (res.data.data) {
          updateUser(res.data.data);
        } else {
          updateUser(null);
        }
      })
      .catch((err) => {
        //Do nothing
      });

    getBets()
      .then((res) => {
        if (res.data.data) {
          updateBets(res.data.data);
        } else {
          updateBets(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getLeaderboard()
      .then((res) => {
        if (res.data.data) {
          updateLeaderboard(res.data.data);
        } else {
          updateLeaderboard(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Checking auth, bets and leaderboard...");
      checkAuth()
        .then((res) => {
          if (res.data.data) {
            updateUser(res.data.data);
          } else {
            updateUser(null);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.status === 401) {
            updateUser(null);
          }
          //Do nothing
        });

      getBets()
        .then((res) => {
          if (res.data.data) {
            updateBets(res.data.data);
          } else {
            updateBets(null);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      getLeaderboard()
        .then((res) => {
          if (res.data.data) {
            updateLeaderboard(res.data.data);
          } else {
            updateLeaderboard(null);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Auth
                user={JSON.parse(window.localStorage.getItem("user"))}
                updateUser={updateUser}
              />
            }
          />
          <Route
            path="/bets"
            element={
              <ProtectedRouteUser
                user={JSON.parse(window.localStorage.getItem("user"))}
                updateUser={updateUser}
              >
                <Bets
                  user={JSON.parse(window.localStorage.getItem("user"))}
                  updateUser={updateUser}
                  bets={JSON.parse(window.localStorage.getItem("bets"))}
                  updateBets={updateBets}
                />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/createbet"
            element={
              <ProtectedRouteUser
                user={JSON.parse(window.localStorage.getItem("user"))}
                updateUser={updateUser}
              >
                <CreateBet
                  user={JSON.parse(window.localStorage.getItem("user"))}
                  updateUser={updateUser}
                  bets={JSON.parse(window.localStorage.getItem("bets"))}
                  updateBets={updateBets}
                />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRouteUser
                user={JSON.parse(window.localStorage.getItem("user"))}
                updateUser={updateUser}
              >
                <Leaderbaord
                  user={JSON.parse(window.localStorage.getItem("user"))}
                  updateUser={updateUser}
                  bets={JSON.parse(window.localStorage.getItem("bets"))}
                  updateBets={updateBets}
                  leaderboard={JSON.parse(
                    window.localStorage.getItem("leaderboard")
                  )}
                />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRouteUser
                user={JSON.parse(window.localStorage.getItem("user"))}
                updateUser={updateUser}
              >
                <ProtectedRouteAdmin
                  user={JSON.parse(window.localStorage.getItem("user"))}
                >
                  <Admin
                    user={JSON.parse(window.localStorage.getItem("user"))}
                    updateUser={updateUser}
                    bets={JSON.parse(window.localStorage.getItem("bets"))}
                    updateBets={updateBets}
                  />
                </ProtectedRouteAdmin>
              </ProtectedRouteUser>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
