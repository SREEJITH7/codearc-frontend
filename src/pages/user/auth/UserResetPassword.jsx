// import React from "react";
// import ResetPassword from "../../../component/auth/ResetPassword";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { userAuthService } from "../../../services/userAuth";
// import { toast } from "react-toastify";

// export const UserResetPassword = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;

//   const handleResetSubmit = async (password, confirmPassword) => {
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     const res = await userAuthService.resetPassword(email, password);
// console.log("RESET EMAIL:", email);
//     if (res.success) {
//       toast.success("Password reset successfully!");
//       navigate("/user/login");
//     } else {
//       toast.error(res.message);
//     }
//   };
//   if (!email) {
//   toast.error("No email found. Restart the reset flow.");
//   navigate("/user/forgot-password");
//   return;
// }


//   return <ResetPassword role="USER" auth="Login" onSubmit={handleResetSubmit} />;
// };


import React from "react";
import ResetPassword from "../../../component/auth/ResetPassword";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userAuthService } from "../../../services/userAuth";
import { toast } from "react-toastify";


// import { userResetPasswordThunk } from "../../../features/auth/authThunks";
// import { useAppDispatch } from "../../../app/hooks";

import { userResetPasswordThunk } from "../../../store/authThunks";
import { useAppDispatch } from "../../../hooks";

export const UserResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useLocation().state?.email;

  const handleResetSubmit = async (password, confirm) => {
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await dispatch(
      userResetPasswordThunk({ email, password })
    );

    if (userResetPasswordThunk.fulfilled.match(result)) {
      toast.success("Password reset!");
      navigate("/user/login");
    } else {
      toast.error(result.payload || "Reset failed");
    }
  };

  return <ResetPassword role="USER" onSubmit={handleResetSubmit} />;
};
