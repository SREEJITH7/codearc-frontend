import { useState, useEffect } from "react";
import {
  Code2,
  TrendingUp,
  Clock,
  Database,
  FileText,
  History,
} from "lucide-react";
import SubmissionHistoryComponent from "./SubmissionHistoryComponent";

const ProblemDetailsComponent = ({
  problemData,
  loading,
  problemId,
  lastSubmission,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (lastSubmission?.isNew) {
      setActiveTab("submissions");
    }
  }, [lastSubmission]);

  const constraintsArray = Array.isArray(problemData?.constraints)
    ? problemData.constraints
    : typeof problemData?.constraints === "string"
    ? problemData.constraints.split("\n").filter(c => c.trim())
    : [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  if (loading || !problemData) {
    return (
      <div className="p-8 h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/50">
      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/80 px-4">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-6 py-3 text-sm font-semibold transition-all flex items-center gap-2 relative ${
            activeTab === "description"
              ? "text-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          Description
          {activeTab === "description" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-6 py-3 text-sm font-semibold transition-all flex items-center gap-2 relative ${
            activeTab === "submissions"
              ? "text-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <History className="w-4 h-4" />
          Submissions
          {activeTab === "submissions" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          )}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "description" ? (
          <div className="p-8 space-y-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-white">
                {problemData.id}. {problemData.title}
              </h1>
              <span
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getDifficultyColor(
                  problemData.difficulty
                )}`}
              >
                {problemData.difficulty}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                Description
              </h2>
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <p className="text-slate-300 whitespace-pre-line">
                  {problemData.description}
                </p>
              </div>
            </div>

            {/* Examples */}
            {problemData.examples?.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-200">
                  Examples
                </h2>
                <div className="space-y-3">
                  {problemData.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5"
                    >
                      <p className="mb-3 text-cyan-400 font-semibold text-sm">
                        Example {i + 1}
                      </p>

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="text-slate-400 min-w-[60px]">
                            Input:
                          </span>
                          <code className="text-emerald-400 font-mono">
                            {typeof ex.input === "string"
                              ? ex.input
                              : JSON.stringify(ex.input)}
                          </code>
                        </div>

                        <div className="flex gap-2">
                          <span className="text-slate-400 min-w-[60px]">
                            Output:
                          </span>
                          <code className="text-amber-400 font-mono">
                            {typeof ex.output === "string"
                              ? ex.output
                              : JSON.stringify(ex.output)}
                          </code>
                        </div>

                        {ex.explanation && (
                          <p className="mt-3 text-slate-400 italic">
                            {ex.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Constraints */}
            {constraintsArray.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-200">
                  Constraints
                </h2>
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                  <ul className="space-y-2">
                    {constraintsArray.map((c, i) => (
                      <li key={i} className="text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tags */}
            {problemData.tags?.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-200">Topics</h2>
                <div className="flex gap-2 flex-wrap">
                  {problemData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8">
            <SubmissionHistoryComponent problemId={problemId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetailsComponent;
