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

import { ProblemsListPage } from "../pages/admin/adminpages/ProblemsListPage";
import ProblemAddingPage from "../pages/admin/adminpages/ProblemAddingPage";
import { CategoriesListPage } from "../pages/admin/adminpages/CategoriesListPage";
import CategoryAddingPage from "../pages/admin/adminpages/CategoryAddingPage";

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
        <Route path="problems" element={<ProblemsListPage />} />
        <Route path="addproblems" element={<ProblemAddingPage/>} />
        <Route path="problemcategory" element={<CategoriesListPage/>}/>
        <Route path="addproblemcategory" element={<CategoryAddingPage/>} />
        <Route path="problemcategory/edit/:id" element={<CategoryAddingPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
