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

function App() {
  const updateUser = (user) => {
    window.localStorage.setItem("user", JSON.stringify(user));
  };

  const updateBets = (bets) => {
    window.localStorage.setItem("bets", JSON.stringify(bets));
  };

  useEffect(() => {
    updateUser(JSON.parse(window.localStorage.getItem("user")));
    updateBets(JSON.parse(window.localStorage.getItem("bets")));
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
