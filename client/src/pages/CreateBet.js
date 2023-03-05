import Nav from "../components/Nav";
import { createBet } from "../util/api";
import { useState } from "react";

function CreateBet(props) {
  const [responseMessage, setResponseMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const oddsW = e.target.oddsW.value;
    const oddsL = e.target.oddsL.value;
    const description = e.target.description.value;
    const deadline = e.target.deadline.value;

    if (!title || !oddsW || !oddsL || !description || !deadline) {
      setResponseMessage("Alle felt må fylles ut");
      return;
    } else if (Date.parse(deadline) < Date.now()) {
      setResponseMessage("Deadlinen må være i fremtiden");
      return;
    } else {
      createBet(
        JSON.stringify({
          title: title,
          oddsW: oddsW,
          oddsL: oddsL,
          description: description,
          deadline: deadline,
        })
      )
        .then((res) => {
          if (res.status === 200) {
            e.target.reset();
            setResponseMessage("Sendt, venter på godkjenning fra admin");
          }
        })
        .catch((err) => {
          setResponseMessage(err.response.data.message);
        });
    }
  };

  return (
    <>
      <Nav user={props.user} updateUser={props.updateUser} />
      {responseMessage !== null ? (
        <div className="container">
          <div
            className={
              responseMessage === "Sendt, venter på godkjenning fra admin"
                ? "alert alert-success py-2"
                : "alert alert-danger py-2"
            }
            role="alert"
          >
            {responseMessage}
          </div>
        </div>
      ) : null}
      <div
        className="container bg-light text-dark bg-opacity-75"
        style={{ borderRadius: "10px" }}
      >
        <form onSubmit={handleSubmit} id="sendBet">
          <div className="form-group py-2">
            <label className="form-label" htmlFor="title">
              Tittel:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="tittel"
            />
          </div>
          <div className="form-group py-2">
            <label className="form-label" htmlFor="description">
              Beskrivelse:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="hva er ´korrekt´"
            />
          </div>
          <div className="form-group py-2">
            <label className="form-label" htmlFor="oddsW">
              Odds for korrekt:
            </label>
            <select className="form-control" id="oddsW">
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
          <div className="form-group py-2">
            <label className="form-label" htmlFor="oddsL">
              Odds for feil:
            </label>
            <select className="form-control" id="oddsL">
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
          <div className="form-group py-2">
            <label className="form-label" htmlFor="oddsL">
              Frist for å spille:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="deadline"
            />
          </div>
          <button type="submit" className="btn btn-success my-3">
            Send inn
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateBet;
