import { React, useEffect, useState } from "react";
import Nav from "../components/Nav";
import UnApprovedBets from "../components/UnApprovedBets";
import UnApprovedUsers from "../components/UnApprovedUsers";
import UpdateUsers from "../components/UpdateUsers";
import UpdateBets from "../components/UpdateBets";
import { getAllUsers, getAllBets } from "../util/api";

function Admin(props) {
  const { user } = props;
  const [users, setUsers] = useState(undefined);
  const [allBets, setAllBets] = useState(undefined);
  const [hideApproveUsers, setHideApproveUsers] = useState(false);
  const [hideApproveBets, setHideApproveBets] = useState(false);
  const [hideUpdateUsers, setHideUpdateUsers] = useState(true);
  const [hideUpdateBets, setHideUpdateBets] = useState(true);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.data.data) {
        setUsers(res.data.data);
      } else {
        setUsers(undefined);
      }
    });

    getAllBets().then((res) => {
      if (res.data.data) {
        setAllBets(res.data.data);
      } else {
        setAllBets(undefined);
      }
    });
  }, []);

  return (
    <>
      <Nav user={user} updateUser={props.updateUser} />
      <div className="container mb-4">
        <div className="row">
          <div className="col">
            <h1 className="text-white fw-bold">{user.username}</h1>
          </div>
        </div>
      </div>
      <div className="container-md">
        {users !== undefined ? (
          users.filter((user) => !user.approved).length > 0 ? (
            <div className="card mb-2">
              <div className="card-header">
                <h1 className="fw-bold text-warning">Approve users</h1>
                <button
                  className="btn btn-primary"
                  onClick={() => setHideApproveUsers(!hideApproveUsers)}
                >
                  {hideApproveUsers ? "Show" : "Hide"}
                </button>
                {!hideApproveUsers ? (
                  <UnApprovedUsers user={user} users={users} />
                ) : null}
              </div>
            </div>
          ) : null
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {allBets !== undefined ? (
          allBets.filter(
            (bet) => !bet.approved && Date.parse(bet.deadline) > Date.now()
          ).length > 0 ? (
            <div className="card mb-2 mt-4">
              <div className="card-header">
                <h1 className="fw-bold text-warning">Approve bets</h1>
                <button
                  className="btn btn-primary"
                  onClick={() => setHideApproveBets(!hideApproveBets)}
                >
                  {hideApproveBets ? "Show" : "Hide"}
                </button>
                {!hideApproveBets ? <UnApprovedBets bets={allBets} /> : null}
              </div>
            </div>
          ) : null
        ) : (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div className="container-md">
        {allBets !== undefined ? (
          <div className="card mb-2">
            <div className="card-header">
              <h1 className="fw-bold text-dark">Update bets</h1>
              <button
                className="btn btn-primary"
                onClick={() => setHideUpdateBets(!hideUpdateBets)}
              >
                {hideUpdateBets ? "Show" : "Hide"}
              </button>
              {!hideUpdateBets ? (
                allBets !== undefined ? (
                  <UpdateBets user={user} users={users} bets={allBets} />
                ) : (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <div className="container-md">
        {users !== undefined ? (
          <div className="card mb-2">
            <div className="card-header">
              <h1 className="fw-bold text-dark">Update users</h1>
              <button
                className="btn btn-primary"
                onClick={() => setHideUpdateUsers(!hideUpdateUsers)}
              >
                {hideUpdateUsers ? "Show" : "Hide"}
              </button>
              {!hideUpdateUsers ? (
                users !== undefined ? (
                  <UpdateUsers user={user} users={users} />
                ) : (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Admin;
