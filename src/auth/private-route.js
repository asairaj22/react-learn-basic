import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthSelector } from "./auth";

function PrivateRoute({children}) {
  const isAuth = isAuthSelector();

  return isAuth
    ? children
    : <Navigate to="/" />;
}
export default PrivateRoute;
