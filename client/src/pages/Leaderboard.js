import { React } from "react";
import Nav from "../components/Nav";

function Leaderbaord(props) {
  return (
    <>
      <Nav user={props.user} updateUser={props.updateUser} />
      <div className="container">
        <h1>{props.user.username}</h1>
      </div>
    </>
  );
}

export default Leaderbaord;
