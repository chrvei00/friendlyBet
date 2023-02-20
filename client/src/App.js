import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./util/auth";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import Bets from "./pages/Bets";
import CreateBet from "./pages/CreateBet";
import Leaderbaord from "./pages/Leaderboard";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [bets, setBets] = useState([]);

  const handleLogin = async (username, password) => {
    await axios
      .post("/api/user/auth", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      });
  };

  const handleRegister = (username, password) => {
    axios
      .post("/api/user/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        setUser(response.data);
      });
  };

  const handleLogout = () => {
    axios.delete("/api/user/auth");
    setUser(null);
  };

  const checkAuth = async () => {
    await axios
      .get("/api/user/auth")
      .then((response) => {
        if (response.status === 201) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBets = async () => {
    await axios.get("/api/bet").then((response) => {
      setBets(response.data.data);
    });
  };

  useEffect((user) => {
    checkAuth();
    getBets();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Auth
                user={user}
                handleLogin={handleLogin}
                handleRegister={handleRegister}
              />
            }
          />
          <Route element={<ProtectedRoute user={user} />}>
            <Route
              path="/bets"
              element={
                <Bets bets={bets} user={user} handleLogout={handleLogout} />
              }
            />
            <Route
              path="/createbet"
              element={<CreateBet user={user} handleLogout={handleLogout} />}
            />
            <Route
              path="/leaderboard"
              element={<Leaderbaord user={user} handleLogout={handleLogout} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
