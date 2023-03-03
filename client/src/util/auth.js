import { Navigate } from "react-router-dom";

export const ProtectedRouteUser = (props) => {
  if (!props.user) {
    return <Navigate to={"/"} replace />;
  }

  return props.children;
};

export const ProtectedRouteAdmin = (props) => {
  if (!props.user || !props.user.admin) {
    return <Navigate to={"/"} replace />;
  }

  return props.children;
};
