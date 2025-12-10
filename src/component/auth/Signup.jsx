// src/components/auth/Signup.jsx
import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import SignupForm from "./SignupForm";

const Signup = ({ role = "user", auth, onSubmit }) => {
  return (
    <AuthLayout role={role} auth={auth}>
      <SignupForm role={role} onSubmit={onSubmit} />
    </AuthLayout>
  );
};

export default Signup;
