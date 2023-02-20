import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user, redirectPath = "/" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
