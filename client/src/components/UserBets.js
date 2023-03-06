import React, { useState, useEffect } from "react";
import { checkAuth, getBets } from "../util/api";

function UserBets() {
  const [userBets, setUserBets] = useState([]);
  const [bets, setBets] = useState(undefined);
  const [user, setUser] = useState(null);

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

    checkAuth()
      .then((res) => {
        if (res.data.data) {
          setUser(res.data.data);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (bets !== undefined && user !== null) {
      setUserBets(
        bets
          .filter(
            (bet) =>
              user.activeBets.filter((activeBet) => activeBet.betID === bet._id)
                .length > 0
          )
          .filter((bet) => bet.approved && !bet.finished)
      );
    }
  }, [bets, user]);

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
    return userBets.length > 0 ? (
      userBets.map((bet) => (
        <div key={bet._id} className="container py-3">
          <div className="card text-bg-light bg-opacity-75">
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
    ) : (
      <h5 className="text-danger fw-italic py-3"> Du har ingen aktive bets </h5>
    );
  };

  return (
    <>
      {bets !== undefined && user !== null ? (
        showUserBets()
      ) : (
        <div className="container py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default UserBets;
