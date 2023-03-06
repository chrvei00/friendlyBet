import React, { useState, useEffect } from "react";
import { getBets, placeBet } from "../util/api";
import { DateFormat } from "../util/formats";

function LiveBets(props) {
  const { user } = props;
  const [liveBets, setLiveBets] = useState([]);
  const [bets, setBets] = useState(undefined);
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    getBets()
      .then((res) => {
        if (res.data.data) {
          setBets(res.data.data);
        } else {
          setBets(undefined);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (bets !== undefined) {
      let tmp = bets
        .filter((bet) => bet.approved && !bet.finished)
        .sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
      user.activeBets.forEach((currentBet) => {
        tmp = tmp.filter((bet) => bet._id !== currentBet.betID);
      });
      setLiveBets(tmp);
    }
  }, [bets, user]);

  const handlePlaceBet = (e) => {
    e.preventDefault();

    const betID = e.target.id.value;
    const winOrLose = e.target.winOrLose.value;
    const amount = e.target.amount.value;

    if (!betID || !winOrLose || !amount) {
      setResponseMessage("Alle felt må fylles ut");
      return;
    }
    const body = JSON.stringify({
      betID: e.target.id.value,
      winOrLose: e.target.winOrLose.value,
      amount: e.target.amount.value,
    });
    placeBet(e.target.id.value, body)
      .then((res) => {
        console.log(res);
        setResponseMessage(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {responseMessage !== null ? (
        <div className="alert alert-danger py-2" role="alert">
          {responseMessage}
        </div>
      ) : null}
      {liveBets ? (
        liveBets.map((bet) => (
          <div key={bet._id} className="container py-3">
            <div className="card text-bg-light bg-opacity-75">
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
                <div className="row py-2">
                  <p className="card-text">
                    <p className="fw-bold">Deadline: </p>
                    <p>
                      <DateFormat date={bet.deadline} />
                    </p>
                  </p>
                </div>
                {Date.parse(bet.deadline) > Date.now() ? (
                  <>
                    <h5 className="card-title fw-bold">Sats: </h5>{" "}
                    <form
                      onSubmit={(e) => {
                        handlePlaceBet(e);
                      }}
                      className="row g-3 pt-3"
                    >
                      <div className="row">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="winOrLose"
                            id="win"
                            value={true}
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
                            required
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
                      />
                      <input id="id" type="hidden" name="id" value={bet._id} />
                      <button type="submit" className="btn btn-outline-primary">
                        Send inn
                      </button>
                    </form>
                  </>
                ) : (
                  <p className="text-danger fw-bold pt-3">Deadline passert</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
}

export default LiveBets;
