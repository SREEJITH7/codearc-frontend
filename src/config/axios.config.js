

import axios from "axios";
import Cookies from "js-cookie";
import { envConfig } from "./env.config";


// AXIOS INSTANCE
export const axiosInstance = axios.create({
  baseURL: envConfig.apiUrl,
  withCredentials: true,
});

// Proactive Cleanup of legacy tokens (run once on load)
const clearLegacyTokens = () => {
  if (Cookies.get("access_token") || Cookies.get("refresh_token")) {
    console.log("🧹 Cleaning up old/legacy tokens...");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }
};
clearLegacyTokens();


// GET ROLE (FOR REDIRECT)

const getRoleFromUrl = (url = "") => {
  // Check common prefixes first
  if (url.includes("/api/admin/") || url.includes("/admin/")) return "admin";
  if (url.includes("/api/recruiter/")) return "recruiter";
  if (url.includes("/api/user/")) return "user";

  // Fallback to cookie or default
  const role = Cookies.get("user_role");
  return role ? role.toLowerCase() : "user";
};


// REQUEST INTERCEPTOR (NO TOKEN READ)

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("📤 API Request:", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error)
);


// REFRESH TOKEN HANDLING (QUEUE SAFE)
let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (cb) => subscribers.push(cb);
const onRefreshed = () => {
  subscribers.forEach((cb) => cb());
  subscribers = [];
};

const refreshAccessToken = async (role = "user") => {
  try {
    if (isRefreshing) {
      return new Promise((resolve) => subscribeTokenRefresh(resolve));
    }

    isRefreshing = true;

    console.log(`🔁 Refreshing access token for ${role}...`);
    await axiosInstance.post("/api/auth/refresh-token/", { role });

    isRefreshing = false;
    onRefreshed();
    return true;
  } catch (err) {
    isRefreshing = false;
    return false;
  }
};

// RESPONSE INTERCEPTOR (CORRECT FLOW)

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", response.config.url, response.status);
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    const role = getRoleFromUrl(originalRequest?.url);
    const accessCookie = role === "admin" ? "admin_access_token" : role === "recruiter" ? "recruiter_access_token" : "user_access_token";
    const refreshCookie = role === "admin" ? "admin_refresh_token" : role === "recruiter" ? "recruiter_refresh_token" : "user_refresh_token";

    // 403 → BLOCKED USER
    if (error.response?.status === 403) {
      Cookies.remove(accessCookie);
      Cookies.remove(refreshCookie);
      window.location.href = `/${role}/login`;
      return Promise.reject(error);
    }


    // 401 → TRY REFRESH (ONCE)

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-token")
    ) {
      originalRequest._retry = true;

      const refreshed = await refreshAccessToken(role);

      if (refreshed) {
        //Cookie already updated by backend
        return axiosInstance(originalRequest);
      }

      // Refresh failed → logout
      Cookies.remove(accessCookie);
      Cookies.remove(refreshCookie);
      window.location.href = `/${role}/login`;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
