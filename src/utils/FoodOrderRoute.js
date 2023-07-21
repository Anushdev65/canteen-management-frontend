import { Navigate, Outlet } from "react-router-dom";
import { getUserInfo } from "../localStorage/localStorage";

const FoodOrderRoute = () => {
  const user = getUserInfo();
  const roles = user?.user?.roles || [];
  const isStaffOrStudent = roles.includes("staff") || roles.includes("student");

  return isStaffOrStudent ? <Outlet /> : <Navigate to="/" />;
};

export default FoodOrderRoute;
