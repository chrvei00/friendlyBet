import { React } from "react";
import Nav from "../components/Nav";

function Bets(props) {
  console.log(props.bets);
  const showBets = props.bets.map((bet) => (
    <div className="container py-3">
      <div className="card">
        <div className="card-header">{bet.title}</div>
        <div className="card-body">
          <h5 className="card-title">{bet.title}</h5>
          <p className="card-text">Beskrivelse av hva bettet er.</p>
          <a href="/createbet" className="btn btn-primary">
            Legg inn bet
          </a>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <Nav />
      <div className="container mb-4">
        <div className="card">
          <div className="card-header"> {props.user.username}</div>
          <div className="card-body">
            <p className="card-text">Cash: {props.user.total}</p>
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
