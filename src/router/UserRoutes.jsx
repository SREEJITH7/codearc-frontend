import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { UserPrivateRoutes } from './PrivateRoutes'; // ✅ Import this
import { UserPublicRoutes } from "./PublicRoutes";
import LoadingFallback from "../component/common/LoadingFallback";

// Lazy load pages
const UserHomePage = lazy(() => import("../pages/user/userpages/UserHomePage"));
const UserLandingPage = lazy(() => import("../pages/user/userpages/UserLandingPage"));
const UserSignup = lazy(() => import("../pages/user/auth/UserSignup"));
const UserOtp = lazy(() => import("../pages/user/auth/UserOtp").then(m => ({ default: m.UserOtp })));
const UserLogin = lazy(() => import("../pages/user/auth/UserLogin"));
const UserForgotPassword = lazy(() => import("../pages/user/auth/UserForgotPassword"));
const UserResetPassword = lazy(() => import("../pages/user/auth/UserResetPassword").then(m => ({ default: m.UserResetPassword })));
const UserProfilePage = lazy(() => import("../pages/user/userpages/UserProfilePage"));
const SingleProblemPage = lazy(() => import("../pages/user/userpages/SingleProblemPage"));
const JobDetailsPage = lazy(() => import("../pages/user/userpages/JobDetailsPage"));
const JobApplyPage = lazy(() => import("../pages/user/userpages/JobApplyPage"));
const UserApplicationPage = lazy(() => import("../pages/user/userpages/UserApplicationPage"));
const ApplicationTrackingPage = lazy(() => import("../pages/user/userpages/ApplicationTrackingPage"));
const AiChatPage = lazy(() => import("../component/ai/AiChatPage"));
const SubscriptionPage = lazy(() => import("../pages/SubscriptionPage"));

 
export default function UserRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<UserPublicRoutes />}>
          <Route path="/" element={<UserLandingPage/>}/>
          <Route path="user/signup" element={<UserSignup />} />
          <Route path="user/login" element={<UserLogin />} />
          <Route path="user/forgot-password" element={<UserForgotPassword />} />
          <Route path="user/reset-password" element={<UserResetPassword />} />
          <Route path="user/otp" element={<UserOtp />} />
          
          {/* Match Django's redirect URL */}
          {/* <Route path="auth/google/callback" element={<GoogleCallback />} /> */}
        </Route>

        {/* Private routes are now separate, not nested in public */}
        <Route element={<UserPrivateRoutes />}>
          <Route path="user/home" element={<UserHomePage />} />
          <Route path="user/profile" element={<UserProfilePage />} />
          <Route path="user/singleproblem/:problemId" element={<SingleProblemPage />} />
          <Route path="user/jobdetails" element={<JobDetailsPage/>} />
          <Route path="user/job-apply/:jobId" element={<JobApplyPage />} />
          <Route path="user/applications/:jobId" element={<UserApplicationPage />} />
          <Route path="user/application-tracking/:jobId" element={<ApplicationTrackingPage />} />
          <Route path="user/ai-tutor" element={<AiChatPage />} />
          <Route path="user/subscription" element={<SubscriptionPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}