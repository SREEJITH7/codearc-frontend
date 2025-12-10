import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

 
import { useAppSelector } from "../hooks";
 

/* ---------------------------------------------
   USER PUBLIC ROUTES  (no token check)
---------------------------------------------- */
export const UserPublicRoutes = () => {
  return <Outlet />;
};


/*---------------------------------------------
   RECRUITER PUBLIC ROUTES  (no token check)
---------------------------------------------- */
export const RecruiterPublicRoutes = () => {
  return <Outlet />;
};

/* ---------------------------------------------
   ADMIN PUBLIC ROUTES  (Redux-based)
---------------------------------------------- */


export const AdminPublicRoutes = () => {
  const user = useAppSelector((s) => s.auth.user);
  if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  return <Outlet />;
};

