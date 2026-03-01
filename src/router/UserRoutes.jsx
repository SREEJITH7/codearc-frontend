
// -----------------------------------
import { Routes, Route } from "react-router-dom";
import { UserPrivateRoutes } from './PrivateRoutes'; // ✅ Import this
import { UserPublicRoutes } from "./PublicRoutes";
import UserHomePage from "../pages/user/userpages/UserHomePage";
import UserLandingPage from "../pages/user/userpages/UserLandingPage"
import UserSignup from "../pages/user/auth/UserSignup";
import { UserOtp } from "../pages/user/auth/UserOtp";
import UserLogin from "../pages/user/auth/UserLogin";
import UserForgotPassword from "../pages/user/auth/UserForgotPassword";
import { UserResetPassword } from "../pages/user/auth/UserResetPassword";
// import GoogleCallback from "../pages/user/auth/GoogleCallback";
import UserProfilePage from "../pages/user/userpages/UserProfilePage";
import SingleProblemPage from "../pages/user/userpages/SingleProblemPage";
import JobDetailsPage from "../pages/user/userpages/JobDetailsPage";
import JobApplyPage from "../pages/user/userpages/JobApplyPage";
import UserApplicationPage from "../pages/user/userpages/UserApplicationPage";
import ApplicationTrackingPage from "../pages/user/userpages/ApplicationTrackingPage";

import AiChatPage from "../component/ai/AiChatPage";
import SubscriptionPage from "../pages/SubscriptionPage";

 
export default function UserRoutes() {
  return (
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
  );
}