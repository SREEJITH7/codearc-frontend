
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";  
import { useAppSelector } from "../hooks";

/* ---------------------------------------------
   ADMIN PRIVATE ROUTES
---------------------------------------------- */
export const AdminPrivateRoutes = () => {
  const user = useAppSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.role !== "admin") return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
};

/* ---------------------------------------------
   USER PRIVATE ROUTES
---------------------------------------------- */
export const UserPrivateRoutes = () => {
  const user = useAppSelector((s) => s.auth.user);
  if(!user){
    return <Navigate to="/user/login/"/>
  }
  return <Outlet />;
};

/* ---------------------------------------------
   RECRUITER PRIVATE ROUTES
---------------------------------------------- */
export const RecruiterPrivateRoutes = () => {
  const recruiter = useAppSelector((s) => s.auth.user);
  const token = Cookies.get("access_token");

  if (!recruiter) {
    return <Navigate to="/recruiter/login" replace />;
  }

  if (recruiter.role !== "recruiter") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};


