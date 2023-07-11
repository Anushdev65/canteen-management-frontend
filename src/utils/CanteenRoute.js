import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../localStorage/localStorage";

const CanteenRoute = () => {
  const user = getUserInfo();
  return user && user?.user?.roles.includes("canteen") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default CanteenRoute;
