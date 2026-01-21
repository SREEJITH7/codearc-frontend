import React from "react";
import { Route, Routes } from "react-router-dom";
import { RecruiterPublicRoutes } from "./PublicRoutes";
import RecruiterSignup from "../pages/recruiter/auth/RecruiterSignup";
import RecruiterLogin from "../pages/recruiter/auth/RecruiterLogin";
import RecruiterOtp from "../pages/recruiter/auth/RecruiterOtp";
import RecruiterForgotPassword from "../pages/recruiter/auth/RecruiterForgotPassword";
import RecruiterResetPassword from "../pages/recruiter/auth/RecruiterResetPassword";
import RecruiterPortal from "../pages/recruiter/recruiterPages/RecruiterPortalPage";
import RecruiterProfilePage from "../pages/recruiter/recruiterPages/RecruiterProfilePage";
import { RecruiterPrivateRoutes } from "./PrivateRoutes";
import JobPostPage from "../pages/recruiter/recruiterPages/JobPostPage";
import ViewAllJobs from "../pages/recruiter/recruiterPages/ViewAllJobs";

const RecruiterRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route element={<RecruiterPublicRoutes />}>
        <Route path="signup" element={<RecruiterSignup />} />
        <Route path="login" element={<RecruiterLogin />} />
        <Route path="otp" element={<RecruiterOtp />} />
        <Route path="forgot-password" element={<RecruiterForgotPassword />} />
        <Route path="reset-password" element={<RecruiterResetPassword />} />
      </Route>

      {/* ================= PRIVATE ROUTES ================= */}
      <Route element={<RecruiterPrivateRoutes />}>
        <Route path="portal" element={<RecruiterPortal />} />
        <Route path="profile" element={<RecruiterProfilePage />} />
        <Route path="jobpost" element={<JobPostPage />} />
        <Route path="viewallpost" element={<ViewAllJobs />} />
      </Route>
    </Routes>
  );
};

export default RecruiterRoutes;