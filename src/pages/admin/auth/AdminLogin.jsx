// import React from "react";
// import Login from "../../../component/auth/Login";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { adminAuthService } from "../../../services/adminAuth";
// import Cookies from "js-cookie";
// import React from "react";
// import Login from "../../../component/auth/Login";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { adminAuthService } from "../../../services/adminAuth";
// import Cookies from "js-cookie";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (formData) => {
//     try {
//       console.log("📝 Form submit triggered");
//       console.log("📧 Login data:", formData);

//       const response = await adminAuthService.login(formData);
//       console.log("📨 Login response:", response);

//       if (response.success) {
//         toast.success(response.message || "Admin login successful!");

//         // ✅ Wait a bit for cookies to be set, then check
//         setTimeout(() => {
//           const accessToken = Cookies.get("access_token");
//           const refreshToken = Cookies.get("refresh_token");
          
//           console.log("🍪 Cookies after login:");
//           console.log("  access_token:", accessToken ? "✅ SET" : "❌ MISSING");
//           console.log("  refresh_token:", refreshToken ? "✅ SET" : "❌ MISSING");
//           console.log("  All cookies:", document.cookie);

//           if (accessToken) {
//             console.log("✅ Cookie found, navigating to dashboard...");
//             navigate("/admin/dashboard");
//           } else {
//             console.error("❌ Cookie not set by backend!");
//             toast.error("Login failed - session not created");
//           }
//         }, 200);

//       } else {
//         toast.error(response.message || "Login failed.");
//       }
//     } catch (error) {
//       console.error("❌ Login error:", error);
//       toast.error("Login failed. Something went wrong.");
//     }
//   };

//   return <Login role="ADMIN" auth="Login" onSubmit={handleLoginSubmit} />;
// };

// export default AdminLogin;

// ```

// ## Testing Steps:

// 1. **Clear all browser cookies** (very important!)
// 2. **Open browser DevTools** → Application → Cookies
// 3. **Restart Django server** and watch the console
// 4. **Try admin login**
// 5. **Check Django console** for:
// // ```
// //    ✅ Tokens generated:
// //    Access: eyJ0eXAiOiJKV1Q...
//    🍪 Cookies set:
//      - access_token
//      - refresh_token
// ```
// 6. **Check browser console** for:
// // ```
//    🍪 Cookies after login:
//      access_token: ✅ SET
//      refresh_token: ✅ SET





import React from "react";
import Login from "../../../component/auth/Login";
// import { useDispatch } from "react-redux";
// import { setAdmin } from "../../../store/authSlice";
import { adminAuthService } from "../../../services/adminAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../../store/authThunks";
import { useAppDispatch } from "../../../hooks";

// import React from "react";
// import Login from "../../../component/auth/Login";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/authSlice";
 

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData) => {
    const res = await adminAuthService.login(formData);

    if (res.success) {
      dispatch(setUser(res.user));   // 🎉 STORE ADMIN USER
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } else {
      toast.error(res.message);
    }
  };

  return <Login role="ADMIN" auth="Login" onSubmit={handleLoginSubmit} />;
};

export default AdminLogin;
