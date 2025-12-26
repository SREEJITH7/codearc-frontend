import React, { useState, useRef, useEffect } from "react";
import { Bell, UserCircle } from "lucide-react";
import UserLogout from "../user/UserLogout";
import { toast } from "react-toastify";
import { adminAuthService } from "../../services/adminAuth";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";



export const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full h-16 bg-slate-900/70 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
        <button className="p-2 rounded-full hover:bg-slate-800/50 text-slate-400 hover:text-white transition">
          <Bell className="w-6 h-6" />
        </button>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 rounded-full hover:bg-slate-800/50 text-slate-400 hover:text-white transition"
        >
          <UserCircle className="w-8 h-8" />
        </button>

        {open && (
          <div className="absolute right-0 top-14 w-48 bg-slate-800 text-white rounded-xl shadow-lg border border-slate-700/50">
            <ul className="flex flex-col py-2">
              <li>
                {/* <UserLogout role="admin" /> */}
                <button
            // onClick={() => navigate("/user/login")}
            onClick={handleLogout}
            className="w-full bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-xl"
          >
            Logout
          </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
