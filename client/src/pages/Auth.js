import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
const { login, register, checkAuth } = require("../util/api");

function Auth(props) {
  const { updateUser } = props;
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username: username, password: password })
      .then((res) => {
        if (res.status === 201) {
          setError(res.data.message);
          props.updateUser(res.data.data);
          window.location.reload();
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register({ username: username, password: password })
      .then((res) => {
        if (res.status === 201) {
          setError(res.data.message);
          props.updateUser(res.data.data);
          window.location.reload();
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response);
      });
  };

  const [authMode, setAuthMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkAuth()
      .then((res) => {
        updateUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [updateUser]);

  function changeAuthMode() {
    setAuthMode(!authMode);
  }

  if (props.user) {
    return <Navigate to="/bets" />;
  } else if (authMode) {
    return (
      <div
        className="container-fluid bg-dark text-white bg-opacity-75"
        style={{
          maxWidth: 350,
          borderRadius: 10,
          marginTop: 100,
          padding: 20,
          position: "relative",
        }}
      >
        <h3 className="text-center">Logg inn</h3>

        <div className="text-center">
          Ny?{" "}
          <button
            className="btn btn-sm btn-outline-light fw-bold"
            onClick={changeAuthMode}
          >
            Registrer deg
          </button>
        </div>
        <form onSubmit={(e) => handleLogin(e)}>
          <div>
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
              <button type="submit" className="btn btn-success">
                Logg inn
              </button>
              <p className="text-danger fw-bold">{error}</p>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div
        className="container-fluid bg-dark text-white bg-opacity-50"
        style={{
          maxWidth: 350,
          borderRadius: 10,
          marginTop: 100,
          padding: 20,
          position: "relative",
        }}
      >
        <h3 className="text-center">Registrer deg</h3>
        <div className="text-center">
          Har du bruker?{" "}
          <button
            className="btn btn-sm btn-outline-light fw-bold"
            onClick={changeAuthMode}
          >
            Logg inn
          </button>
        </div>
        <form onSubmit={(e) => handleRegister(e)}>
          <div>
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
              <button type="submit" className="btn btn-success">
                Registrer
              </button>
              <p className="text-danger fw-bold">{error}</p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
