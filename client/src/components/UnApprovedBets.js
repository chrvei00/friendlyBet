import { updateBet, deleteBet } from "../util/api";

function UnApprovedBets(props) {
  const { bets } = props;

  const approveBet = (bet) => {
    bet.approved = true;
    updateBet(bet._id, bet)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeBet = (betID) => {
    deleteBet(betID)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showUnApprovedBets = () => {
    return bets
      .filter((bet) => !bet.approved && Date.parse(bet.deadline) > Date.now())
      .map((bet) => {
        return (
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
                <div className="row">
                  <div className="col-3">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        approveBet(bet);
                      }}
                    >
                      Godkjenn
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        removeBet(bet._id);
                      }}
                    >
                      Slett
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
  };
  return <>{showUnApprovedBets()}</>;
}

export default UnApprovedBets;
