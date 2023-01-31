import {React, useEffect, useState} from "react";
import isAuth from "../services/authService";
import { Navigate } from "react-router-dom";

function Leaderbaord() {

  const [auth, setAuth] = useState(isAuth());
    
  useEffect(() => {       
      // call the function
      setAuth(() => isAuth()
        // make sure to catch any error
        .catch(console.error))
    }, [])

  console.log(auth);
  if (!auth) {
      return <Navigate to="/" />
  }
    
    return (
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
    );
}

export default Leaderbaord;