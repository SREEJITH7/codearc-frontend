// src/components/Buttons.jsx  

import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false
}) => {
  const base = "font-medium rounded-lg transition-all duration-200 shadow-lg";

  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-slate-600 text-white hover:bg-slate-700",
    outline:
      "border border-slate-500 text-slate-300 hover:bg-slate-700 hover:text-white"
  };

  const sizes = {
    sm: "px-3 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4 w-full"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
};

export default Button;
