// import React from "react";
// import Otp from "../../../component/auth/Otp";
// import { useLocation, useNavigate } from "react-router-dom";
// import { userAuthService } from "../../../services/userAuth";
// import { toast } from "react-toastify";

// export const UserOtp = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const handleOtpSubmit = async (otp) => {
//     const payload = {
//       email: state.email,
//       otp: otp,
//       // purpose: state.purpose === "RESET" ? "RESET" : "REGISTRATION",
//       purpose: state.purpose
//     };

//     const response = await userAuthService.verifyOtp(payload);
//  if (response.success) {
//       toast.success("OTP verified successfully!");

//       if (state.purpose === "RESET") {
//         navigate("/user/reset-password", {
//           state: { email: state.email },
//         });
//       } else {
//         navigate("/user/login");
//       }
//     } else {
//       toast.error(response.message);
//     }
//   };

//   const handleResend = async () => {
//     toast.info("Resend OTP API coming soon");
//   };

//   return (
//     <Otp
//       role="USER"
//       auth="Verify OTP"
//       onSubmit={handleOtpSubmit}
//       onResend={handleResend}
//     />
//   );
// };

 
 

import React from "react";
import Otp from "../../../component/auth/Otp";
import { useLocation, useNavigate } from "react-router-dom";
// import { userAuthService } from "../../../services/userAuth";
import { toast } from "react-toastify";
import { userVerifyOtpThunk } from "../../../store/authThunks";
import { useAppDispatch } from "../../../hooks";

export const UserOtp = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleOtpSubmit = async (otp) => {
    const result = await dispatch(
      userVerifyOtpThunk({
        email: state.email,
        otp,
        purpose: state.purpose,
      })
    );

    if (userVerifyOtpThunk.fulfilled.match(result)) {
      toast.success("OTP verified!");

      if (state.purpose === "RESET") {
        navigate("/user/reset-password", { state: { email: state.email } });
      } else {
        navigate("/user/login");
      }
    } else {
      toast.error(result.payload || "OTP failed");
    }
  };

  return (
    <Otp role="USER" auth="Verify OTP" onSubmit={handleOtpSubmit} />
  );
};

