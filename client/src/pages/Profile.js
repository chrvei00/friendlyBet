import { React } from "react";
import Nav from "../components/Nav";

function Profile(props) {
  const { user, bets } = props;

  const getBetInformartion = (betID, currentBet) => {
    let tmp = <h1>Ingen bets</h1>;
    user.activeBets.forEach((bet) => {
      if (bet.betID === betID) {
        tmp = (
          <div
            className="row bg-opacity-25 pt-1"
            style={{ borderRadius: "10px" }}
          >
            <div className="row pb-2">
              <h6 className="text-muted">Prediksjon:</h6>
              <h6 className="fw-bold">
                {bet.winOrLose
                  ? "inntreffer: " + currentBet.oddsW
                  : "ikke inntreffer: " + currentBet.oddsL}
              </h6>
            </div>
            <div className="row pb-2">
              <h6 className="text-muted">Innsats:</h6>
              <h6 className="fw-bold">{bet.amount}</h6>
            </div>
            <div>
              <h6 className="text-muted">Mulig gevinst:</h6>
              <h6 className="fw-bold">
                {bet.winOrLose
                  ? currentBet.oddsW * bet.amount
                  : currentBet.oddsL * bet.amount}
              </h6>
            </div>
          </div>
        );
      }
    });
    return tmp;
  };

  const getHistoricBetInformartion = (betID, currentBet) => {
    let tmp;
    user.prevBets.forEach((bet) => {
      if (bet.betID === betID) {
        tmp = (
          <div
            className="row bg-opacity-25 pt-1"
            style={{ borderRadius: "10px" }}
          >
            <div className="row pb-2">
              <h6 className="text-muted">Prediksjon:</h6>
              <h6 className="fw-bold">
                {bet.winOrLose
                  ? "inntreffer: " + currentBet.oddsW
                  : "ikke inntreffer: " + currentBet.oddsL}
              </h6>
            </div>
            <div className="row pb-2">
              <h6 className="text-muted">Innsats:</h6>
              <h6 className="fw-bold">{bet.amount}</h6>
            </div>
            <div>
              <h6 className="text-muted">Mulig gevinst:</h6>
              <h6 className="fw-bold">
                {bet.winOrLose
                  ? currentBet.oddsW * bet.amount
                  : currentBet.oddsL * bet.amount}
              </h6>
            </div>
            <div>
              <h6 className="text-muted">Profit:</h6>
              <h6
                className={
                  bet.profit > 0
                    ? "fw-bold text-success"
                    : "fw-bold text-danger"
                }
              >
                {bet.profit}
              </h6>
            </div>
          </div>
        );
      }
    });
    return tmp;
  };

  const showHistoricBets = () => {
    return bets
      ? bets
          .filter(
            (bet) =>
              user.prevBets.filter((activeBet) => activeBet.betID === bet._id)
                .length > 0
          )
          .map((bet) => (
            <div key={bet._id} className="container py-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{bet.title}</h5>
                  <h6 className="card-subtitle text-muted pb-2">
                    Author: {bet.author}
                  </h6>
                  <p className="card-text">{bet.description}</p>
                  {getHistoricBetInformartion(bet._id, bet)}
                </div>
              </div>
            </div>
          ))
      : null;
  };
  const showUserBets = () => {
    return bets
      ? bets
          .filter(
            (bet) =>
              user.activeBets.filter((activeBet) => activeBet.betID === bet._id)
                .length > 0
          )
          .map((bet) => (
            <div key={bet._id} className="container py-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{bet.title}</h5>
                  <h6 className="card-subtitle text-muted pb-2">
                    Author: {bet.author}
                  </h6>
                  <p className="card-text">{bet.description}</p>
                  {getBetInformartion(bet._id, bet)}
                </div>
              </div>
            </div>
          ))
      : null;
  };
  return (
    <>
      <Nav user={user} updateUser={props.updateUser} />
      <div className="container mb-4">
        <div className="row">
          <div className="col">
            <h1 className="text-white fw-bold">{props.user.username}</h1>
            <p className="text-white fw-bold">Cash: {props.user.total}</p>
          </div>
        </div>
      </div>
      <div className="container-md">
        <div className="card mb-2">
          <div className="card-header">
            <h1 className="fw-bold">Aktive bets</h1>
            {showUserBets()}
          </div>
        </div>
        <div className="card mb-2 mt-4">
          <div className="card-header">
            <h1 className="fw-bold">Historikk</h1>
            {showHistoricBets()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
