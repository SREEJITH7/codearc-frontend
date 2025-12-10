// import React from "react";
// import Signup from "../../../component/auth/Signup";
// import { recruiterAuthService } from "../../../services/RecruiterAuth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";




// const RecruiterSignup = () => {
//   const navigate = useNavigate();

//   const handleSignupSubmit = async (formData) => {
//     try {
//       const response = await recruiterAuthService.signup(formData);

//       const stateData = {
//         email: response.email,
//       };
//       if (response.success) {
//         navigate("/recruiter/otp", { state: stateData });
//         toast.success(response.message);
//       } else {
//         toast.error(response.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//       alert("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <Signup role="RECRUITER" auth="Signup" onSubmit={handleSignupSubmit} />
//   );
// };

// export default RecruiterSignup;


import React from "react";
import Signup from "../../../component/auth/Signup";
import { recruiterAuthService } from "../../../services/RecruiterAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterSignup = () => {
  const navigate = useNavigate();

  const handleSignupSubmit = async (formData) => {
    try {
      const response = await recruiterAuthService.signup(formData);

      if (response.success) {
        // Only navigate and show success if signup actually succeeded
        const stateData = {
          email: formData.email, // Use formData.email, not response.email
        };
        navigate("/recruiter/otp", { state: stateData });
        toast.success(response.message || "OTP sent successfully!");
      } else {
        // Show error message from backend
        toast.error(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      // This catch block will only run if there's a network error or similar
      console.error("Signup failed:", error);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <Signup role="RECRUITER" auth="Signup" onSubmit={handleSignupSubmit} />
  );
};

export default RecruiterSignup;