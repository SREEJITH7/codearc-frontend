import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const DropdownFilter = ({
  label,
  options,
  value,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative ${className || ""}`}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium
          border transition-all duration-200 whitespace-nowrap
          ${
            value
              ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
              : "bg-slate-800/70 border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500/80"
          }
        `}
      >
        {label && <span className="text-slate-500 text-xs font-normal hidden sm:inline">{label}:</span>}
        <span>{selected?.label ?? "All"}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 z-50 min-w-[160px] bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* All option */}
          <button
            onClick={() => handleSelect("")}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
              ${!value ? "text-blue-400 bg-blue-500/10" : "text-slate-300 hover:bg-slate-700/60 hover:text-white"}`}
          >
            All
            {!value && <Check className="w-3.5 h-3.5" />}
          </button>

          <div className="h-px bg-slate-700/50 mx-3" />

          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                ${value === opt.value ? "text-blue-400 bg-blue-500/10" : "text-slate-300 hover:bg-slate-700/60 hover:text-white"}`}
            >
              {opt.label}
              {value === opt.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
