// import { axiosInstance } from "../config/axios.config";
// import { RECRUITER_API } from "../utils/apiRoutes";
// import Cookies from "js-cookie";

// const signup = async (formData) => {
//   try {
//     const response = await axiosInstance.post(
//       `${RECRUITER_API}/signup`,
//       formData
//     );
//     console.log("res", response);
//     return response.data;
//   } catch (error) {
//     const err = error;
//     return {
//       success: false,
//       message: err.response?.data?.message || "Something went wrong",
//     };
//   }
// };

// const verifyOtp = async (otp, email, purpose) => {
//   try {
//     const response = await axiosInstance.post(`${RECRUITER_API}/verify-otp`, {
//       otp,
//       email,
//       purpose,
//     });
//     console.log("OTP verify response:", response);
//     return response.data;
//   } catch (error) {
//     const err = error;
//     return {
//       success: false,
//       message: err.response?.data?.message || "OTP verification failed",
//     };
//   }
// };

// const login = async (formData) => {
//   try {
//     console.log("login service enterd");
//     const response = await axiosInstance.post(
//       `${RECRUITER_API}/login`,
//       formData
//     );
//     console.log("res", response);
//     return response.data;
//   } catch (error) {
//     const err = error;
//     if (err.response?.data?.message) {
//       return {
//         success: false,
//         message: err.response.data.message,
//       };
//     }
//     return {
//       success: false,
//       message: "Something went wrong. Please try again.",
//     };
//   }
// };

// const resendOtp = async (email) => {
//   try {
//     const response = await axiosInstance.post(`${RECRUITER_API}/resend-otp`, {
//       email,
//     });
//     return response.data;
//   } catch (error) {
//     const err = error;
//     return {
//       success: false,
//       message: err.response?.data?.message || "Resend OTP failed.",
//     };
//   }
// };

// const checkUserExists = async (email) => {
//   try {
//     const res = await axiosInstance.post(`${RECRUITER_API}/check-user`, {
//       email,
//     });
//     return res.data;
//   } catch (error) {
//     const err = error;
//     return {
//       success: false,
//       message: err.response?.data?.message || "Error checking user",
//     };
//   }
// };

// const resetPassword = async (email, newPassword) => {
//   try {
//     const response = await axiosInstance.post(
//       `${RECRUITER_API}/reset-password`,
//       {
//         email,
//         newPassword,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     const err = error;
//     return {
//       success: false,
//       message: err.response?.data?.message || "Server error. Please try again.",
//     };
//   }
// };

// const approveRecruiter = async (formData) => {
//   try {
//     const response = await axiosInstance.patch(
//       `${RECRUITER_API}/company-verification`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     const err = error;
//     return {
//       success: false,
//       message: err.response?.data?.message || "Failed to submit company verification",
//     };
//   }
// };

// const getRecruiterProfile = async () => {
//   try {
//     const token = Cookies.get("access_token");
//     if (!token) {
//       throw new Error("Access token not found");
//     }
//     const response = await axiosInstance.get(`${RECRUITER_API}/recruiter-profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     const err = error;
//     console.error("Error fetching recruiter profile:", err.response?.data || err.message);
//     throw err;
//   }
// }

// export const recruiterAuthService = {
//   signup,
//   verifyOtp,
//   login,
//   resendOtp,
//   checkUserExists,
//   resetPassword,
//   approveRecruiter,
//   getRecruiterProfile,
// };


// ==========================================================================
import axios from "axios";
import { axiosInstance } from "../config/axios.config";
// import axiosInstance from "@/config/axiosInstance";   // or whatever path

export const recruiterAuthService = {


  // -----------------------------
  // RECRUITER SIGNUP
  // -----------------------------
  signup: async (data) => {
    try {

      console.log("Sending signup request with data:", {
      email: data.email,
      username: data.username,
      password: data.password,
      role: "recruiter",
    });

      const response = await axiosInstance.post("/api/auth/signup/", {
        email: data.email,
        username: data.username,
        password: data.password,
        role: "recruiter",
      });

      return {
        success: true,
        email: data.email, // Include email in success response
        message: response.data.message || "OTP sent",
      };

    } catch (error) {
      console.log("SIGNUP ERROR:", error.response?.data);
      return {
        success: false,
        message:
          error.response?.data?.email?.[0] || // Django often returns errors as arrays
          error.response?.data?.email ||
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Signup failed",
      };
    }
  },

  // -----------------------------
  // VERIFY OTP
  // -----------------------------

verifyOtp: async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/verify-otp/", payload
    );

    return {
      success: true,
      message: response.data.message || "Verified",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "OTP verification failed",
    };
  }
},

  // -----------------------------
  // RESEND OTP
  // -----------------------------
  resendOtp: async (email) => {
    try {
      const response = await axiosInstance.post("/api/auth/resend-otp/", {
        email: email,
      });
      return {
        success: true,
        message: response.data.message || "OTP resent",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to resend OTP",
      };
    }
  },

  // -----------------------------
  // CHECK USER EXISTS (for forgot password)
  // -----------------------------
  checkUserExists: async (email) => {
    try {
      const response = await axiosInstance.post("/api/auth/check-user/", {
        email: email,
      });
      return {
        success: true,
        message: response.data.message || "User exists",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "User not found",
      };
    }
  },

  // -----------------------------
  // RESET PASSWORD
  // -----------------------------
  resetPassword: async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/reset-password/", {
        email: email,
        password: password,
      });
      return {
        success: true,
        message: response.data.message || "Password reset successful",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to reset password",
      };
    }
  },

  // -----------------------------
  // RECRUITER LOGIN
  // -----------------------------
  login: async (data) => {
    try {
      console.log("userAuth.login called with email:", data.email);
      const response = await axiosInstance.post("/api/auth/recruiter/login",
          {email: data.email,
          password: data.password}
      );
      console.log("login responce:",response.data);
      return {
        success: true,
        user : response.data.user,
        message: response.data.message || "Login successful",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed",
      };
    }
  },


forgotPasswordOtp: async (email) => {
  console.log("Calling forgotPasswordOtp API…", email);
  try {
    const res = await axiosInstance.post("/api/auth/forgot-password/otp/", {
      email,
    });
    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send OTP",
    };
  }
},


 
getRecruiterProfile: async () => {
  try {
    const response = await axiosInstance.get(
      "/api/recruiter/profile/"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching recruiter profile:", error.response?.data);
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch recruiter profile",
    };
  }
},

  // services/RecruiterAuth.js
updateProfile: async (formData) => {
  try {
    const res = await axiosInstance.patch(
      "/api/recruiter/profile/",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    return {
      success: true,
      data: res.data,
      message: res.data.message || "Profile updated successfully"
    };
  } catch (err) {
    // Let the error propagate – don't catch everything
    console.error("Update profile error:", err);

    // Optional: normalize error format
    const errorMessage = err.response?.data?.message 
      || err.response?.data?.error 
      || err.message 
      || "Failed to update profile";

    throw new Error(errorMessage);
  }
},

 logout: async () => {
    console.log("=== REcruiter.logout CALLED ===")

    try{
      console.log("Making POST request to /api/auth/logout/")

      const res = await axiosInstance.post("/api/auth/logout/");
      console.log("Logout Success:", res.data);
      
      return{
        success: true,
        message: res.data.messsage || "Logout Successfully",
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


