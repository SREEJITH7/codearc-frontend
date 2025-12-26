

import React from "react";
import Login from "../../../component/auth/Login";
import { adminAuthService } from "../../../services/adminAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../../store/authThunks";
import { useAppDispatch } from "../../../hooks";
 import { useDispatch } from "react-redux";
import { setUser } from "../../../store/authSlice";
 

// const AdminLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLoginSubmit = async (formData) => {
//     const res = await adminAuthService.login(formData);

//     if (res.success) {
//       dispatch(setUser(res.user));   // 🎉 STORE ADMIN USER
//       toast.success("Login successful");
//       navigate("/admin/dashboard");
//     } else {
//       toast.error(res.message);
//     }
//   };

//   return <Login role="ADMIN" auth="Login" onSubmit={handleLoginSubmit} />;
// };

// export default AdminLogin;




//-------------------------




const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData) => {
    const result = await dispatch(
      loginThunk({ role: "admin", formData })
    );

    if (loginThunk.fulfilled.match(result)) {
      toast.success("Login successful");
      navigate("/admin/dashboard", { replace: true });
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  return (
    <Login
      role="ADMIN"
      auth="Login"
      onSubmit={handleLoginSubmit}
    />
  );
};

export default AdminLogin;