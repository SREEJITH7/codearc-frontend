// // src/features/auth/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// import { loginThunk,logoutThunk } from "./authThunks";

// const initialState = {
//   user: null,            // { id, email, role, ... }
//   status: "idle",        // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser(state, action) {
//       state.user = action.payload;
//       state.error = null;
//     },
//     clearUser(state) {
//       state.user = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginThunk.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(loginThunk.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.user = action.payload.user || null;
//         state.error = null;
//       })
//       .addCase(loginThunk.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || action.error?.message;
//       })
      


//       .addCase(logoutThunk.fulfilled, (state) => {
//         state.user = null;
//         state.status = "idle";
//         state.error = null;
//       });
//   },
// });

// export const { setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;

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
  user: null,        // logged in user info (admin/user/recruiter)
  tempEmail: null,   // used for OTP + forgot password
  loading: false,
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
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Save user in Redux
        state.user = action.payload.user;

        // Clear tempEmail (signup/reset flow)
        state.tempEmail = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================================================
       * LOGOUT
       * ====================================================== */
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.tempEmail = null;
        state.loading = false;
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

