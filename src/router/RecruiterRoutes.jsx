import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RecruiterPublicRoutes } from "./PublicRoutes";
import { RecruiterPrivateRoutes } from "./PrivateRoutes";
import LoadingFallback from "../component/common/LoadingFallback";

// Lazy load pages
const RecruiterSignup = lazy(() => import("../pages/recruiter/auth/RecruiterSignup"));
const RecruiterLogin = lazy(() => import("../pages/recruiter/auth/RecruiterLogin"));
const RecruiterOtp = lazy(() => import("../pages/recruiter/auth/RecruiterOtp"));
const RecruiterForgotPassword = lazy(() => import("../pages/recruiter/auth/RecruiterForgotPassword"));
const RecruiterResetPassword = lazy(() => import("../pages/recruiter/auth/RecruiterResetPassword"));
const RecruiterPortal = lazy(() => import("../pages/recruiter/recruiterPages/RecruiterPortalPage"));
const RecruiterProfilePage = lazy(() => import("../pages/recruiter/recruiterPages/RecruiterProfilePage"));
const JobPostPage = lazy(() => import("../pages/recruiter/recruiterPages/JobPostPage"));
const ViewAllJobs = lazy(() => import("../pages/recruiter/recruiterPages/ViewAllJobs"));
const ApplicantsPage = lazy(() => import("../pages/recruiter/recruiterPages/ApplicantsPage"));
const ApplicantProfilePage = lazy(() => import("../pages/recruiter/recruiterPages/ApplicantProfilePage"));
const SendOfferPage = lazy(() => import("../pages/recruiter/recruiterPages/SendOfferPage"));
const ShortlistedApplicantsPage = lazy(() => import("../pages/recruiter/recruiterPages/ShortlistedApplicantsPage"));
const RecruiterSubscriptionPage = lazy(() => import("../component/recruiter/RecruiterSubscriptionPage"));

const RecruiterRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
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
          <Route path="applicants" element={<ApplicantsPage />} />
          <Route path="shortlist" element={<ShortlistedApplicantsPage />} />
          <Route path="applicants-details/:applicationId" element={<ApplicantProfilePage/>} />
          <Route path="applicants-details/:applicationId/send-offer" element={<SendOfferPage />} />
          <Route path="subscription" element={<RecruiterSubscriptionPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RecruiterRoutes;