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

const RecruiterRoutes = () => {
  return (
    <Routes>
      <Route element={<RecruiterPublicRoutes />}>
        <Route path="signup" element={<RecruiterSignup />} /> {/* Changed from /recruiter/signup */}
        <Route path="login" element={<RecruiterLogin />} /> {/* Changed from /recruiter/login */}
        <Route path="otp" element={<RecruiterOtp />} /> {/* Changed from /recruiter/otp */}
        <Route path="forgot-password" element={<RecruiterForgotPassword />} />
        <Route path="reset-password" element={<RecruiterResetPassword />} />
      </Route>
    </Routes>
  );
};

export default RecruiterRoutes;