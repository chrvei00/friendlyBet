import { React } from "react";
import Nav from "../components/Nav";

function Admin(props) {
  return (
    <>
      <Nav />
      <div className="container">
        <h1>{props.user.username}</h1>
      </div>
    </>
  );
}

export default Admin;
