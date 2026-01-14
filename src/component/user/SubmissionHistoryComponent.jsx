import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Database, 
  Code2, 
  ChevronRight, 
  ChevronDown,
  Calendar,
  Zap
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { problemService } from "../../services/problem/problemService";

const SubmissionHistoryComponent = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await problemService.getUserSubmissions(problemId);
        if (response.success) {
          setSubmissions(response.data);
        } else {
          setError(response.message || "Failed to fetch submissions");
        }
      } catch (err) {
        setError("Error loading submission history");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "text-green-400";
      case "Wrong Answer":
        return "text-red-400";
      case "Runtime Error":
        return "text-orange-400";
      case "Time Limit Exceeded":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "Wrong Answer":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
        <p>Loading your submission history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        <p>{error}</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <Code2 className="w-12 h-12 mb-4 opacity-20" />
        <p>No submissions yet for this problem.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((sub, index) => (
        <div 
          key={sub.id} 
          className={`overflow-hidden rounded-xl border transition-all duration-300 ${
            expandedId === sub.id 
              ? "bg-slate-800/80 border-cyan-500/50 shadow-lg shadow-cyan-500/5" 
              : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
          }`}
        >
          {/* Main Row */}
          <div 
            className="p-4 cursor-pointer flex items-center justify-between"
            onClick={() => toggleExpand(sub.id)}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                {getStatusIcon(sub.status)}
              </div>
              <div>
                <div className={`font-bold flex items-center gap-2 ${getStatusColor(sub.status)}`}>
                  {sub.status}
                  {index === 0 && (
                    <span className="text-[10px] uppercase tracking-wider bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded leading-none">
                      Latest
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(sub.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    })}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Code2 className="w-3 h-3" />
                    {sub.language}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-slate-500 uppercase tracking-tighter">Runtime</span>
                <span className="text-sm font-mono text-slate-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  {sub.runtime} ms
                </span>
              </div>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-slate-500 uppercase tracking-tighter">Memory</span>
                <span className="text-sm font-mono text-slate-300 flex items-center gap-1">
                  <Database className="w-3 h-3 text-cyan-400" />
                  {sub.memory} MB
                </span>
              </div>
              <div className="flex flex-col items-end min-w-[80px]">
                <span className="text-xs text-slate-500 uppercase tracking-tighter">Accuracy</span>
                <span className="text-sm font-bold text-slate-300">
                  {sub.accuracy}%
                </span>
              </div>
              <div className="text-slate-500">
                {expandedId === sub.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
            </div>
          </div>

          {/* Expanded Code View */}
          {expandedId === sub.id && (
            <div className="border-t border-slate-700/50">
              <div className="bg-slate-900/50 p-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest px-2">
                  Submitted Code
                </span>
                <div className="flex items-center gap-2 px-2 text-[10px] text-slate-500">
                  <span>{sub.passed_count} / {sub.total_count} test cases passed</span>
                </div>
              </div>
              <div className="h-[300px] border-b border-slate-700/50">
                <Editor
                  height="100%"
                  language={sub.language}
                  value={sub.code}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    renderLineHighlight: "none",
                    scrollbar: {
                      vertical: "hidden",
                      horizontal: "hidden"
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmissionHistoryComponent;
