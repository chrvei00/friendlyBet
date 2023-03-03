import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteUser = ({ user, redirectPath = "/" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const ProtectedRouteAdmin = ({ user, redirectPath = "/bets" }) => {
  if (!user || !user.admin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
