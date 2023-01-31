import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Bets from "./components/Bets"
import CreateBet from "./components/CreateBet"
import Leaderbaord from "./components/Leaderboard"
import Navbar from "./components/Nav"
// import background from "./images/comeon.jpg"

function App() {
  return (
    // <div style={{ backgroundImage: `url(${background})` }}>
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bets />} />
          <Route path="/createbet" element={<CreateBet />} />
          <Route path="/leaderboard" element={<Leaderbaord />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App