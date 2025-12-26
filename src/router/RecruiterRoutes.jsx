// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import { AdminPrivateRoutes } from "./PrivateRoutes";
// import { AdminPublicRoutes } from "./PublicRoutes";
// import { RecruiterPublicRoutes } from "./PublicRoutes";
// import RecruiterSignup from "../pages/recruiter/auth/RecruiterSignup";
// import RecruiterLogin from "../pages/recruiter/auth/RecruiterLogin";
// import RecruiterOtp from "../pages/recruiter/auth/RecruiterOtp";
// import RecruiterForgotPassword from "../pages/recruiter/auth/RecruiterForgotPassword";
// import RecruiterResetPassword from "../pages/recruiter/auth/RecruiterResetPassword";

// const RecruiterRoutes = () => {

//   return (
//     <Routes>
//       <Route element={<RecruiterPublicRoutes />}>
//         <Route path="/recruiter/signup" element={<RecruiterSignup />} />
//         <Route path="/recruiter/login" element={<RecruiterLogin />} />
//         <Route path="/recruiter/otp" element={<RecruiterOtp />} />
//         <Route
//           path="/recruiter/forgot-password"
//           element={<RecruiterForgotPassword />}
//         />
//         <Route
//           path="/recruiter/reset-password"
//           element={<RecruiterResetPassword />}
//         />
//       </Route>

//       </Routes>
//   )
// }

// export default RecruiterRoutes
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
import JobPostPage from "../pages/recruiter/recruiterPages/JobsPostPage";
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
        <Route path="/jobpost" element={<JobPostPage />} />
      </Route>

    </Routes>
  );
};

export default RecruiterRoutes;