// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import { userAuthService } from "../../../services/userAuth";
// // import ForgotPassword from "../../../component/auth/ForgotPassword";

// // const UserForgotPassword = () => {
// //   const navigate = useNavigate();

// //   const handleForgotSubmit = async (email) => {
// //     if (!email.trim()) {
// //       toast.error("Email is required");
// //       return;
// //     }

// //     const res = await userAuthService.forgotPasswordOtp(email);

// //     if (res.success) {
// //       toast.success("OTP sent to your email!");
// //       navigate("/user/otp", {
// //         state: { email, purpose: "RESET" },
// //       });
// //     } else {
// //       toast.error(res.message || "User not found.");
// //     }
// //   };

// //   return (
// //     <ForgotPassword
// //       role="USER"
// //       auth="Login"
// //       onSubmit={handleForgotSubmit}
// //     />
// //   );
// // };

// // export default UserForgotPassword;




// // debugging code below=====================================
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { userAuthService } from "../../../services/userAuth";
// import ForgotPassword from "../../../component/auth/ForgotPassword";

// const UserForgotPassword = () => {
//   const navigate = useNavigate();

//   const handleForgotSubmit = async (email) => {

    
//     if (!email || !email.trim()) {
//       console.error("Email validation failed");
//       toast.error("Email is required");
//       return;
//     }

//     console.log("Calling forgotPasswordOtp service...");
    
//     try {
//       const res = await userAuthService.forgotPasswordOtp(email);
      
//       console.log("=== FORGOT PASSWORD RESPONSE ===");
//       console.log("Response:", res);
//       console.log("Success:", res.success);
//       console.log("Message:", res.message);

//       if (res.success) {
//         toast.success("OTP sent to your email!");
//         console.log("Navigating to OTP page with state:", { email, purpose: "RESET" });
//         navigate("/user/otp", {
//           state: { email, purpose: "RESET" },
//         });
//       } else {
//         console.error("Service returned failure:", res.message);
//         toast.error(res.message || "User not found.");
//       }
//     } catch (error) {
//       console.error("=== FORGOT PASSWORD ERROR ===");
//       console.error("Error caught:", error);
//       console.error("Error message:", error.message);
//       console.error("Error stack:", error.stack);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   console.log("=== UserForgotPassword RENDERED ===");
//   console.log("handleForgotSubmit function:", handleForgotSubmit);
  

//   return (
//     <ForgotPassword
//       role="USER"
//       auth="Login"
//       onSubmit={handleForgotSubmit}
//     />
//   );
// };

// export default UserForgotPassword;


// import { userForgotPasswordThunk } from "../../../features/auth/authThunks";
// import { useAppDispatch } from "../../../app/hooks";
import { userForgotPasswordThunk } from "../../../store/authThunks";
import { useAppDispatch } from "../../../hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { userAuthService } from "../../../services/userAuth";
import ForgotPassword from "../../../component/auth/ForgotPassword";

const UserForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleForgotSubmit = async (email) => {
    const result = await dispatch(userForgotPasswordThunk(email));

    if (userForgotPasswordThunk.fulfilled.match(result)) {
      toast.success("OTP sent!");
      navigate("/user/otp", {
        state: { email, purpose: "RESET" },
      });
    } else {
      toast.error(result.payload || "Failed");
    }
  };

  return <ForgotPassword role="USER" onSubmit={handleForgotSubmit} />;
};

export default UserForgotPassword;
