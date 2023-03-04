import { React } from "react";
import Nav from "../components/Nav";

function Leaderbaord(props) {
  const mapLeaderboard = () => {
    return props.leaderboard.map((user, index) => {
      return (
        <div>
          <div key={user._id} className="container py-3">
            <div className="row justify-content-center">
              <div className="col-1">
                <h1>{index + 1}.</h1>
              </div>
              <div className="col-4">
                {" "}
                <div
                  className="card text-bg-dark bg-opacity-25"
                  style={{ maxWidth: "300px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{user.username}</h5>
                    <h6 className="card-subtitle pb-2">Cash: {user.total}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Nav user={props.user} updateUser={props.updateUser} />
      <div className="container">{mapLeaderboard()}</div>
    </>
  );
}

export default Leaderbaord;
