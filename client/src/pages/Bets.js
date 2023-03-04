import { React } from "react";
import Nav from "../components/Nav";
import { placeBet } from "../util/api";

const handlePlaceBet = (e) => {
  e.preventDefault();
  const body = JSON.stringify({
    betID: e.target.id.value,
    winOrLose: e.target.winOrLose.value,
    amount: e.target.amount.value,
  });
  placeBet(e.target.id.value, body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

function Bets(props) {
  const { user, bets } = props;

  const showBets = () => {
    return bets
      ? bets
          .filter((bet) => {
            return bet.approved && !bet.finished;
          })
          .map((bet) => (
            <div key={bet._id} className="container py-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{bet.title}</h5>
                  <h6 className="card-subtitle text-muted pb-3">
                    Laget av: {bet.author}
                  </h6>
                  <div className="row py-3">
                    <p className="card-text">{bet.description}</p>
                  </div>
                  <div className="row py-1">
                    <h6 className="fw-bold">Odds: </h6>
                  </div>
                  <div className="row pb-3">
                    <div className="col-3">
                      <p className="card-text">Inntreffer: {bet.oddsW}</p>
                    </div>
                    <div className="col">
                      <p className="card-text">Ikke inntreffer: {bet.oddsL}</p>
                    </div>
                  </div>
                  <p className="card-text fw-bold">Deadline: {bet.deadline}</p>
                  <form
                    onSubmit={(e) => {
                      handlePlaceBet(e);
                    }}
                    className="row bg-light g-3 pt-3"
                  >
                    <div className="row">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="winOrLose"
                          id="win"
                          value={true}
                          disabled={Date.parse(bet.deadline) > Date.now()}
                        />
                        <label className="form-check-label" htmlFor="win">
                          Inntreffer
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="winOrLose"
                          id="lose"
                          value={false}
                          disabled={Date.parse(bet.deadline) > Date.now()}
                        />
                        <label className="form-check-label" htmlFor="lose">
                          Ikke inntreffer
                        </label>
                      </div>
                    </div>
                    <label htmlFor="amount" className="form-label">
                      Hvor mye vil du satse?
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={user.total}
                      id="amount"
                      disabled={Date.parse(bet.deadline) > Date.now()}
                    />
                    <input id="id" type="hidden" name="id" value={bet._id} />
                    <button
                      type="submit"
                      className="btn btn-outline-primary"
                      disabled={Date.parse(bet.deadline) > Date.now()}
                    >
                      Send inn
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
      : null;
  };

  const getBetInformartion = (betID, currentBet) => {
    let tmp = <h1>No bet</h1>;
    user.activeBets.forEach((bet) => {
      if (bet.betID === betID) {
        tmp = (
          <div
            className="row bg-opacity-25 pt-1"
            style={{ borderRadius: "10px" }}
          >
            <div className="row pb-2">
              <h6 className="text-muted">prediksjon:</h6>
              <h6 className="fw-bold">
                {bet.winOrLose
                  ? "inntreffer: " + currentBet.oddsW
                  : "ikke inntreffer: " + currentBet.oddsL}
              </h6>
            </div>
            <div className="row pb-2">
              <h6 className="text-muted">innsats:</h6>
              <h6 className="fw-bold">{bet.amount}</h6>
            </div>
            <div>
              <h6 className="text-muted">mulig gevinst:</h6>
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
            <h1 className="fw-bold">Dine bets</h1>
            {showUserBets()}
          </div>
        </div>
        <div className="card mb-2 mt-4">
          <div className="card-header">
            <h1 className="fw-bold">Alle bets</h1>
            {showBets()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bets;
