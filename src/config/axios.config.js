

import axios from "axios";
import Cookies from "js-cookie";
import { envConfig } from "./env.config";


// AXIOS INSTANCE

export const axiosInstance = axios.create({
  baseURL: envConfig.apiUrl,
  withCredentials: true,  
});

 
// GET ROLE (FOR REDIRECT)
 
const getRoleFromUrl = (url = "") => {
  const role = Cookies.get("user_role");
  if (role) return role.toLowerCase();

  if (url.includes("/api/user/")) return "user";
  if (url.includes("/api/recruiter/")) return "recruiter";
  return "user";
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

const refreshAccessToken = async () => {
  try {
    if (isRefreshing) {
      return new Promise((resolve) => subscribeTokenRefresh(resolve));
    }

    isRefreshing = true;

    console.log("🔁 Refreshing access token...");
    await axiosInstance.post("/api/auth/refresh-token/");

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

    
    // 403 → BLOCKED USER
    if (error.response?.status === 403) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
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

      const refreshed = await refreshAccessToken();

      if (refreshed) {
        //Cookie already updated by backend
        return axiosInstance(originalRequest);
      }

      // Refresh failed → logout
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.href = `/${role}/login`;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
