import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../store/auth/authThunks";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const emailFromSignup = location.state?.email || ""; // email passed from signup
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      verifyOtp({
        email: emailFromSignup,
        otp,
        purpose: "registration"
      })
    );

    if (verifyOtp.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>OTP Verification</h1>

      <p>OTP sent to: <b>{emailFromSignup}</b></p>

      <form onSubmit={handleVerify} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
        /><br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "green",
            color: "white",
            borderRadius: "5px",
            border: "none"
          }}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}
