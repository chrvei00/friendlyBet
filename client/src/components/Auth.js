
import React, { useState } from "react"

function Auth (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Logg inn</h3>
            <div className="text-center">
                Ny? {" "}
              <span className="link-primary" onClick={changeAuthMode}>
                registrer
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Namn</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Fyll inn namn"
              />
            </div>
            <div className="form-group mt-3">
              <label>Hemmelig ord</label>
              <input
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
      <form className="Auth-form">
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
              type="text"
              className="form-control mt-1"
              placeholder="e.g Hugh Hefner"
            />
          </div>
          <div className="form-group mt-3">
            <label>Hemmelig ord - obs! passord blir ikke hashet </label>
            <input
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