// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminAuthService } from "../services/adminAuth";
// import { userAuthService } from "../../services/userAuth"; // if exists
import { userAuthService } from "../services/userAuth";

import { recruiterAuthService } from "../services/RecruiterAuth"; // if exists
import Cookies from "js-cookie";

/**
 * payload: { role: 'admin'|'recruiter'|'user', formData: { email, password } }
 */
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ role, formData }, { rejectWithValue }) => {
    try {
      const res =
        role === "admin"
          ? await adminAuthService.login(formData)
          : role === "recruiter"
          ? await recruiterAuthService.login(formData)
          : await userAuthService.login(formData);

      if (!res.success)
        return rejectWithValue(res.message || "Login failed");

      return { user: res.user };   // 👉 FIXED
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);


// USER SIGNUP
export const userSignupThunk = createAsyncThunk(
  "auth/userSignup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await userAuthService.signup(formData);
      if (!res.success) return rejectWithValue(res.message);
      return { email: formData.email };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// USER OTP VERIFY
export const userVerifyOtpThunk = createAsyncThunk(
  "auth/userVerifyOtp",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await userAuthService.verifyOtp(payload);
      if (!res.success) return rejectWithValue(res.message);
      return payload; // contains email, otp, purpose
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "OTP failed");
    }
  }
);

// USER LOGIN (uses same loginThunk but pass role: "user")

// USER FORGOT PASSWORD
export const userForgotPasswordThunk = createAsyncThunk(
  "auth/userForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await userAuthService.forgotPasswordOtp(email);
      if (!res.success) return rejectWithValue(res.message);
      return { email };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
    }
  }
);

// USER RESET PASSWORD
export const userResetPasswordThunk = createAsyncThunk(
  "auth/userResetPassword",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await userAuthService.resetPassword(email, password);
      if (!res.success) return rejectWithValue(res.message);
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Reset failed");
    }
  }
);

 


export const logoutThunk = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  // optional: call backend logout endpoint then remove cookies
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  return {};
});

