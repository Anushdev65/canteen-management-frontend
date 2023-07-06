import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../localStorage/localStorage";

const AdminsRoute = () => {
  const user = getUserInfo();
  return user && user?.user?.roles.includes("admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminsRoute;
