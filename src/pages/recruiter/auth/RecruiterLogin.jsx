import React from "react";
import Login from "../../../component/auth/Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { recruiterAuthService } from "../../../services/RecruiterAuth";

 
import { loginThunk } from "../../../store/authThunks";
import { useAppDispatch } from "../../../hooks";
import { useDispatch } from "react-redux";


const RecruiterLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLoginSubmit = async (formData) =>{
    const result = await dispatch(loginThunk({role: "recruiter",formData}))

    if (loginThunk.fulfilled.match(result)){
      toast.success("Recruiter Login successful!");
      navigate("/recruiter/portal");
    } else {
      toast.error(result.payload || "Login failed");
    }
  };
  return <Login role="RECRUITER" auth="Login" onSubmit={handleLoginSubmit}/>
};

export default RecruiterLogin