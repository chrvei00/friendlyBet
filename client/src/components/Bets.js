import {React, useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Nav from "./Nav"

function getBets() {
    let bets = ["bet1", "bet2", "bet3"]
    return bets;
}


function Bets() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        fetch("/api/login", {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setProfile(data.profile) : navigate("/"))
        // eslint-disable-next-line
      }, [])

    let bets = getBets().map( bet =>
        <div class="container">
        <div class="card">
            <div class="card-header">
                {bet}
            </div>
            <div class="card-body">
                <h5 class="card-title">{bet}</h5>
                <p class="card-text">Beskrivelse av hva bettet er.</p>
                <a href="/bets" class="btn btn-primary">Legg inn bet</a>
            </div>
        </div>
        </div>
    );
    return (
        <>
        <Nav />
        <div class="container mb-4">
        <div class="card">
        <div class="card-header">
            Profil
        </div>
        <div class="card-body">
            <h5 class="card-title">Navnet til profilen</h5>
            <p class="card-text">total gjenstående beløp</p>
            <a href="/bets" class="btn btn-success">Foreslå et bet</a>
        </div>
        </div>
        </div>
        <div class="container-md">
            <div class="card mb-2">
                <div class="card-header">
                    <h1>Dine aktive bets</h1>
                </div>
            </div>
            {bets}
            <div class="card mb-2 mt-4">
                <div class="card-header">
                    <h1>Alle aktive bets</h1>
                </div>
            </div>
            {bets}
        </div>
        </>
    )
}

export default Bets;