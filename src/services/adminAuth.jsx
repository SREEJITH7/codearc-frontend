

// src/services/adminAuth.jsx

import { axiosInstance } from "../config/axios.config";
// import axiosInstance from "@/config/axiosInstance";   // or whatever path
import { ADMIN_API } from "../utils/apiRoutes";

// -------------------------------
// ADMIN LOGIN
// -------------------------------
const login = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/auth/admin/login", formData);

    // // ✅ Save tokens to cookies after login
    // if (response.data.success && response.data.access_token) {
    //   Cookies.set("access", response.data.access_token, { 
    //     path: "/",
    //     expires: 1/96 // 15 minutes (1/96 of a day)
    //   });
      
    //   Cookies.set("refresh", response.data.refresh_token, { 
    //     path: "/",
    //     expires: 7 // 7 days
    //   });
    // }

    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Something went wrong. Please try again.";
    return { success: false, message };
  }
};

// -------------------------------
// GET ALL USERS (STUDENTS)
// -------------------------------
const getAllUsers = async ({ page, limit, search, status } = {}) => {
  try {
    const response = await axiosInstance.get(`${ADMIN_API}/userslist`, {
      params: { page, limit, search, status },
    });
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to fetch users";
    return { success: false, message };
  }
};

// -------------------------------
// GET ALL RECRUITERS
// -------------------------------
const getAllRecruiter = async ({ page, limit, search, status, company } = {}) => {
  try {
    const response = await axiosInstance.get(`${ADMIN_API}/recruiterlist`, {
      params: { page, limit, search, status, company },
    });

    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to fetch recruiters";
    return { success: false, message };
  }
};

// -------------------------------
// TOGGLE STUDENT ACTIVE / INACTIVE
// -------------------------------
const toggleUserStatus = async (userId) => {
  try {
    const response = await axiosInstance.patch(`${ADMIN_API}/users/${userId}`);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to update status";
    return { success: false, message };
  }
};

// -------------------------------
// TOGGLE RECRUITER ACTIVE / INACTIVE
// -------------------------------
const toggleRecruiterStatus = async (userId) => {
  try {
    const response = await axiosInstance.patch(`${ADMIN_API}/recruiter/${userId}`);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to update status";
    return { success: false, message };
  }
};

// -------------------------------
// APPROVE APPLICANT
// -------------------------------
const acceptApplicant = async (applicantId) => {
  try {
    const response = await axiosInstance.patch(
      `${ADMIN_API}/approve-applicant/${applicantId}`
    );
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to accept applicant";
    return { success: false, message };
  }
};

// -------------------------------
// REJECT APPLICANT
// -------------------------------
const rejectApplicant = async (applicantId, rejectReason) => {
  try {
    const response = await axiosInstance.patch(
      `${ADMIN_API}/reject-applicant/${applicantId}`,
      { rejectReason }
    );
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to reject applicant";
    return { success: false, message };
  }
};

// -------------------------------
// GET ALL APPLICANTS
// -------------------------------
const getAllApplicants = async ({ page, limit } = {}) => {
  try {
    const response = await axiosInstance.get(`${ADMIN_API}/applicantlist`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to fetch applicants";
    return { success: false, message };
  }
};

// EXPORT SERVICE
export const adminAuthService = {
  login,
  getAllUsers,
  toggleUserStatus,
  getAllRecruiter,
  toggleRecruiterStatus,
  acceptApplicant,
  rejectApplicant,
  getAllApplicants,
};
