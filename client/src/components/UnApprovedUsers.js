import { updateUser, deleteUser } from "../util/api";

function UnApprovedUsers(props) {
  const { users } = props;
  const approveUser = (user) => {
    user.approved = true;
    updateUser(user._id, user)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeUser = (userID) => {
    if (userID === props.user._id) {
      return;
    }
    deleteUser(userID)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showUnApprovedUsers = () => {
    return users
      .filter((user) => !user.approved)
      .map((user) => {
        return (
          <div key={user._id} className="container py-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-bold">{user.username}</h5>
                <h6 className="card-subtitle text-muted pb-3">
                  Cash: {user.total}
                </h6>
                <div className="row">
                  <div className="col-3">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        approveUser(user);
                      }}
                    >
                      Godkjenn
                    </button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        removeUser(user._id);
                      }}
                    >
                      Slett
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
  };
  return <>{showUnApprovedUsers()}</>;
}

export default UnApprovedUsers;
