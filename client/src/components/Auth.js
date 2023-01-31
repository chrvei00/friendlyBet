
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function Auth () {
  const navigate = useNavigate();
  
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  function handleLogin(e) {
    e.preventDefault();
  
    const form = e.target;
    const user = {
      name: form[0].value,
      password: form[1].value
    }

    fetch("/api/profile/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.token)
    })
  }

  function handleRegister(e) {
    e.preventDefault();
  
    const form = e.target;
    const user = {
      name: form[0].value,
      password: form[1].value
    }

    fetch("/api/profile/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.token)
    })
  }

  useEffect(() => {
    fetch("/api/login", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? navigate('/bets') : null)
    // eslint-disable-next-line
  }, [])

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form onSubmit={event => handleLogin(event)} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Logg inn</h3>
            <div className="text-center">
                Ny? {" "}
              <span className="link-primary" onClick={changeAuthMode}>
                registrer
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Navn</label>
              <input
                required
                type="text"
                className="form-control mt-1"
                placeholder="Fyll inn namn"
              />
            </div>
            <div className="form-group mt-3">
              <label>Hemmelig ord</label>
              <input
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
    )
  }

  return (
    <div className="Auth-form-container">
      <form onSubmit={event => handleRegister(event)} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Registrer deg</h3>
          <div className="text-center">
            Har du bruker? {" "}
            <span className="link-primary" onClick={changeAuthMode}>
              logg inn
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Namn</label>
            <input
              required
              type="text"
              className="form-control mt-1"
              placeholder="e.g Hugh Hefner"
            />
          </div>
          <div className="form-group mt-3">
            <label>Hemmelig ord - obs! passord blir ikke hashet </label>
            <input
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
  )
}

export default Auth