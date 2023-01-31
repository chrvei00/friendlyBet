import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [authMode, setAuthMode] = useState(false);
    let [profile, setProfile] = useState({name: "noname", total: 0});

    let handleLogin = async (e) => {
        e.preventDefault();
        let profile = JSON.stringify({
            name: name,
            password: password
        })
        try {
            let res = await fetch("/api/profile/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: profile,
            });
        await res.json();
        if (res.status === 200) {
            setAuthMode(true);
            setProfile(res.body);
            console.log("logged in succesfully to: ");
            console.log(profile);
          }
        } catch (err) {
          console.log(err);
        }

    }

    if (authMode) {
        return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark mb-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="/bets">firendlyBet</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/bets">Bets</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/createbet">Create bet</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/leaderboard">Leaderboard</a>
                </li>
            </ul>
            </div>
            <div>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <p>{profile.name}</p>
                        </li>
                        <li class="nav-item">
                            <p>{profile.total}</p>
                        </li>
                    </ul>
                </div>
                </div>
        </nav> );
    } else {

        return(
<nav class="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark mb-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="/bets">firendlyBet</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/bets">Bets</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/createbet">Create bet</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="/leaderboard">Leaderboard</a>
                </li>
            </ul>
            </div>
                <div>
                <form onSubmit={handleLogin} class="d-flex" role="search">
                    <input value={name} onChange={(e) => setName(e.target.value)} class="form-control me-2" type="text" placeholder="navn" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} class="form-control me-2" type="password" placeholder="passord" />
                    <button class="btn btn-outline-success" type="submit">Logg inn</button>
                </form>
                </div>
        </div>
        </nav>

        );
    }


}

export default Navbar;