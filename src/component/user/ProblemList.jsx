import React, { useEffect, useState } from "react";
import Table from "../common/Table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Play, Trophy, CheckCircle2, Circle, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
// import { aiAuthService } from "../../service/AiService";
// import { SubscriptionModal } from "./SubscriptionModal";

import { problemService } from "../../services/problem/problemService";

const ProblemList = ({
  searchTerm,
  selectedDifficulties,
  selectedCategories,
  selectedCompanies,
  selectedStatuses,
  showPremiumOnly,
  sortBy,
}) => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch all problems initially
  const fetchProblems = async () => {
  try {
    setLoading(true);

    const response = await problemService.getProblems({
      search: searchTerm,
      difficulty: selectedDifficulties?.[0] || "",
      page: currentPage,
    });

    // ✅ Handle custom response format
    if (response.success && response.data) {
        setProblems(response.data.problems || []);
    }
  } catch (error) {
    console.error("Error fetching problems:", error);
    toast.error("Failed to load problems");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProblems();
  }, []);

  // Client-side filtering and sorting
  useEffect(() => {
    let filtered = [...problems];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Difficulty filter
    if (selectedDifficulties?.length > 0) {
      filtered = filtered.filter((p) =>
        selectedDifficulties.some(
          (diff) => diff.toLowerCase() === p.difficulty.toLowerCase()
        )
      );
    }

    // Category filter
    if (selectedCategories?.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category?.name)
      );
    }

    // Company filter
    if (selectedCompanies?.length > 0) {
      filtered = filtered.filter((p) => {
        if (p.companies && Array.isArray(p.companies)) {
          return p.companies.some((c) => selectedCompanies.includes(c));
        }
        return false;
      });
    }

    // Status filter
    if (selectedStatuses?.length > 0) {
      filtered = filtered.filter((p) => {
        if (p.status) {
          return selectedStatuses.some(
            (s) => s.toLowerCase() === p.status.toLowerCase()
          );
        }
        return selectedStatuses.includes("Unsolved");
      });
    }

    // Premium filter
    if (showPremiumOnly) {
      filtered = filtered.filter((p) => p.isPremium);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "difficulty":
          const diffOrder = { easy: 1, medium: 2, hard: 3 };
          return (
            (diffOrder[a.difficulty?.toLowerCase()] || 0) -
            (diffOrder[b.difficulty?.toLowerCase()] || 0)
          );

        case "acceptance":
          return (b.acceptanceRate || 0) - (a.acceptanceRate || 0);

        case "title":
          return a.title.localeCompare(b.title);

        case "problemId":
        default:
          return (a.id || 0) - (b.id || 0);
      }
    });

    setFilteredProblems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    problems,
    searchTerm,
    selectedDifficulties,
    selectedCategories,
    selectedCompanies,
    selectedStatuses,
    showPremiumOnly,
    sortBy,
  ]);

  const handleProblemClick = async (problemId, isPremium) => {
    if (isPremium) {
      try {
        const response = await aiAuthService.checkBasic();
        if (response.data?.success) {
          navigate(`/user/singleproblem/${problemId}`);
        } else {
          setIsModalOpen(true);
        }
      } catch (err) {
        setIsModalOpen(true);
      }
    } else {
      navigate(`/user/singleproblem/${problemId}`);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-400/10";
      case "medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "hard":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-300 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "solved":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "attempted":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProblems = filteredProblems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  const columns = [
    {
      key: "status",
      label: "Status",
      render: (problem) => (
        <div className="flex justify-center">{getStatusIcon(problem.status)}</div>
      ),
    },
    {
      key: "serial",
      label: "#",
      render: (problem) => (
        <span className="text-slate-300 bg-slate-700/50 px-2 py-1 rounded text-sm font-medium">
          {problem.id}
        </span>
      ),
    },
    {
      key: "title",
      label: "Problem Title",
      render: (problem) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleProblemClick(problem._id, problem.isPremium)}
            className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm transition duration-200 hover:underline"
          >
            {problem.title}
          </button>
          {problem.isPremium && (
            <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
          )}
        </div>
      ),
    },
    {
      key: "difficulty",
      label: "Difficulty",
      render: (problem) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
            problem.difficulty
          )}`}
        >
          {problem.difficulty}
        </span>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (problem) => (
        <span className="text-slate-300 bg-slate-700/50 px-2 py-1 rounded text-sm">
          {problem.category?.name || "General"}
        </span>
      ),
    },
    {
      key: "acceptance",
      label: "Acceptance",
      render: (problem) => (
        <span className="text-slate-300 text-sm">
          {problem.acceptanceRate
            ? `${problem.acceptanceRate.toFixed(1)}%`
            : "N/A"}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (problem) => (
        <button
          onClick={() => handleProblemClick(problem._id, problem.isPremium)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-2"
        >
          <Play size={16} />
          Solve
        </button>
      ),
    },
  ];

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="space-y-4 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="animate-pulse bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="h-4 w-6 bg-slate-700 rounded"></div>
            <div className="h-4 w-32 bg-slate-700 rounded"></div>
            <div className="h-4 w-20 bg-slate-700 rounded"></div>
            <div className="h-4 w-24 bg-slate-700 rounded"></div>
            <div className="h-8 w-24 bg-slate-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (filteredProblems.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-400 mb-2">
          No Problems Found
        </h3>
        <p className="text-slate-500">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="px-6 py-3 bg-slate-800/30 border-b border-slate-700/50">
        <p className="text-gray-400 text-sm">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredProblems.length)} of{" "}
          {filteredProblems.length} problem
          {filteredProblems.length !== 1 && "s"}
        </p>
      </div>

      {/* Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <Table
          data={currentProblems}
          columns={columns}
          currentPage={currentPage}
          pageSize={itemsPerPage}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-slate-800/30 px-6 py-4 flex items-center justify-between border-t border-slate-700/50 rounded-b-xl">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {isModalOpen && (
        <SubscriptionModal
          isOpen={true}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProblemList;