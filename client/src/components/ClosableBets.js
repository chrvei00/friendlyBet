import React, { useState, useEffect } from "react";
import { getBets, closeBet } from "../util/api";

function ClosableBets(props) {
  const { user } = props;
  const [bets, setBets] = useState([]);
  const [closableBets, setClosableBets] = useState([]);
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
      setClosableBets(
        bets.filter(
          (bet) =>
            !bet.finished &&
            bet.approved &&
            Date.parse(bet.deadline) < Date.now()
        )
      );
    }
  }, [bets, user]);

  const handleCloseBet = (e, bet) => {
    e.preventDefault();
    if (bet.finished || Date.parse(bet.deadline) > Date.now()) {
      setResponseMessage(
        "Bettet er allerede avsluttet, eller deadlinen er ikke passert"
      );
      return;
    } else if (!e.target.winOrLose.value) {
      setResponseMessage("Du må velge om bettet ble innfridd eller ikke");
      return;
    } else {
      bet.winOrLose = e.target.winOrLose.value === "true";
      bet.finished = true;
      bet.finishedDate = Date.now();
      bet.closedBy = user.username;
      closeBet(bet._id, bet)
        .then((res) => {
          console.log(res);
          setResponseMessage(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          setResponseMessage(err.response.data.message);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container">
        {responseMessage !== null ? (
          <div className="alert alert-danger py-2" role="alert">
            {responseMessage}
          </div>
        ) : null}
        {bets !== undefined && user !== null ? (
          closableBets.map((bet) => (
            <form
              key={bet._id}
              className="py-3"
              onSubmit={(e) => {
                handleCloseBet(e, bet);
              }}
            >
              <div className="card">
                <div className="card-body">
                  <div className="py-2">
                    <h5 className="card-subtitle">Tittel: {bet.title}</h5>
                  </div>
                  <div className="py-1">
                    <h5 className="card-subtitle">Author: {bet.author} </h5>
                  </div>
                  <div className="py-2">
                    <h5 className="card-subtitle">
                      Beskrivelse: {bet.description}
                    </h5>
                  </div>
                  <div className="py-2">
                    <label>Inntraff betet?</label>
                    <select className="form-control" id="winOrLose">
                      <option>true</option>
                      <option>false</option>
                    </select>{" "}
                  </div>
                  <div className="py-2">
                    <button className="btn btn-sm btn-success" type="submit">
                      Close bet
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ))
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}

export default ClosableBets;
