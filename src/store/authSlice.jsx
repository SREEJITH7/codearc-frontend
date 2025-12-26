
// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  userSignupThunk,
  userVerifyOtpThunk,
  userForgotPasswordThunk,
  userResetPasswordThunk,
} from "./authThunks";

const initialState = {
  user: null,        
  tempEmail: null,  
  loading: false,
  loadingMessage: "",
  
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
     setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.tempEmail = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ======================================================
       * LOGIN
       * ====================================================== */
 

      .addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.loadingMessage = "Signing in... Please wait";
      state.error = null;
    })
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingMessage = "";
      state.user = action.payload.user;
      state.tempEmail = null;
      state.error = null;
    })
    .addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.loadingMessage = "";
      state.error = action.payload;
    })

    // LOGOUT - unified for all roles
    .addCase(logoutThunk.pending, (state) => {
      state.loading = true;
      state.loadingMessage = "Signing out... Please wait";
      state.error = null;
    })
    .addCase(logoutThunk.fulfilled, (state) => {
      state.loading = false;
      state.loadingMessage = "";
      state.user = null;
      state.tempEmail = null;
      state.error = null;
    })
    .addCase(logoutThunk.rejected, (state, action) => {
      state.loading = false;
      state.loadingMessage = "";
      state.error = action.payload || "Logout failed";
    })

      /* ======================================================
       * USER SIGNUP
       * ====================================================== */
      .addCase(userSignupThunk.fulfilled, (state, action) => {
        state.tempEmail = action.payload.email;  // For OTP page
      })
      .addCase(userSignupThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
       * USER VERIFY OTP
       * ====================================================== */
      .addCase(userVerifyOtpThunk.fulfilled, (state) => {
        state.tempEmail = null; // OTP completed
      })
      .addCase(userVerifyOtpThunk.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
       * USER FORGOT PASSWORD
       * ====================================================== */
      .addCase(userForgotPasswordThunk.fulfilled, (state, action) => {
        state.tempEmail = action.payload.email; // for Reset OTP
      })
      .addCase(userForgotPasswordThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userResetPasswordThunk.fulfilled, (state) => {
        state.tempEmail = null; // Reset done
      })
      .addCase(userResetPasswordThunk.rejected, (state, action) => {
        state.error = action.payload;
      }); 
  },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;

