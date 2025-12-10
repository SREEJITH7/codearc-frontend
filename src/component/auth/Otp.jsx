import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../common/Button";

const Otp = ({ role, auth, onSubmit, onResend }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullOtp = otp.join("");

    if (fullOtp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    onSubmit && onSubmit(fullOtp);
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    onResend && onResend();
  };

  return (
    <AuthLayout role={role} auth={auth}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-3xl 
                   border border-slate-700/50 shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Verify OTP
        </h2>

        <p className="text-center text-gray-400 mb-6">
          Enter the 6-digit code sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Boxes */}
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold 
                           text-white bg-slate-800 border border-slate-600 
                           rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-center text-sm mt-2">{error}</p>
          )}

          <div className="text-center text-gray-400">
            {timer > 0 ? (
              <p>Resend OTP in <span className="text-cyan-400">{timer}s</span></p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-cyan-400 hover:text-cyan-300"
              >
                Resend OTP
              </button>
            )}
          </div>

          <Button type="submit" size="lg" variant="primary">
            Verify
          </Button>
        </form>
      </motion.div>
    </AuthLayout>
  );
};

export default Otp;
