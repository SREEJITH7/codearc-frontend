// // userAuth.jsx

// import { axiosInstance } from "../config/axios.config";

// export const userAuthService = {
//   signup: async (data) => {
//     try {
//       const response = await axiosInstance.post("/api/auth/signup/", {
//         email: data.email,
//         username: data.username,
//         password: data.password,
//         role: "user",
//       });

//       return { success: true, message: response.data.message || "OTP sent" };
//     } catch (err) {
//       console.error("userAuthService.signup error:", err?.response || err);
//       return {
//         success: false,
//         // backend might return errors in different shapes - try several
//         message:
//           err.response?.data?.email ||
//           err.response?.data?.message ||
//           err.response?.data ||
//           "Signup failed",
//       };
//     }
//   },

//   verifyOtp: async (payload) => {
//     try {
//       const response = await axiosInstance.post("/api/auth/verify-otp/", payload);
//       return { success: true, message: response.data.message || "Verified" };
//     } catch (err) {
//       console.error("userAuthService.verifyOtp error:", err?.response || err);
//       return {
//         success: false,
//         message:
//           err.response?.data?.message ||
//           err.response?.data ||
//           "OTP verification failed",
//       };
//     }
//   },



// login: async (data) => {
//   try {
//     const response = await axiosInstance.post("/api/auth/login/", data);

//     return {
//       success: true,
//       message: "Login success",
//       data: response.data
//     };
//   } catch (err) {
//     return {
//       success: false,
//       message: err.response?.data?.message || "Login failed"
//     };
//   }
// }



// };


// ===============================================================
// import { axiosInstance } from "../config/axios.config";

// export const userAuthService = {

//   signup: async (data) => {
//     try {
//       const response = await axiosInstance.post("/api/auth/signup/", {
//         email: data.email,
//         username: data.username,
//         password: data.password,
//         role: "user",
//       });

//       return { success: true, message: response.data.message || "OTP sent" };
//     } catch (err) {
//       return {
//         success: false,
//         message:
//           err.response?.data?.email ||
//           err.response?.data?.message ||
//           "Signup failed",
//       };
//     }
//   },

//   verifyOtp: async (payload) => {
//     try {
//       const response = await axiosInstance.post("/api/auth/verify-otp/", payload);
//       return { success: true, message: response.data.message };
//     } catch (err) {
//       return {
//         success: false,
//         message:
//           err.response?.data?.message || "OTP verification failed",
//       };
//     }
//   },

//   login: async (data) => {
//     try {
//       const response = await axiosInstance.post("/api/auth/login/", data);
//       return { success: true, data: response.data };
//     } catch (err) {
//       return {
//         success: false,
//         message: err.response?.data?.message || "Login failed",
//       };
//     }
//   },

//   forgotPasswordOtp: async (email) => {
//     try {
//       const res = await axiosInstance.post("/api/auth/forgot-password/otp/", {
//         email,
//       });
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       return {
//         success: false,
//         message:
//           err.response?.data?.message || "Failed to send OTP",
//       };
//     }
//   },

//   resetPassword: async (email, password) => {
//     try {
//       const res = await axiosInstance.post("/api/auth/reset-password/", {
//         email,
//         password,
//       });
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       return {
//         success: false,
//         message:
//           err.response?.data?.message || "Password reset failed",
//       };
//     }
//   }
// };
//============================================================================================


import { axiosInstance } from "../config/axios.config";
// import axiosInstance from "@/config/axiosInstance";   // or whatever path

export const userAuthService = {

  signup: async (data) => {
    try {
      console.log("userAuth.signup called with:", data);
      const response = await axiosInstance.post("/api/auth/signup/", {
        email: data.email,
        username: data.username,
        password: data.password,
        role: "user",
      });

      console.log("Signup response:", response.data);
      return { success: true, message: response.data.message || "OTP sent" };
    } catch (err) {
      console.error("Signup error:", err.response?.data || err);
      return {
        success: false,
        message:
          err.response?.data?.email ||
          err.response?.data?.message ||
          "Signup failed",
      };
    }
  },

  verifyOtp: async (payload) => {
    try {
      console.log("userAuth.verifyOtp called with:", payload);
      const response = await axiosInstance.post("/api/auth/verify-otp/", payload);
      console.log("Verify OTP response:", response.data);
      return { success: true, message: response.data.message };
    } catch (err) {
      console.error("Verify OTP error:", err.response?.data || err);
      return {
        success: false,
        message:
          err.response?.data?.message || "OTP verification failed",
      };
    }
  },

  login: async (data) => {
    try {
      console.log("userAuth.login called with email:", data.email);
      const response = await axiosInstance.post("/api/auth/login/", data);
      console.log("Login response:", response.data);
      return {
      success: true,
      user: response.data.user,  // 👉 FIXED
      message: response.data.message
    };
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  },

  forgotPasswordOtp: async (email) => {
    console.log("=== userAuth.forgotPasswordOtp CALLED ===");
    console.log("Email parameter:", email);
    console.log("Email type:", typeof email);
    console.log("Email length:", email?.length);
    
    try {
      console.log("Making POST request to /api/auth/forgot-password/otp/");
      console.log("Request payload:", { email });
      
      const res = await axiosInstance.post("/api/auth/forgot-password/otp/", {
        email,
      });
      
      console.log("=== FORGOT PASSWORD OTP SUCCESS ===");
      console.log("Response status:", res.status);
      console.log("Response data:", res.data);
      
      return { 
        success: true, 
        message: res.data.message || "OTP sent to your email"
      };
    } catch (err) {
      console.error("=== FORGOT PASSWORD OTP ERROR ===");
      console.error("Error response:", err.response);
      console.error("Error status:", err.response?.status);
      console.error("Error data:", err.response?.data);
      console.error("Error message:", err.message);
      
      return {
        success: false,
        message:
          err.response?.data?.message || 
          err.response?.data?.error ||
          err.message ||
          "Failed to send OTP",
      };
    }
  },

  resetPassword: async (email, password) => {
    console.log("=== userAuth.resetPassword CALLED ===");
    console.log("Email:", email);
    console.log("Password length:", password?.length);
    
    try {
      console.log("Making POST request to /api/auth/reset-password/");
      const res = await axiosInstance.post("/api/auth/reset-password/", {
        email,
        password,
      });
      
      console.log("Reset password success:", res.data);
      return { 
        success: true, 
        message: res.data.message || "Password reset successful"
      };
    } catch (err) {
      console.error("Reset password error:", err.response?.data || err);
      return {
        success: false,
        message:
          err.response?.data?.message || 
          err.response?.data?.error ||
          "Password reset failed",
      };
    }
  },


  getUserProfile: async () => {
    console.log("===  profile CALLED ===");
    const response = await axiosInstance.get('/api/auth/user/profile/');
    return response.data;
  },
  
  getUserStats: async () => {
    const response = await axiosInstance.get('/api/auth/user/stats/');
    return response.data;
  },


  updateProfile: async (userId, formData) => {
  try {
    console.log("=== userAuth.updateProfile CALLED ===");

    const res = await axiosInstance.patch(
      `/api/user/profile/update/${userId}/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Update Profile Error:", err.response?.data || err);
    return { success: false, message: "Update failed" };
  }
},


  logout: async () => {
    console.log("=== userAuth.logout CALLED ===")

    try{
      console.log("Making POST request to /api/auth/logout/")

      const res = await axiosInstance.post("/api/auth/logout/");
      console.log("Logout Success:", res.data);
      
      return{
        success: true,
        message: res.data.messsage || "Logged out Successfull",
      };
    } catch (err) {
      console.error("Loggout error:", err.response?.data || err);

      return {
        success : false,
        message: 
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Logout failed",
      };
    }
  },
};