// import React from 'react';
// import Signup from '../../../component/auth/Signup';
// import { useNavigate } from 'react-router-dom';
// import { userAuthService } from '../../../services/userAuth';
// import { toast } from "react-toastify";

// const UserSignup = () => {
//   const navigate = useNavigate();

//   const handleSignupSubmit = async (formData) => {
//     try {
//       console.log("🚀 UserSignup: handleSignupSubmit called with:", formData);
      
//       const response = await userAuthService.signup(formData);
//       console.log("✅ UserSignup: Backend response:", response);
      
//       if (response.success) {
//         console.log("✅ UserSignup: Success - navigating to OTP");
//         const stateData = {
//           email: response.email || formData.email,
//         };
//         navigate("/user/otp", { state: stateData });
//         toast.success(response.message || "Account created successfully! Please verify OTP.");
//       } else {
//         console.log("❌ UserSignup: Response success is false");
//         toast.error(response.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("❌ UserSignup: Error occurred:", error);
//       toast.error("Signup failed. Please try again.");
//     }
//   };

//   console.log("🔍 UserSignup: Rendering component, passing onSubmit to Signup");

//   return (
//     <div>
//       <Signup 
//         role="USER" 
//         auth="Signup" 
//         onSubmit={handleSignupSubmit} 
//       />
//     </div>
//   );
// };

// export default UserSignup;


import React from 'react';
 
import { useAppDispatch } from '../../../hooks';
 
import Signup from '../../../component/auth/Signup';
import { useNavigate } from 'react-router-dom';
// import { userAuthService } from '../../../services/userAuth';
import { toast } from "react-toastify";
import { userSignupThunk } from '../../../store/authThunks';

const UserSignup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignupSubmit = async (formData) => {
    const result = await dispatch(userSignupThunk(formData));

    if (userSignupThunk.fulfilled.match(result)) {
      toast.success("OTP sent!");
      navigate("/user/otp", {
        state: { email: formData.email, purpose: "REGISTRATION" },
      });
    } else {
      toast.error(result.payload || "Signup failed");
    }
  };

  return <Signup role="USER" auth="Signup" onSubmit={handleSignupSubmit} />;
};

export default UserSignup