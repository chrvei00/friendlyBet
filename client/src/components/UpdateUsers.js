import { updateUser, deleteUser } from "../util/api";
import { useState, useEffect } from "react";
import { getBets } from "../util/api";

function UpdateUsers(props) {
  const { users } = props;
  const [bets, setBets] = useState(undefined);

  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    getBets()
      .then((res) => {
        if (res.data.data) {
          setBets(res.data.data);
        } else {
          setBets(undefined);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const modifyUser = (e, user) => {
    e.preventDefault();
    const newName = e.target.name.value;
    const newTotal = e.target.total.value;

    if (newName && user.username !== newName) {
      user.username = newName;
    }
    if (newTotal && user.total !== newTotal) {
      user.total = newTotal;
    }

    updateUser(user._id, user)
      .then((res) => {
        setResponseMessage(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        console.log(err);
      });
  };

  const removeUser = (e, userID) => {
    e.preventDefault();
    if (userID === props.user._id) {
      setResponseMessage("Du kan ikke slette deg selv");
      return;
    }
    deleteUser(userID)
      .then((res) => {
        setResponseMessage(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        console.log(err);
      });
  };

  const showAllUsers = () => {
    return users.length > 0 ? (
      users.map((user) => {
        return (
          <div key={user._id} className="container py-3">
            <form
              onSubmit={(e) => {
                modifyUser(e, user);
              }}
            >
              <div className="card">
                <div className="card-body">
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Navn: {user.username}
                    </h5>
                    <label>Nytt navn:</label>
                    <input
                      id="name"
                      type="text"
                      className="form-control mt-1"
                      placeholder="Nytt navn"
                    />
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">Cash: {user.total} </h5>
                    <label>Ny total:</label>
                    <input
                      id="total"
                      type="number"
                      className="form-control mt-1"
                      placeholder="Ny total"
                    />
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Admin: {"" + user.admin}{" "}
                    </h5>
                    <label>Velg admin rettigheter:</label>
                    <select
                      className="form-control"
                      id="admin"
                      defaultValue={user.admin}
                    >
                      <option>true</option>
                      <option>false</option>
                    </select>
                  </div>
                  <div className="py-2">
                    <h5 className="card-title fw-bold">
                      Approved: {"" + user.approved}
                    </h5>
                    <label>Velg approved:</label>
                    <select
                      className="form-control"
                      id="approved"
                      defaultValue={user.approved}
                    >
                      <option>true</option>
                      <option>false</option>
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <button
                        className="btn btn-sm btn-warning"
                        type="submit"
                        onClick={() => {
                          modifyUser(user);
                        }}
                      >
                        Oppdater
                      </button>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                          removeUser(e, user._id);
                        }}
                      >
                        Slett
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      })
    ) : (
      <h5 className="text-danger fw-italic py-3">
        Det finnes ingen bets som kan oppdateres
      </h5>
    );
  };
  return (
    <>
      {responseMessage !== null ? (
        <div className="alert alert-danger py-2" role="alert">
          {responseMessage}
        </div>
      ) : null}

      {bets !== undefined ? (
        showAllUsers()
      ) : (
        <div className="container py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateUsers;
