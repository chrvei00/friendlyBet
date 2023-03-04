import { React } from "react";
import Nav from "../components/Nav";

function Profile(props) {
  return (
    <>
      <Nav user={props.user} updateUser={props.updateUser} />
    </>
  );
}

export default Profile;
