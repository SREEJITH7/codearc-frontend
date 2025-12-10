import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, role, auth }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 p-10 flex flex-col justify-center relative z-10"
      >
        <h1 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome to CodeArc
        </h1>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          CodeArc is your next-level coding platform built to empower developers.
          Enhance your programming skills with industry-level challenges,
          structured learning paths, and real-time feedback designed to make you think like a pro.
        </p>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          Our integrated{" "}
          <span className="text-purple-300 font-semibold">Job Portal</span> lets
          you explore the latest openings and career opportunities tailored for coders.
        </p>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          Got a question or stuck on a problem? Join the{" "}
          <span className="text-blue-300 font-semibold">CodeArc Community</span>{" "}
          — a vibrant space where developers support each other.
        </p>

        <p className="text-sm text-slate-400 mt-4">Learn • Code • Connect • Grow 🌱</p>
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 relative z-10"
      >
        <div className="w-full max-w-md bg-slate-700/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-slate-600/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
          <div className="relative z-10">{children}</div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 text-xs text-gray-500 text-center">
        Secure • Fast • Reliable
      </div>
    </div>
  );
};

export default AuthLayout;
