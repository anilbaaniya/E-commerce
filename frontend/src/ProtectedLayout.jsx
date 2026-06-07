import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedLayout() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
