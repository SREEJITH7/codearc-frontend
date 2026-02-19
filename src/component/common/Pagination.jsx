import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

   
  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 mb-4">
       
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium
          bg-slate-800/70 border border-slate-700/60 text-slate-400
          hover:text-white hover:border-slate-500 hover:bg-slate-700/80
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-150"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      
      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-slate-600 text-sm">
              ···
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-150
                ${
                  currentPage === page
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/80 border border-transparent hover:border-slate-600"
                }`}
            >
              {page}
            </button>
          )
        )}
      </div>

       
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium
          bg-slate-800/70 border border-slate-700/60 text-slate-400
          hover:text-white hover:border-slate-500 hover:bg-slate-700/80
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-all duration-150"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
