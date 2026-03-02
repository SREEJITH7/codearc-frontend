import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoadingOverlay from "./component/common/LoadingOverlay";
import { useAppSelector } from "./hooks";

// 🔥 Lazy load route groups
const UserRoutes = lazy(() => import("./router/UserRoutes"));
const RecruiterRoutes = lazy(() => import("./router/RecruiterRoutes"));
const AdminRoutes = lazy(() => import("./router/AdminRoutes"));

export default function App() {
  const { loading, loadingMessage } = useAppSelector(
    (state) => state.auth
  );

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading && (
        <LoadingOverlay message={loadingMessage || "Please wait..."} />
      )}

      {/* Suspense wraps lazy components */}
      <Suspense fallback={<LoadingOverlay message="Loading..." />}>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/recruiter/*" element={<RecruiterRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}