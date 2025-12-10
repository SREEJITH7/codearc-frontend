// import { useState } from "react";
// import axios from "../../api/axiosInstance";
// import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "";

//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");

//   const handleReset = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("auth/reset-password/", {
//         email,
//         otp,        // <--- FIXED
//         password
//       });

//       toast.success("Password reset successful!");
//       navigate("/login");
//     } catch (err) {
//       console.log("Reset error:", err.response?.data);
//       toast.error(err.response?.data?.error || "Invalid OTP or error");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-4">
//       <h1 className="text-xl font-bold">Reset Password</h1>

//       <p>Email: {email}</p>

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         className="border p-2 w-64"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="New Password"
//         className="border p-2 w-64"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         onClick={handleReset}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Reset Password
//       </button>
//     </div>
//   );
// }
// -----------------------

import React, { useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../common/InputField";
import Button from "../common/Button";

const ResetPassword = ({ role, auth, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const temp = {};

    if (!password.trim()) {
      temp.password = "Password is required";
    } else if (password.length < 6) {
      temp.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      temp.confirmPassword = "Confirm your password";
    } else if (password !== confirmPassword) {
      temp.confirmPassword = "Passwords do not match";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit && onSubmit(password, confirmPassword);
  };

  return (
    <AuthLayout role={role} auth={auth}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-3xl 
                   border border-slate-700/50 shadow-xl p-8"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-center text-white mb-6"
        >
          Reset Password
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* New Password */}
          <InputField
            label="New Password"
            type="password"
            placeholder="Enter new password"
            name="password"
            value={password}
            toggleable={true}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
            error={errors.password}
          />

          {/* Confirm Password */}
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            name="confirmPassword"
            value={confirmPassword}
            toggleable={true}
            onChange={(e) => {
              setConfirm(e.target.value);
              setErrors({ ...errors, confirmPassword: "" });
            }}
            error={errors.confirmPassword}
          />

          <Button type="submit" size="lg" variant="primary">
            Update Password
          </Button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <a
            href={`/${role.toLowerCase()}/login`}
            className="text-cyan-400 hover:text-cyan-300"
          >
            Login
          </a>
        </p>
      </motion.div>
    </AuthLayout>
  );
};

export default ResetPassword;

