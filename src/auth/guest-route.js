import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthSelector } from "./auth";

function GuestRoute({children}) {
    const isAuth = isAuthSelector();
    console.log(isAuth);

  return isAuth
    ? <Navigate to="/" />
    : children;
}

export default GuestRoute;
