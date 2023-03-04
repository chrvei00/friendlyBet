import { useState } from "react";
import Nav from "../components/Nav";
import { createBet } from "../util/api";

function CreateBet(props) {
  // eslint-disable-next-line
  const [title, setTitle] = useState("");
  const [oddsW, setOddsW] = useState(1.5);
  const [oddsL, setOddsL] = useState(1.5);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(Date.now() + 1000 * 60 * 60 * 2);

  let handleSubmit = async (e) => {
    e.preventDefault();
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
          console.log("success");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Nav user={props.user} updateUser={props.updateUser} />
      <div
        className="container bg-dark bg-opacity-75"
        style={{ borderRadius: "10px" }}
      >
        <form onSubmit={handleSubmit} id="sendBet">
          <div className="form-group py-2">
            <label className="form-label text-light" htmlFor="title">
              Tittel:
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="title"
              placeholder="tittel"
            />
          </div>
          <div className="form-group py-2">
            <label className="form-label text-light" htmlFor="description">
              Beskrivelse:
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              id="description"
              placeholder="hva er ´korrekt´"
            />
          </div>
          <div className="form-group py-2">
            <label className="form-label text-light" htmlFor="oddsW">
              Odds for korrekt:
            </label>
            <select
              value={oddsW}
              onSelect={(e) => setOddsL(e.target.value)}
              onChange={(e) => setOddsW(e.target.value)}
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
          <div className="form-group py-2">
            <label className="form-label text-light" htmlFor="oddsL">
              Odds for feil:
            </label>
            <select
              value={oddsL}
              onSelect={(e) => setOddsL(e.target.value)}
              onChange={(e) => setOddsL(e.target.value)}
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
          <div className="form-group py-2">
            <label className="form-label text-light" htmlFor="oddsL">
              Frist for å spille:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="deadline"
              defaultValue={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
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
