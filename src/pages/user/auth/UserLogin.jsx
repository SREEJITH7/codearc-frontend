import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "../../../component/auth/Login";
import { loginThunk } from "../../../store/authThunks";
import { useAppDispatch } from "../../../hooks";

const UserLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (formData) => {
    const result = await dispatch(
      loginThunk({ role: "user", formData })
    );

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
