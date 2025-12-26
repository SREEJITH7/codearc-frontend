// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { AdminPrivateRoutes } from "./PrivateRoutes";
// import { AdminPublicRoutes } from "./PublicRoutes";

// // AUTH
// import AdminLogin from "../pages/admin/auth/AdminLogin";

// // DASHBOARD
// import { AdminDashboardPage } from "../pages/admin/adminPages/DashBoardPage";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       {/* PUBLIC AUTH ROUTES */}
//       <Route element={<AdminPublicRoutes />}>
//         <Route path="/admin/login" element={<AdminLogin />} />
//       </Route>

//       {/* PRIVATE ADMIN ROUTES */}
//       <Route element={<AdminPrivateRoutes />}>
//         <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPrivateRoutes } from "./PrivateRoutes";
import { AdminPublicRoutes } from "./PublicRoutes";

// AUTH
import AdminLogin from "../pages/admin/auth/AdminLogin";

// DASHBOARD
import { AdminDashboardPage } from "../pages/admin/adminPages/DashBoardPage";
import UsersListPage from "../pages/admin/adminpages/UsersListPage";
import { RecruiterListPage } from "../pages/admin/adminpages/RecruiterListPage";



const AdminRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC AUTH ROUTES */}
      <Route element={<AdminPublicRoutes />}>
        <Route path="login" element={<AdminLogin />} /> {/* Changed from /admin/login to login */}
      </Route>

      {/* PRIVATE ADMIN ROUTES */}
      <Route element={<AdminPrivateRoutes />}>
        <Route path="dashboard" element={<AdminDashboardPage />} /> {/* Changed from /admin/dashboard to dashboard */}
        <Route path="users" element={<UsersListPage />} />
        <Route path="recruiter" element={<RecruiterListPage />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;
