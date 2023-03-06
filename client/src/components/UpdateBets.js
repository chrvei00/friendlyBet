import { updateBet, deleteBet } from "../util/api";
import { useState } from "react";

function UpdateBets(props) {
  const { bets, users } = props;

  const [responseMessage, setResponseMessage] = useState(null);

  const modifyBet = (e, bet) => {
    e.preventDefault();
    const newTitle = e.target.title.value;
    const newAuthor = e.target.author.value;
    const newDescription = e.target.description.value;
    const newOddsW = e.target.oddsW.value;
    const newOddsL = e.target.oddsL.value;
    const newDeadline = e.target.deadline.value;

    if (newTitle && bet.title !== newTitle) bet.title = newTitle;
    if (newAuthor && bet.author !== newAuthor) bet.author = newAuthor;
    if (newDescription && bet.description !== newDescription)
      bet.description = newDescription;
    if (newOddsW && bet.oddsW !== newOddsW) bet.oddsW = newOddsW;
    if (newOddsL && bet.oddsL !== newOddsL) bet.oddsL = newOddsL;
    if (newDeadline && bet.deadline !== newDeadline) bet.deadline = newDeadline;

    if (Date.parse(bet.deadline) < Date.now()) {
      setResponseMessage("Deadlinen må være i fremtiden");
      return;
    }
    updateBet(bet._id, bet)
      .then((res) => {
        console.log(res);
        setResponseMessage(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        console.log(err);
      });
  };

  const removeBet = (e, betID) => {
    e.preventDefault();
    deleteBet(betID)
      .then((res) => {
        console.log(res);
        setResponseMessage(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        console.log(err);
      });
  };

  const showAllBets = () => {
    return bets
      .filter((bet) => !bet.finished && bet.approved)
      .map((bet) => {
        return (
          <div key={bet._id} className="container py-3">
            <form onSubmit={(e) => modifyBet(e, bet)}>
              <div
                className="card"
                style={{ borderRadius: "15px 15px 0px 0px" }}
              >
                <div className="card-body">
                  <div className="py-2">
                    <h5 className="card-title fw-bold">Tittel: {bet.title}</h5>
                    <label>Ny tittel:</label>
                    <input
                      id="title"
                      type="text"
                      className="form-control mt-1"
                      placeholder="Ny tittel"
                    />
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Tittel: {bet.description}
                    </h5>
                    <label>Ny beskrivelse:</label>
                    <input
                      id="description"
                      type="text"
                      className="form-control mt-1"
                      placeholder="Ny beskrivelse"
                    />
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Author: {bet.author}{" "}
                    </h5>
                    <label>Ny author:</label>
                    <select
                      className="form-control"
                      id="author"
                      defaultValue={bet.author}
                    >
                      {users.map((user) => (
                        <option key={user.username}>{user.username}</option>
                      ))}
                    </select>
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Deadline: {bet.deadline}
                    </h5>
                    <label>Ny deadline:</label>
                    <input
                      id="deadline"
                      type="datetime-local"
                      className="form-control mt-1"
                      placeholder="Ny deadline"
                    />
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Odds for inntreff: {bet.oddsW}
                    </h5>
                    <label>Ny odds:</label>
                    <select
                      defaultValue={bet.oddsW}
                      className="form-control"
                      id="oddsW"
                    >
                      <option>1.5</option>
                      <option>2</option>
                      <option>2.5</option>
                      <option>3</option>
                      <option>3.5</option>
                      <option>4</option>
                      <option>4.5</option>
                      <option>5</option>
                      <option>7</option>
                      <option>9</option>
                      <option>15</option>
                    </select>
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Odds for ikke inntreff: {bet.oddsL}
                    </h5>
                    <label>Ny odds:</label>
                    <select
                      defaultValue={bet.oddsL}
                      className="form-control"
                      id="oddsL"
                    >
                      <option>1.5</option>
                      <option>2</option>
                      <option>2.5</option>
                      <option>3</option>
                      <option>3.5</option>
                      <option>4</option>
                      <option>4.5</option>
                      <option>5</option>
                      <option>7</option>
                      <option>9</option>
                      <option>15</option>
                    </select>
                  </div>

                  <div className="row py-3">
                    <div className="col-2">
                      <button className="btn btn-sm btn-warning" type="submit">
                        Oppdater
                      </button>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                          removeBet(e, bet._id);
                        }}
                      >
                        Slett
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      });
  };
  return (
    <>
      {responseMessage !== null ? (
        <div className="alert alert-danger py-2" role="alert">
          {responseMessage}
        </div>
      ) : null}

      {showAllBets()}
    </>
  );
}

export default UpdateBets;
