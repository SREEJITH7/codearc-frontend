// src/services/adminAuth.jsx

import { axiosInstance } from "../config/axios.config";
import { ADMIN_API } from "../utils/apiRoutes";

export const adminAuthService = {

 
  // ADMIN LOGIN
  

login: async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/admin/login",
      formData
    );

    return {
      success: true,
      user: response.data.user,   
      message: response.data.message || "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong. Please try again.",
    };
  }
},

  // -------------------------------
  // GET ALL USERS (STUDENTS)
  // -------------------------------
  getAllUsers: async ({ page, limit, search, status } = {}) => {
    try {
      const response = await axiosInstance.get(
        `${ADMIN_API}/userslist`,
        { params: { page, limit, search, status } }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to fetch users",
      };
    }
  },

  // -------------------------------
  // GET ALL RECRUITERS
  // -------------------------------
  getAllRecruiters: async ({ page, limit, search, status } = {}) => {
    try {
      const response = await axiosInstance.get(
        `${ADMIN_API}/recruiterslist`,
        { params: { page, limit, search, status } }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to fetch recruiters",
      };
    }
  },

  // -------------------------------
  // TOGGLE STUDENT ACTIVE / INACTIVE
  // -------------------------------
  toggleUserStatus: async (userId) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_API}/users/${userId}/toggle-status`
      );

      return {
        success: true,
        message: response.data.message || "User status updated",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to update user status",
      };
    }
  },

  // -------------------------------
  // TOGGLE RECRUITER ACTIVE / INACTIVE
  // -------------------------------
  toggleRecruiterStatus: async (id) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_API}/recruiters/${id}/toggle-status`
      );

      return {
        success: true,
        message: response.data.message || "Recruiter status updated",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to update recruiter status",
      };
    }
  },

  // -------------------------------
  // APPROVE APPLICANT
  // -------------------------------
  acceptApplicant: async (applicantId) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API}/approve-applicant/${applicantId}`
      );

      return {
        success: true,
        message: response.data.message || "Applicant approved",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to approve applicant",
      };
    }
  },

  // -------------------------------
  // REJECT APPLICANT
  // -------------------------------
  rejectApplicant: async (applicantId, rejectReason) => {
    try {
      const response = await axiosInstance.patch(
        `${ADMIN_API}/reject-applicant/${applicantId}`,
        { rejectReason }
      );

      return {
        success: true,
        message: response.data.message || "Applicant rejected",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to reject applicant",
      };
    }
  },

  // -------------------------------
  // GET ALL APPLICANTS
  // -------------------------------
  getAllApplicants: async ({ page, limit } = {}) => {
    try {
      const response = await axiosInstance.get(
        `${ADMIN_API}/applicantlist`,
        { params: { page, limit } }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Failed to fetch applicants",
      };
    }
  },

logout : async () => {
  console.log("called for the logout from admin from admin auth service")
  try{
    const res = await axiosInstance.post("/api/auth/logout/");
    console.log("Making POST request to /api/auth/logout")
    
    return{
      success: true,
      message: res.data.message || "Logged out successfull"
    };
  } catch(err) {
    console.error("Logout error:", err.response?.data || err);

    return{
      success: false,
      message:
      err.response?.data?.message || 
      err.response?.data?.error ||
      "Logout failed",
    };
  }
}
};



//   login,
//   getAllUsers,
//   toggleUserStatus,
//   getAllRecruiters,
//   toggleRecruiterStatus,
//   acceptApplicant,
//   rejectApplicant,
//   getAllApplicants,
