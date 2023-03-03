import { React } from "react";
import Nav from "../components/Nav";
import axios from "axios";

const handleBet = (e) => {
  e.preventDefault();
  const body = JSON.stringify({
    amount: e.target.amount.value,
  });
  axios
    .post("/api/bet/placebet/" + e.target.id.value, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

function Bets(props) {
  const { user, bets } = props;

  const showBets = bets
    ? bets.map((bet) => (
        <div key={bet._id} className="container py-3">
          <div className="card">
            <div className="card-header">{bet.title}</div>
            <div className="card-body">
              <h5 className="card-title">{bet.title}</h5>
              <p className="card-text">Beskrivelse av hva bettet er.</p>
              <form
                onSubmit={(e) => {
                  handleBet(e);
                }}
              >
                <input id="amount" type="number" name="amount" />
                <input id="id" type="hidden" name="id" value={bet._id} />
                <button type="submit" className="btn btn-primary">
                  Send inn
                </button>
              </form>
            </div>
          </div>
        </div>
      ))
    : null;

  return (
    <>
      <Nav user={user} updateUser={props.updateUser} />
      <div className="container mb-4">
        <div className="card">
          <div className="card-header"> {user.username}</div>
          <div className="card-body">
            <p className="card-text">Cash: {user.total}</p>
            <a href="/createbet" className="btn btn-success">
              Foreslå et bet
            </a>
          </div>
        </div>
      </div>
      <div className="container-md">
        <div className="card mb-2">
          <div className="card-header">
            <h1>Dine aktive bets</h1>
          </div>
        </div>
        <div className="card mb-2 mt-4">
          <div className="card-header">
            <h1>Alle aktive bets</h1>
            {showBets}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bets;
