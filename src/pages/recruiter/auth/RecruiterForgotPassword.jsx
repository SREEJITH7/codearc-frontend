// import React from 'react';
// import ForgotePassword from '../../../component/auth/ForgotePassword';
// import { recruiterAuthService } from '../../../service/RecruiterAuth';
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const UserForgotPassword = () => {
//   const navigate = useNavigate();

//   const handleForgotSubmit = async (email) => {
//     if (!email.trim()) {
//       toast.error("Email is required");
//       return;
//     }

//     const res = await recruiterAuthService.checkUserExists(email);

//     if (res.success) {
//       toast.success("User exists. Please set a new password.");
//       navigate("/recruiter/otp", { state: { email, purpose: "FORGOT_PASSWORD" } });
//     } else {
//       toast.error(res.message || "User not found.");
//     }
//   };

//   return (
//     <ForgotePassword
//       role="RECRUITER"
//       auth="Login"
//       onSubmit={handleForgotSubmit}
//     />
//   );
// };

// export default UserForgotPassword;

import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { recruiterAuthService } from "../../../services/RecruiterAuth";

import ForgotPassword from "../../../component/auth/ForgotPassword";

const RecruiterForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotSubmit = async (email) => {
        console.log("=== FORGOT PASSWORD SUBMIT CALLED ===");
    console.log("Email received:", email);
    console.log("Email type:", typeof email);
    console.log("Email trimmed:", email?.trim());

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    console.log("Forgot password email:", email);

    const res = await recruiterAuthService.forgotPasswordOtp(email);

    if (res.success) {
      toast.success("User exists. Please set a new password.");
      navigate("/recruiter/otp", {
        state: { email, purpose: "RESET" },
      });
    } else {
      toast.error(res.message || "User not found.");
    }
  };

  return (
    <ForgotPassword
      role="RECRUITER"
      auth="Login"
      onSubmit={handleForgotSubmit}
    />
  );
};

export default RecruiterForgotPassword;
