import { Navigate, Outlet } from "react-router-dom";
import { getLevelInfo } from "../localStorage/localStorage";

const ProtectedRoutes = () => {
  const info = getLevelInfo();
  return info && info.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
