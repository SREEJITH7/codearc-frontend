// src/component/common/InputField.tsx

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
  toggleable = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && toggleable && showPassword ? "text" : type;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="relative">
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full px-4 py-3 bg-slate-700 border rounded-xl text-white placeholder-gray-400 
            transition-all duration-200 
            ${error && touched ? "border-red-500" : "border-slate-600 hover:border-slate-500"}`}
        />

        {toggleable && type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && touched && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
