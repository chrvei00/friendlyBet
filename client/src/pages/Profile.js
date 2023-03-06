import { React, useState } from "react";
import Nav from "../components/Nav";
import UserBets from "../components/UserBets";
import HistoricUserBets from "../components/HistoricUserBets";

function Profile(props) {
  const { user } = props;

  const [hideUserBets, setHideUserBets] = useState(true);
  const [hideHistoricUserBets, setHideHistoricUserBets] = useState(true);

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
        <div className="card text-bg-light bg-opacity-50 mb-2">
          <div className="card-header">
            <h1 className="fw-bold">Dine bets</h1>
            {}
            <button
              className="btn btn-primary"
              onClick={() => setHideUserBets(!hideUserBets)}
            >
              {hideUserBets ? "Show" : "Hide"}
            </button>
            {!hideUserBets ? <UserBets /> : null}
          </div>
        </div>
        <div className="card text-bg-light bg-opacity-50 mb-2 mt-4">
          <div className="card-header">
            <h1 className="fw-bold">Historikk</h1>
            <button
              className="btn btn-primary"
              onClick={() => setHideHistoricUserBets(!hideHistoricUserBets)}
            >
              {hideHistoricUserBets ? "Show" : "Hide"}
            </button>
            {!hideHistoricUserBets ? <HistoricUserBets user={user} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
