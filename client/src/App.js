import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRouteUser, ProtectedRouteAdmin } from "./util/auth";
import { useState } from "react";
import Auth from "./pages/Auth";
import Bets from "./pages/Bets";
import CreateBet from "./pages/CreateBet";
import Leaderbaord from "./pages/Leaderboard";
import Admin from "./pages/Admin";

function App() {
  const [user, setUser] = useState(null);
  const [bets, setBets] = useState([]);

  const updateUser = (user) => {
    setUser(user);
  };

  const updateBets = (bets) => {
    setBets(bets);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Auth user={user} updateUser={updateUser} />}
          />
          <Route element={<ProtectedRouteUser user={user} />}>
            <Route
              path="/bets"
              element={
                <Bets
                  user={user}
                  updateUser={updateUser}
                  bets={bets}
                  updateBets={updateBets}
                />
              }
            />
            <Route
              path="/createbet"
              element={
                <CreateBet
                  user={user}
                  updateUser={updateUser}
                  bets={bets}
                  updateBets={updateBets}
                />
              }
            />
            <Route
              path="/leaderboard"
              element={
                <Leaderbaord
                  user={user}
                  updateUser={updateUser}
                  bets={bets}
                  updateBets={updateBets}
                />
              }
            />
            <Route element={<ProtectedRouteAdmin user={user} />}>
              <Route
                path="/admin"
                element={
                  <Admin
                    user={user}
                    updateUser={updateUser}
                    bets={bets}
                    updateBets={updateBets}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
