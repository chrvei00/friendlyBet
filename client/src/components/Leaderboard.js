import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav"

function Leaderbaord() {

  const navigate = useNavigate();
  // eslint-disable-next-line
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

    
    return (
      <>
      <Nav />
        <div class="container">
    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Navn</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
  </tbody>
</table>
</div>
</>
    );
}

export default Leaderbaord;