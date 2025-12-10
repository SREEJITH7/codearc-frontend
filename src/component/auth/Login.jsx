
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputField from "../common/InputField";
import Button from "../common/Button";
import AuthLayout from "../../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { openGooglePopup } from "../../utils/googleAuthPopup";
import { openGitHubPopup } from "../../utils/githubAuthPopup";
import { setUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
 





const Login = ({ role, auth, onSubmit }) => {

  // const GITHUB_URL = `http://localhost:8000/api/auth/github/login/?from=${role}`;
  // const GOOGLE_URL = `http://localhost:8000/api/auth/google/login/?from=${role}`;

  
const GOOGLE_URL = "http://localhost:8000/api/auth/google/login/";
const GITHUB_URL = "http://localhost:8000/api/auth/github/login/ ";

  console.log("Login role =", role);  // debug


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const temp = {};
    if (!formData.email.trim()) temp.email = "Email is required";
    if (!formData.password.trim()) temp.password = "Password is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit && onSubmit(formData);
  };

  // const GOOGLE_URL = "http://localhost:8000/api/auth/google/login/";

  const handleGoogleLogin = async () => {
    try {
      console.log("Opening popup to:", GOOGLE_URL);
      const payload = await openGooglePopup(GOOGLE_URL);

      // payload: { access_token, refresh_token, email, name }
      Cookies.set("access_token", payload.access_token, { expires: 1 / 96 }); // 15 mins
      Cookies.set("refresh_token", payload.refresh_token, { expires: 7 });

      dispatch(
        setUser({
          email: payload.email,
          username: payload.name,
          role: "user",
        })
      );

      toast.success("Google Login Successful!");
      navigate("/user/home");
    } catch (err) {
      console.error("❌ Google Auth Error:", err);
      toast.error("Google Login Failed: " + (err?.toString?.() || err));
    }
  };

  const handleGitHubLogin = async () => {
    try {
      console.log("🐙 Opening GitHub popup...");
      const payload = await openGitHubPopup(GITHUB_URL);

      // Save tokens
      Cookies.set("access_token", payload.access_token, { expires: 1 / 96 });
      Cookies.set("refresh_token", payload.refresh_token, { expires: 7 });

      // Update Redux
      dispatch(
        setUser({
          email: payload.email,
          username: payload.name,
          role: "user",
        })
      );

      toast.success("GitHub Login Successful! 🐙");
      navigate("/user/home");
    } catch (err) {
      console.error("❌ GitHub Auth Error:", err);
      toast.error("GitHub Login Failed: " + (err?.toString?.() || err));
    }
  };

  // -------------------------------------------------------------------
  useEffect(() => {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:8000"];

    const handler = (event) => {
      console.log("📩 MESSAGE RECEIVED:", event);

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("❌ Ignored unknown origin:", event.origin);
        return;
      }

      if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
        console.log("🎉 SUCCESS MESSAGE RECEIVED:", event.data);

        const payload = event.data.payload;

        Cookies.set("access_token", payload.access_token);
        Cookies.set("refresh_token", payload.refresh_token);

        dispatch(
          setUser({
            email: payload.email,
            username: payload.name,
            role: role,
          })
        );

        toast.success("Google Login Success!");
        navigate("/user/home");
        //  navigate(`/${role}/home`);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  // ====================================================================

  return (
    <AuthLayout role={role} auth={auth}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl 
                   rounded-3xl border border-slate-700/50 shadow-xl p-8"
      >
        <motion.h2
          className="text-3xl font-bold text-center text-white mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {role} Login
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            error={errors.password}
            toggleable={true}
          />

          {role !== "ADMIN" && (
            <div className="flex justify-end">
              <Link
                to={`/${role.toLowerCase()}/forgot-password`}
                className="text-cyan-400 hover:text-cyan-300 text-sm"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          <Button type="submit" size="lg" variant="primary">
            Login
          </Button>
        </form>


{role !== "ADMIN" && (
  <div className="mt-6">
    {/* Divider */}
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-700/50"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-slate-900/50 text-slate-400">Or continue with</span>
      </div>
    </div>

    {/* OAuth Icon Buttons - Simple Clean Style */}
    <div className="flex items-center justify-center gap-x-5">
      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        aria-label="Sign in with Google"
        type="button"
        className="transition-transform hover:scale-110 duration-200"
      >
        <svg className="h-9 w-9" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.532 24.552c0-1.632-.144-3.204-.408-4.704H24.48v8.892h12.936c-.552 3-2.244 5.544-4.776 7.248v6.12h7.728c4.524-4.164 7.164-10.32 7.164-17.556z" fill="#4285F4"/>
          <path d="M24.48 48c6.456 0 11.868-2.136 15.828-5.784l-7.728-6.12c-2.136 1.44-4.872 2.292-8.1 2.292-6.228 0-11.496-4.2-13.38-9.864H3.18v6.324C7.116 42.684 15.18 48 24.48 48z" fill="#34A853"/>
          <path d="M11.1 28.524c-.48-1.44-.756-2.976-.756-4.524s.276-3.084.756-4.524V13.14H3.18C1.164 17.172 0 21.468 0 24s1.164 6.828 3.18 10.86l7.92-6.336z" fill="#FBBC05"/>
          <path d="M24.48 9.528c3.516 0 6.66 1.2 9.144 3.576l6.852-6.852C36.324 2.292 30.936 0 24.48 0 15.18 0 7.116 5.316 3.18 13.14l7.92 6.336c1.884-5.664 7.152-9.948 13.38-9.948z" fill="#EA4335"/>
        </svg>
      </button>

      {/* GitHub Button - Only for USER role */}
      {role === "USER" && (
        <button
          onClick={handleGitHubLogin}
          aria-label="Sign in with GitHub"
          type="button"
          className="transition-transform hover:scale-110 duration-200"
        >
          <svg className="h-9 w-9 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 0C10.746 0 0 11.025 0 24.615 0 35.52 6.876 44.754 16.413 48c1.2.225 1.638-.525 1.638-1.17 0-.576-.024-2.49-.036-4.518-6.678 1.455-8.088-2.88-8.088-2.88-1.092-2.781-2.664-3.522-2.664-3.522-2.178-1.494.165-1.464.165-1.464 2.406.171 3.675 2.481 3.675 2.481 2.136 3.675 5.604 2.613 6.972 1.998.216-1.554.837-2.613 1.521-3.213-5.316-.606-10.905-2.667-10.905-11.865 0-2.619.933-4.761 2.463-6.438-.246-.606-1.068-3.048.234-6.354 0 0 2.01-.645 6.585 2.463 1.908-.531 3.957-.798 5.991-.807 2.034.009 4.083.276 5.994.807 4.572-3.108 6.579-2.463 6.579-2.463 1.305 3.306.483 5.748.237 6.354 1.533 1.677 2.46 3.819 2.46 6.438 0 9.219-5.598 11.253-10.929 11.844.858.744 1.626 2.211 1.626 4.455 0 3.213-.027 5.805-.027 6.591 0 .648.435 1.404 1.65 1.167C41.13 44.745 48 35.514 48 24.615 48 11.025 37.254 0 24 0z" fill="currentColor"/>
          </svg>
        </button>
      )}
    </div>
  </div>
)}


        {role !== "ADMIN" && (
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              to={`/${role.toLowerCase()}/signup`}
              className="text-cyan-400 hover:text-cyan-300"
            >
              Sign up
            </Link>
          </p>
        )}
      </motion.div>
    </AuthLayout>
  );
};

export default Login;
