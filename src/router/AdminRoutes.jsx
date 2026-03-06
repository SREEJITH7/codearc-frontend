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
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPrivateRoutes } from "./PrivateRoutes";
import { AdminPublicRoutes } from "./PublicRoutes";
import LoadingFallback from "../component/common/LoadingFallback";

// AUTH
const AdminLogin = lazy(() => import("../pages/admin/auth/AdminLogin"));

// DASHBOARD
const AdminDashboardPage = lazy(() => import("../pages/admin/adminpages/AdminDashboardPage"));
const UsersListPage = lazy(() => import("../pages/admin/adminpages/UsersListPage"));
const RecruiterListPage = lazy(() => import("../pages/admin/adminpages/RecruiterListPage").then(m => ({ default: m.RecruiterListPage })));
const ApplicantsListPage = lazy(() => import("../pages/admin/adminpages/ApplicantsListPage"));
const ProblemsListPage = lazy(() => import("../pages/admin/adminpages/ProblemsListPage").then(m => ({ default: m.ProblemsListPage })));
const ProblemAddingPage = lazy(() => import("../pages/admin/adminpages/ProblemAddingPage"));
const ProblemEditPage = lazy(() => import("../pages/admin/adminpages/ProblemEditPage"));
const CategoriesListPage = lazy(() => import("../pages/admin/adminpages/CategoriesListPage").then(m => ({ default: m.CategoriesListPage })));
const CategoryAddingPage = lazy(() => import("../pages/admin/adminpages/CategoryAddingPage"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* PUBLIC AUTH ROUTES */}
        <Route element={<AdminPublicRoutes />}>
          <Route path="login" element={<AdminLogin />} /> {/* Changed from /admin/login to login */}
        </Route>

        {/* PRIVATE ADMIN ROUTES */}
        <Route element={<AdminPrivateRoutes />}>
          <Route path="dashboard" element={<AdminDashboardPage />} /> 
          <Route path="users" element={<UsersListPage />} />
          <Route path="applicants" element={<ApplicantsListPage />} />
          <Route path="recruiter" element={<RecruiterListPage />} />
          <Route path="problems" element={<ProblemsListPage />} />
          <Route path="addproblems" element={<ProblemAddingPage/>} />
          <Route path="problems/edit/:problemId" element={<ProblemEditPage/>} />
          <Route path="problemcategory" element={<CategoriesListPage/>}/>
          <Route path="addproblemcategory" element={<CategoryAddingPage/>} />
          <Route path="problemcategory/edit/:id" element={<CategoryAddingPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
