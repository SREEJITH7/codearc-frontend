import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-slate-900/10 rounded-xl p-8 transition-all duration-300">
      <div className="relative">
        <div className="absolute inset-0 transition-opacity blur-xl opacity-20 bg-cyan-500 animate-pulse"></div>
        <Loader2 className="relative w-12 h-12 text-cyan-500 animate-spin" />
      </div>
      <p className="mt-4 text-slate-400 font-medium animate-pulse">
        Optimizing your experience...
      </p>
    </div>
  );
};

export default LoadingFallback;
