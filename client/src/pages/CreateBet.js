import { useState } from "react";
import Nav from "../components/Nav";

function CreateBet(props) {
  // eslint-disable-next-line
  const [title, setTitle] = useState("");
  const [oddsW = 1.5, setOddsW] = useState("");
  const [oddsL = 1.5, setOddsL] = useState("");
  const [description, setDescription] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api/bet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          oddsW: oddsW,
          oddsL: oddsL,
          description: description,
          author: props.user.name,
        }),
      });
      await res.json();
      if (res.status === 200) {
        setTitle("Bet sendt inn");
        setOddsW("");
        setOddsL("U");
        setDescription("");
      } else {
        setTitle("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />
      <div className="container bg-dark">
        <form onSubmit={handleSubmit} id="sendBet">
          <div className="form-group py-2">
            <label className="form-label text-light" for="title">
              Tittel:
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="title"
              placeholder="skriv en tittel"
            />
          </div>
          <div className="form-group py-2">
            <label className="form-label text-light" for="description">
              Description:
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              id="description"
              placeholder="hva er bettet"
            />
          </div>
          <div className="form-group py-2">
            <label className="form-label text-light" for="oddsW">
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
            <label className="form-label text-light" for="oddsL">
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
          <button type="submit" className="btn btn-primary my-3">
            Send inn
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateBet;
