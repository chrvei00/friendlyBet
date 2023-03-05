import { Navigate } from "react-router-dom";
import NotApproved from "../pages/NotApproved";

export const ProtectedRouteUser = (props) => {
  if (!props.user) {
    return <Navigate to={"/"} replace />;
  } else if (!props.user.approved) {
    return <NotApproved user={props.user} updateUser={props.updateUser} />;
  }

  return props.children;
};

export const ProtectedRouteAdmin = (props) => {
  if (!props.user || !props.user.admin) {
    return <Navigate to={"/"} replace />;
  }

  return props.children;
};
