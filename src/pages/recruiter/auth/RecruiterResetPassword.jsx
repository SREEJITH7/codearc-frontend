import React from 'react';
import ResetPassword from '../../../component/auth/ResetPassword';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { recruiterAuthService } from '../../../services/RecruiterAuth';

const RecruiterResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleResetSubmit = async (password, confirmPassword) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await recruiterAuthService.resetPassword(email, password);
      if (res.success) {
        toast.success(res.message);
        navigate("/recruiter/login");
      } else {
        toast.error(res.message || "Reset failed. Try again.");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.");
    }
  };

  return <ResetPassword role="RECRUITER" auth="Login" onSubmit={handleResetSubmit} />;
};

export default RecruiterResetPassword;
