// src/utils/auth.js
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);

export const removeTokens = () => {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getUserRole = () => {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role?.toUpperCase();
  } catch {
    return null;
  }
};
