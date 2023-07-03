import { Navigate, Outlet } from "react-router-dom";
import { getLevelInfo, getUserInfo } from "../localStorage/localStorage";

const AdminsRoute = () => {
  // const info = getLevelInfo();
  const user = getUserInfo();
  console.log(user?.user.roles.includes("admin"));
  return user && user?.user.roles.includes("admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminsRoute;
