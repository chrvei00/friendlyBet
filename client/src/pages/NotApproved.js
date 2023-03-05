import Nav from "../components/Nav";
import { checkAuth } from "../util/api";

function NotApproved(props) {
  const handleRefresh = () => {
    checkAuth()
      .then((res) => {
        if (res.data.data) {
          props.updateUser(res.data.data);
        } else {
          props.updateUser(null);
        }
      })
      .catch((err) => {
        //Do nothing
      });

    window.location.reload();
  };
  return (
    <>
      <Nav user={props.user} updateUser={props.updateUser} />
      <div className="container">
        <div className="alert alert-danger py-3" role="alert">
          <h1 className="fs-3 fw-bold">Du er ikke godkjent av admin 😢 </h1>{" "}
          <p className="fs-5">
            Vennligst vent på godkjenning eller logg inn med en annen bruker 🫠{" "}
          </p>
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}

export default NotApproved;
