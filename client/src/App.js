import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import Bets from "./components/Bets"
import CreateBet from "./components/CreateBet"
import Leaderbaord from "./components/Leaderboard"
import Profile from "./components/Profile"
import Navbar from "./components/Nav"
import background from "./images/comeon.jpg"

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/bets" element={<Bets />} />
          <Route path="/createbet" element={<CreateBet />} />
          <Route path="/leaderboard" element={<Leaderbaord />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App