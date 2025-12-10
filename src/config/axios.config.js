// import axios from "axios";
// import Cookies from "js-cookie";
// import { envConfig } from "./env.config.js"; // make sure this file exists

// // -----------------------------------------------------------------------------------
import axios from "axios";
import Cookies from "js-cookie";
import { envConfig } from "./env.config";
// import { defineConfig } from "vite";

export const axiosInstance = axios.create({
  baseURL: envConfig.apiUrl,
  withCredentials: true,
});



// ----------------------------------------------
// FIXING THE PORT 
// --------------------------------------------------



// --------------------------------------------------
// Get correct role
// --------------------------------------------------
const getRoleFromUrl = (url = "") => {
  const user = Cookies.get("user_role");

  if (user) return user.toLowerCase();  // store role cookie on login

  if (url.includes("/api/user/")) return "user";
  if (url.includes("/api/recruiter/")) return "recruiter";

  return "user"; // DO NOT DEFAULT TO ADMIN
};

// / Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', config.url);
    console.log('🍪 Cookies:', document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.url, error.response?.status);
    console.error('Error details:', error.response?.data);
    return Promise.reject(error);
  }
);

// --------------------------------------------------
// Refresh Token Function
// --------------------------------------------------
let isRefreshing = false;
let subscribers = [];

const onRefreshed = (newToken) => {
  subscribers.map((cb) => cb(newToken));
  subscribers = [];
};

const addSubscriber = (cb) => {
  subscribers.push(cb);
};

export const newAccessToken = async () => {
  try {
    if (isRefreshing) {
      return new Promise((resolve) => addSubscriber(resolve));
    }

    isRefreshing = true;

    const res = await axiosInstance.post("/api/auth/refresh-token/");

    const newToken = Cookies.get("access_token"); // CORRECT cookie name

    isRefreshing = false;
    onRefreshed(newToken);

    return newToken;
  } catch (err) {
    isRefreshing = false;
    onRefreshed(null);
    return null;
  }
};

// --------------------------------------------------
// REQUEST INTERCEPTOR
// --------------------------------------------------
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token"); // CORRECT cookie name
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --------------------------------------------------
// RESPONSE INTERCEPTOR
// --------------------------------------------------
axiosInstance.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    const role = getRoleFromUrl(originalRequest.url);

    // BLOCKED USER
    if (error.response?.status === 403) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.href = `/${role}/login`;
      return Promise.reject(error);
    }

    // UNAUTHORIZED → try refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-token")
    ) {
      originalRequest._retry = true;

      const newToken = await newAccessToken();

      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }

      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.href = `/${role}/login`;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
