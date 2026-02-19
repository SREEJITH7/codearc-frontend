import { Search as SearchIcon, X } from "lucide-react";

export const Search = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Glow ring on focus */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-blue-500/40 group-focus-within:via-purple-500/40 group-focus-within:to-pink-500/40 transition-all duration-300 blur-sm" />

      <div className="relative flex items-center bg-slate-800/70 border border-slate-700/60 rounded-2xl group-focus-within:border-slate-500/80 transition-all duration-200 overflow-hidden">
        <SearchIcon className="absolute left-4 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors duration-200 pointer-events-none" />

        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent pl-11 pr-10 py-3 text-white placeholder:text-slate-500 text-sm focus:outline-none"
        />

        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 p-1 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all duration-150"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
