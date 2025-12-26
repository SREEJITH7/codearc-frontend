import React from "react";
import { FadeLoader } from "react-spinners";

const LoadingOverlay = ({ message }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <FadeLoader color="#38bdf8" height={15} width={5} radius={2} />
      <p className="mt-4 text-white text-sm tracking-wide">{message || 'Loading...'}</p>
    </div>
  );
};

export default LoadingOverlay;
