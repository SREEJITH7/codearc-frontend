// src/types/auth.types.js

// Export role constants
export const Role = {
  USER: "USER",
  ADMIN: "ADMIN",
  RECRUITER: "RECRUITER"
};

// Export auth type constants  
export const Auth = {
  SIGNUP: "Signup",
  LOGIN: "Login",
  FORGOT_PASSWORD: "forgot password"
};

// For UserLikeRoles, you can create a helper function
export const isValidUserLikeRole = (role) => {
  return role === Role.USER || role === Role.RECRUITER;
};

// Export everything
export default {
  Role,
  Auth,
  isValidUserLikeRole
};