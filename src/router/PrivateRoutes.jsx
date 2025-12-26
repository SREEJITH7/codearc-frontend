// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { newAccessToken } from "../config/axios.config";

// const PrivateRoute = ({ Role }) => {
//   const [isChecking, setIsChecking] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     let token = Cookies.get("access_token");

//     // 1️⃣ If token exists and matches role
//     if (token && isRoleMatch(token, Role)) {
//       setIsAuth(true);
//       setIsChecking(false);
//       return;
//     }

//     // 2️⃣ Try refreshing token
//     try {
//       token = await newAccessToken();

//       if (token && isRoleMatch(token, Role)) {
//         setIsAuth(true);
//       } else {
//         setIsAuth(false);
//       }
//     } catch (error) {
//       setIsAuth(false);
//     }

//     setIsChecking(false);
//   };

//   const isRoleMatch = (token, role) => {
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.role?.toUpperCase() === role;
//     } catch (err) {
//       return false;
//     }
//   };

//   if (isChecking) {
//     return <p className="text-center">Please wait while processing...</p>;
//   }

//   if (!isAuth) {
//     return <Navigate to={`/${Role.toLowerCase()}/login`} replace />;
//   }

//   return <Outlet />;
// };

// // Export role-based wrappers
// export const UserPrivateRoutes = () => <PrivateRoute Role="USER" />;
// export const RecruiterPrivateRoutes = () => <PrivateRoute Role="RECRUITER" />;
// export const AdminPrivateRoutes = () => <PrivateRoute Role="ADMIN" />;

// ---------------------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { Navigate, Outlet } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { newAccessToken } from "../config/axios.config";
// import { axiosInstance } from "../config/axios.config";
// // import axiosInstance from "@/config/axiosInstance";   // or whatever path
// import { getAccessToken, getUserRole, isTokenValid } from "../utils/auth";


// const PrivateRoute = ({ Role }) => {
//   const [isChecking, setIsChecking] = useState(true);
//   const [isAuth, setIsAuth] = useState(false);

//   useEffect(() => {
//     checkAuth();
//   }, []);

// const checkAuth = async () => {
//   // 1. First — try current access token
//   let accessToken = Cookies.get("access_token");

//   if (accessToken && !isTokenExpired(accessToken)) {
//     setIsAuth(true);
//     setIsChecking(false);
//     return;
//   }

//   // 2. Token missing or expired → refresh
//   try {
//     await axiosInstance.post("/api/auth/refresh-token/");

//     // CRITICAL: Force browser to re-read the cookie
//     accessToken = Cookies.get("access_token");  // ← THIS LINE WAS MISSING

//     if (accessToken && !isTokenExpired(accessToken)) {
//       setIsAuth(true);
//     } else {
//       setIsAuth(false);
//     }
//   } catch (err) {
//     console.log("Refresh failed, redirecting to login");
//     setIsAuth(false);
//   } finally {
//     setIsChecking(false);
//   }
// };

//   const isRoleMatch = (token, role) => {
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.role?.toUpperCase() === role;
//     } catch (err) {
//       return false;
//     }
//   };

//   if (isChecking) {
//     return <p className="text-center">Please wait while processing...</p>;
//   }

//   if (!isAuth) {
//     return <Navigate to={`/${Role.toLowerCase()}/login`} replace />;
//   }

//   return <Outlet />;
// };

// // Export role-based wrappers
// export const UserPrivateRoutes = () => <PrivateRoute Role="USER" />;
// export const RecruiterPrivateRoutes = () => <PrivateRoute Role="RECRUITER" />;
// export const AdminPrivateRoutes = () => <PrivateRoute Role="ADMIN" />;


  // // src/routes/PrivateRoute.jsx
  // import React, { useEffect, useState } from "react";
  // import Cookies from "js-cookie";
  // import { Navigate, Outlet } from "react-router-dom";
  // import { jwtDecode } from "jwt-decode";
  // import { axiosInstance } from "../config/axios.config";

  // const isTokenExpired = (token) => {
  //   try {
  //     const decoded = jwtDecode(token);
  //     return decoded.exp * 1000 < Date.now();
  //   } catch {
  //     return true;
  //   }
  // };

  // const PrivateRoute = ({ roleRequired }) => {
  //   const [isAuthenticated, setIsAuthenticated] = useState(null);

  //   useEffect(() => {
  //     checkAuth();
  //   }, []);

  //   const checkAuth = async () => {
  //     let token = Cookies.get("access_token");

  //     // If token is valid and has correct role
  //     if (token && !isTokenExpired(token)) {
  //       const decoded = jwtDecode(token);
  //       const userRole = decoded.role || (decoded.is_admin ? "admin" : "user");
  //       if (userRole.toLowerCase() === roleRequired.toLowerCase()) {
  //         setIsAuthenticated(true);
  //         return;
  //       }
  //     }

  //     // Try refresh
  //     try {
  //       await axiosInstance.post("/api/auth/refresh-token/");
  //       token = Cookies.get("access_token"); // re-read fresh token

  //       if (token && !isTokenExpired(token)) {
  //         const decoded = jwtDecode(token);
  //         const userRole = decoded.role || (decoded.is_admin ? "admin" : "user");
  //         if (userRole.toLowerCase() === roleRequired.toLowerCase()) {
  //           setIsAuthenticated(true);
  //           return;
  //         }
  //       }
  //     } catch (err) {
  //       console.log("Refresh failed or invalid role");
  //     }

  //     setIsAuthenticated(false);
  //   };

  //   if (isAuthenticated === null) return <div className="flex justify-center items-center h-screen text-2xl">Loading...</div>;

  //   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  // };

  // export const AdminPrivateRoutes = () => <PrivateRoute roleRequired="admin" />;
  // export const UserPrivateRoutes = () => <PrivateRoute roleRequired="user" />;
  // export const RecruiterPrivateRoutes = () => <PrivateRoute roleRequired="recruiter" />;









// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
// import { newAccessToken } from "../config/axios.config";

// const PrivateRoute = ({ roleRequired }) => {
//   const [auth, setAuth] = useState(null);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     let token = Cookies.get("access_token");  // ✅ FIXED

//     if (validate(token, roleRequired)) {
//       setAuth(true);
//       return;
//     }

//     try {
//       const newToken = await newAccessToken();  // refresh
//       if (validate(newToken, roleRequired)) {
//         setAuth(true);
//         return;
//       }
//     } catch {}

//     setAuth(false);
//   };

//   const validate = (token, roleRequired) => {
//     if (!token) return false;

//     try {
//       const decoded = jwtDecode(token);
//       return decoded.role?.toLowerCase() === roleRequired.toLowerCase();
//     } catch {
//       return false;
//     }
//   };

//   if (auth === null) return <>Loading...</>;

//   if (!auth) return <Navigate to={`/${roleRequired}/login`} replace />;

//   return <Outlet />;
// };

// export const AdminPrivateRoutes = () => <PrivateRoute roleRequired="admin" />;


// export const UserPrivateRoutes = () => <PrivateRoute roleRequired="user" />;
// export const RecruiterPrivateRoutes = () => <PrivateRoute roleRequired="recruiter" />;

import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie"; // ✅ Add this import
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


