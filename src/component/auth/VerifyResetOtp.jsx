import { useState } from "react";
import axios from "../../api/axiosInstance";
// import axiosInstance from "@/config/axiosInstance";   // or whatever path
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyResetOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("auth/verify-otp/", {
        email,
        code: otp,
        action_type: "reset"
      });

      if (res.data.verified) {
        toast.success("OTP verified!");
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error("Invalid OTP");
      }
    } catch (err) {
      toast.error("Invalid or expired OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-bold">Verify OTP</h1>

      <p>Email: {email}</p>

      <input
        type="text"
        placeholder="Enter OTP"
        className="border p-2 w-64"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Verify OTP
      </button>
    </div>
  );
}
