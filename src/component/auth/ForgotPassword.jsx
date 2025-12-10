// import { useState } from "react";
// import axios from "../../api/axiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("auth/forgot-password/", {
//         email,
//         action_type: "reset"
//       });

//       toast.success("OTP sent to your email!");
//       navigate("/reset-password", { state: { email } });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error sending OTP");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-4">
//       <h1 className="text-xl font-bold">Forgot Password</h1>

//       <input
//         type="email"
//         placeholder="Enter your email"
//         className="border p-2 w-64"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <button
//         onClick={handleSendOtp}
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         Send OTP
//       </button>
//     </div>
//   );
// }

// =================================================earlier code above below current using code needed to debug by consoling===================


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import InputField from "../common/InputField";
// import Button from "../common/Button";
// import AuthLayout from "../../layouts/AuthLayout";

// const ForgotPassword = ({ role, auth, onSubmit }) => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const validate = () => {
//     if (!email.trim()) {
//       setError("Email is required");
//       return false;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setError("Enter a valid email");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     onSubmit && onSubmit(email);
//   };

//   return (
//     <AuthLayout role={role} auth={auth}>
//       <motion.div
//         initial={{ opacity: 0, y: 25 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-3xl 
//                    border border-slate-700/50 shadow-xl p-8"
//       >
//         <motion.h2
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="text-3xl font-bold text-center text-white mb-6"
//         >
//           Forgot Password
//         </motion.h2>

//         <form onSubmit={handleSubmit} className="space-y-5">

//           <InputField
//             label="Registered Email"
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             name="email"
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setError("");
//             }}
//             error={error}
//           />

//           <Button type="submit" size="lg" variant="primary">
//             Send OTP
//           </Button>
//         </form>

//         <p className="text-center text-gray-400 mt-6">
//           Remember your password?{" "}
//           <a
//             href={`/${role.toLowerCase()}/login`}
//             className="text-cyan-400 hover:text-cyan-300"
//           >
//             Login
//           </a>
//         </p>
//       </motion.div>
//     </AuthLayout>
//   );
// };

// export default ForgotPassword;

// ========================================================================


import { Link } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../common/InputField";
import Button from "../common/Button";
import AuthLayout from "../../layouts/AuthLayout";

const ForgotPassword = ({ role, auth, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("=== ForgotPassword Component Rendered ===");
  console.log("Props received:", { role, auth, onSubmit });
  console.log("onSubmit type:", typeof onSubmit);
  console.log("onSubmit exists:", !!onSubmit);

  const handleChange = (e) => {
    console.log("Email input changed:", e.target.value);
    setEmail(e.target.value);
    setError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    console.log("Email validation:", { email, isValid });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("=== FORM SUBMIT EVENT TRIGGERED ===");
    console.log("Event:", e);
    console.log("Current email state:", email);
    console.log("Loading state:", loading);
    console.log("onSubmit function:", onSubmit);

    // Validation
    if (!email.trim()) {
      console.error("Validation failed: Email is empty");
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      console.error("Validation failed: Invalid email format");
      setError("Please enter a valid email address");
      return;
    }

    console.log("Validation passed, checking onSubmit...");

    // Call the onSubmit prop
    if (!onSubmit) {
      console.error("CRITICAL: onSubmit prop is not provided!");
      setError("Configuration error. Please contact support.");
      return;
    }

    console.log("Setting loading to true...");
    setLoading(true);

    try {
      console.log("Calling onSubmit with email:", email);
      await onSubmit(email);
      console.log("onSubmit completed successfully");
    } catch (err) {
      console.error("=== ERROR IN ONSUBMIT ===");
      console.error("Error:", err);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
      setError("An error occurred. Please try again.");
    } finally {
      console.log("Setting loading to false...");
      setLoading(false);
    }
  };

  const handleButtonClick = (e) => {
    console.log("=== BUTTON CLICKED ===");
    console.log("Button click event:", e);
    console.log("Event type:", e.type);
    console.log("Current loading state:", loading);
    // Don't prevent default here - let the form submit handle it
  };

  return (
    <AuthLayout role={role} auth={auth}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl 
                   rounded-3xl border border-slate-700/50 shadow-xl p-8"
      >
        {/* Title */}
        <motion.h2
          className="text-3xl font-bold text-center text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Forgot Password
        </motion.h2>

        <p className="text-center text-gray-400 mb-6">
          Enter your email to receive an OTP
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChange={handleChange}
            error={error}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            variant="primary"
            disabled={loading}
            onClick={handleButtonClick}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>

          {/* Debug Info */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-500 mt-2">
              <p>Email: {email}</p>
              <p>Loading: {loading.toString()}</p>
              <p>OnSubmit exists: {(!!onSubmit).toString()}</p>
            </div>
          )}
        </form>

        {/* Back to Login Link */}
        <p className="text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <Link
            to={`/${role.toLowerCase()}/login`}
            className="text-cyan-400 hover:text-cyan-300"
          >
            Back to Login
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
};

export default ForgotPassword;