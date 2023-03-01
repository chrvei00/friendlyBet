import { useState } from "react";
import { Navigate } from "react-router-dom";

function Auth(props) {
  const [authMode, setAuthMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function changeAuthMode() {
    setAuthMode(!authMode);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    props.handleLogin(username, password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    props.handleRegister(username, password);
  };

  if (props.user) {
    return <Navigate to="/bets" />;
  } else if (authMode) {
    return (
      <div className="Auth-form-container">
        <form onSubmit={(e) => handleLogin(e)} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Logg inn</h3>
            <div className="text-center">
              Ny?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                registrer
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Navn</label>
              <input
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                id="name"
                required
                type="text"
                className="form-control mt-1"
                placeholder="Fyll inn namn"
              />
            </div>
            <div className="form-group mt-3">
              <label>Hemmelig ord</label>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                id="password"
                required
                type="password"
                className="form-control mt-1"
                placeholder="Fyll inn passord"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                dønski
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="Auth-form-container">
        <form onSubmit={(e) => handleRegister(e)} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Registrer deg</h3>
            <div className="text-center">
              Har du bruker?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                logg inn
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Navn</label>
              <input
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                id="name"
                required
                type="text"
                className="form-control mt-1"
                placeholder="e.g Hugh Hefner"
              />
            </div>
            <div className="form-group mt-3">
              <label>Hemmelig ord - obs! passord blir ikke hashet </label>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                id="password"
                required
                type="password"
                className="form-control mt-1"
                placeholder="passord blir ikke hashet"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                dønski
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
