import React, { useEffect } from "react";
import { getLevelInfo } from "../localStorage/localStorage";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = getLevelInfo();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
