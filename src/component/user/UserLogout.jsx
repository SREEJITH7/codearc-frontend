import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {axiosInstance} from "../../config/axios.config"; 
// import axiosInstance from "@/config/axiosInstance";   // or whatever path
import { toast } from "react-toastify";
import { adminAuthService } from "../../services/adminAuth";
import { clearUser } from "../../store/authSlice";
import { useDispatch } from "react-redux";


const UserLogout = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleLogout = async () => {
  //   try {
  //     // API request based on role
  //     // const res = await axiosInstance.post(`/api/${role}/logout`);
       
  //     // Remove token
  //     Cookies.remove("access_token");

  //     toast.success(res?.data?.message || "Logged out successfully");

  //     // Redirect
  //     navigate(`/${role}/login`);
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     toast.error("Logout failed. Try again.");
  //   }
  // };
  
  const handleLogout = async () => {
    try{
      const res = await adminAuthService.logout();

      if (res.success) {
        dispatch(clearUser());
        toast.success(res.message);
        navigate("admin/login", { replace: true});
      } else {
        toast.error(res.message || "Logout failed");
      }
    } catch (err){
      console.error("logout error:",err);
      toast.error("something went wrong during logout");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-400 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 hover:shadow-lg"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
};

export default UserLogout;
