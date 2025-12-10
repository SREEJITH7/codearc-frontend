
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
        
        {/* ✅ FIXED: Match Django's redirect URL */}
        {/* <Route path="auth/google/callback" element={<GoogleCallback />} /> */}
      </Route>

      {/* ✅ FIXED: Private routes are now separate, not nested in public */}
      <Route element={<UserPrivateRoutes />}>
        <Route path="user/home" element={<UserHomePage />} />
        <Route path="user/profile" element={<UserProfilePage />} />
      </Route>
    </Routes>
  );
}