

// import React from "react";
// // import Login from "../../../component/auth/Login";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { userAuthService } from "../../../services/userAuth";
// import Cookies from "js-cookie";
// import Login from "../../../component/auth/Login";

// const UserLogin = () => {
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (formData) => {
//     try {
//       console.log("Login form data:", formData);

//       const response = await userAuthService.login(formData);
//       console.log("Login response:", response);

//       if (response.success) {
//         const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
//         Cookies.set("access_token", response.data.access_token, {
//           expires: inOneHour,
//         });

//         toast.success(response.message || "Login successful!");
//         navigate("/user/home");
//       } else {
//         toast.error(response.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Login failed. Something went wrong.");
//     }
//   };
//   console.log("ON SUBMIT PROP = ", onSubmit);

//   return <Login role="USER" auth="Login" onSubmit={handleLoginSubmit} />;
// };

// export default UserLogin;



import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userAuthService } from "../../../services/userAuth";
import Cookies from "js-cookie";
import Login from "../../../component/auth/Login";

// const UserLogin = () => {
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (formData) => {
//     try {
//       console.log("Login form data:", formData);
//       const response = await userAuthService.login(formData);
//       console.log("Login response:", response);

//       if (response.success) {
//         Cookies.set("access_token", response.data.access_token, {
//           expires: new Date(Date.now() + 60 * 60 * 1000),
//         });

//         toast.success(response.message || "Login successful!");
//         navigate("/user/home");
//       } else {
//         toast.error(response.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Something went wrong!");
//     }
//   };

//   return <Login role="USER" auth="Login" onSubmit={handleLoginSubmit} />;
// };

// export default UserLogin;

// import { loginThunk } from "../../../features/auth/authThunks";
import { loginThunk } from "../../../store/authThunks";
// import { useAppDispatch } from "../../../app/hooks";
import { useAppDispatch } from "../../../hooks";
const UserLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData) => {
    const result = await dispatch(loginThunk({ role: "user", formData }));

    if (loginThunk.fulfilled.match(result)) {
      toast.success("Login successful!");
      navigate("/user/home");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return <Login role="USER" auth="Login" onSubmit={handleLoginSubmit} />;
};

export default UserLogin;
