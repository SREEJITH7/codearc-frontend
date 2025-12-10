import React from "react";

export const Search = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 rounded-lg border border-gray-500 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 ${className}`}
    />
  );
};
