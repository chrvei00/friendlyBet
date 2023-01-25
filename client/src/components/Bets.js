import React from "react";

function getBets() {
    let bets = ["bet1", "bet2", "bet3"]
    return bets;
}

function Bets() {
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