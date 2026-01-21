// import React, { useState, useEffect } from "react";
// import { 
//   CheckCircle2, 
//   XCircle, 
//   Clock, 
//   Database, 
//   Code2, 
//   ChevronRight, 
//   ChevronDown,
//   Calendar,
//   Zap
// } from "lucide-react";
// import Editor from "@monaco-editor/react";
// import { problemService } from "../../services/problem/problemService";

// const SubmissionHistoryComponent = ({ problemId }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedId, setExpandedId] = useState(null);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         setLoading(true);
//         const response = await problemService.getUserSubmissions(problemId);
//         if (response.success) {
//           setSubmissions(response.data);
//         } else {
//           setError(response.message || "Failed to fetch submissions");
//         }
//       } catch (err) {
//         setError("Error loading submission history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubmissions();
//   }, [problemId]);

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Accepted":
//         return "text-green-400";
//       case "Wrong Answer":
//         return "text-red-400";
//       case "Runtime Error":
//         return "text-orange-400";
//       case "Time Limit Exceeded":
//         return "text-yellow-400";
//       default:
//         return "text-gray-400";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Accepted":
//         return <CheckCircle2 className="w-5 h-5 text-green-400" />;
//       case "Wrong Answer":
//         return <XCircle className="w-5 h-5 text-red-400" />;
//       default:
//         return <Clock className="w-5 h-5 text-gray-400" />;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center p-12 text-slate-400">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
//         <p>Loading your submission history...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8 text-center text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (submissions.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700/50">
//         <Code2 className="w-12 h-12 mb-4 opacity-20" />
//         <p>No submissions yet for this problem.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {submissions.map((sub, index) => (
//         <div 
//           key={sub.id} 
//           className={`overflow-hidden rounded-xl border transition-all duration-300 mb-4 ${
//             expandedId === sub.id 
//               ? "bg-slate-800/90 border-cyan-500/50 shadow-xl shadow-cyan-500/10" 
//               : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
//           }`}
//         >
//           {/* Main Row */}
//           <div 
//             className="p-6 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
//             onClick={() => toggleExpand(sub.id)}
//           >
//             <div className="flex items-center gap-6">
//               <div className="flex-shrink-0 p-2 bg-slate-900/50 rounded-full">
//                 {React.cloneElement(getStatusIcon(sub.status), { className: "w-8 h-8 " + getStatusColor(sub.status).split(" ")[0] })}
//               </div>
//               <div>
//                 <div className={`text-xl font-bold flex items-center gap-3 ${getStatusColor(sub.status)}`}>
//                   {sub.status}
//                   {index === 0 && (
//                     <span className="text-xs uppercase tracking-wider bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded font-semibold">
//                       Latest
//                     </span>
//                   )}
//                 </div>
//                 <div className="text-sm text-slate-400 flex items-center gap-4 mt-2">
//                   <span className="flex items-center gap-2 bg-slate-700/30 px-3 py-1 rounded-full border border-slate-700/50">
//                     <Calendar className="w-4 h-4 text-slate-500" />
//                     {new Date(sub.created_at).toLocaleString("en-US", {
//                       month: "short",
//                       day: "numeric",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: false
//                     })}
//                   </span>
//                   <span className="flex items-center gap-2 capitalize bg-slate-700/30 px-3 py-1 rounded-full border border-slate-700/50">
//                     <Code2 className="w-4 h-4 text-slate-500" />
//                     {sub.language}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0 border-t md:border-t-0 border-slate-700/30 pt-4 md:pt-0">
//               <div className="flex flex-col items-center md:items-end">
//                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Runtime</span>
//                 <span className="text-lg font-mono text-slate-200 flex items-center gap-2 bg-slate-700/20 px-3 py-1 rounded-lg border border-slate-700/30">
//                   <Zap className="w-4 h-4 text-yellow-400" />
//                   {sub.runtime} <span className="text-sm text-slate-500">ms</span>
//                 </span>
//               </div>
//               <div className="flex flex-col items-center md:items-end">
//                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Memory</span>
//                 <span className="text-lg font-mono text-slate-200 flex items-center gap-2 bg-slate-700/20 px-3 py-1 rounded-lg border border-slate-700/30">
//                   <Database className="w-4 h-4 text-cyan-400" />
//                   {sub.memory} <span className="text-sm text-slate-500">MB</span>
//                 </span>
//               </div>
//               <div className="flex flex-col items-center md:items-end">
//                 <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Accuracy</span>
//                 <div className="relative flex items-center justify-center">
//                    <svg className="w-10 h-10 transform -rotate-90">
//                       <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-700" />
//                       <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-green-500" strokeDasharray={`${sub.accuracy}, 100`} />
//                    </svg>
//                    <span className="absolute text-xs font-bold text-white">{sub.accuracy}%</span>
//                 </div>
//               </div>
//               <div className="text-slate-500 ml-2">
//                 {expandedId === sub.id ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
//               </div>
//             </div>
//           </div>

//           {/* Expanded Code View */}
//           {expandedId === sub.id && (
//             <div className="border-t border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-300">
//               <div className="bg-slate-900/80 p-3 flex items-center justify-between border-b border-slate-700/50 backdrop-blur-sm">
//                 <div className="flex items-center gap-3">
//                   <span className="text-xs text-slate-400 uppercase font-bold tracking-widest px-2 py-1 bg-slate-800 rounded border border-slate-700">
//                     Submitted Code
//                   </span>
//                   <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20 flex items-center gap-1">
//                     <CheckCircle2 className="w-3 h-3" />
//                     {sub.passed_count} / {sub.total_count} passed
//                   </span>
//                 </div>
//               </div>
//               <div className="h-[500px]">
//                 <Editor
//                   height="100%"
//                   language={sub.language}
//                   value={sub.code}
//                   theme="vs-dark"
//                   options={{
//                     readOnly: true,
//                     minimap: { enabled: true },
//                     fontSize: 14,
//                     fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
//                     scrollBeyondLastLine: false,
//                     padding: { top: 20, bottom: 20 },
//                     renderLineHighlight: "all",
//                     smoothScrolling: true,
//                     scrollbar: {
//                       vertical: "visible",
//                       horizontal: "visible",
//                       verticalScrollbarSize: 10
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SubmissionHistoryComponent;
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
        return <CheckCircle2 className="w-5 h-5" />;
      case "Wrong Answer":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-sm">Loading your submission history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-400 bg-red-400/10 rounded-xl border border-red-400/20">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <Code2 className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-sm">No submissions yet for this problem.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-2 sm:p-0">
      {submissions.map((sub, index) => (
        <div 
          key={sub.id} 
          className={`overflow-hidden rounded-lg sm:rounded-xl border transition-all duration-300 ${
            expandedId === sub.id 
              ? "bg-slate-800/90 border-cyan-500/50 shadow-xl shadow-cyan-500/10" 
              : "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60"
          }`}
        >
          {/* Main Row */}
          <div 
            className="p-3 sm:p-5 cursor-pointer"
            onClick={() => toggleExpand(sub.id)}
          >
            {/* Header Section */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex-shrink-0 p-1.5 sm:p-2 bg-slate-900/50 rounded-full">
                  {React.cloneElement(getStatusIcon(sub.status), { 
                    className: `w-5 h-5 sm:w-6 sm:h-6 ${getStatusColor(sub.status)}` 
                  })}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-base sm:text-lg font-bold ${getStatusColor(sub.status)}`}>
                      {sub.status}
                    </span>
                    {index === 0 && (
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded font-semibold flex-shrink-0">
                        Latest
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-700/30 px-2 py-1 rounded-full border border-slate-700/50">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                      <span className="truncate">
                        {new Date(sub.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        })}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 capitalize bg-slate-700/30 px-2 py-1 rounded-full border border-slate-700/50">
                      <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 flex-shrink-0" />
                      {sub.language}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Expand Icon - Desktop */}
              <div className="hidden sm:block text-slate-500 flex-shrink-0">
                {expandedId === sub.id ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Runtime */}
              <div className="bg-slate-700/20 rounded-lg border border-slate-700/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                    Runtime
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-mono text-slate-200 font-semibold break-all">
                  {typeof sub.runtime === 'number' ? sub.runtime.toFixed(6) : sub.runtime}
                  <span className="text-sm text-slate-500 ml-1">ms</span>
                </div>
              </div>

              {/* Memory */}
              <div className="bg-slate-700/20 rounded-lg border border-slate-700/30 p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
                    Memory
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-mono text-slate-200 font-semibold break-all">
                  {typeof sub.memory === 'number' ? sub.memory.toFixed(6) : sub.memory}
                  <span className="text-sm text-slate-500 ml-1">MB</span>
                </div>
              </div>
            </div>

            {/* Expand Icon - Mobile */}
            <div className="sm:hidden flex justify-center mt-3 pt-3 border-t border-slate-700/30">
              <div className="text-slate-500">
                {expandedId === sub.id ? 
                  <ChevronDown className="w-5 h-5" /> : 
                  <ChevronRight className="w-5 h-5" />
                }
              </div>
            </div>
          </div>

          {/* Expanded Code View */}
          {expandedId === sub.id && (
            <div className="border-t border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-slate-900/80 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/50 backdrop-blur-sm">
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-widest px-2 py-1 bg-slate-800 rounded border border-slate-700">
                  Submitted Code
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {sub.passed_count} / {sub.total_count} passed
                </span>
              </div>
              <div className="h-[400px] sm:h-[500px]">
                <Editor
                  height="100%"
                  language={sub.language}
                  value={sub.code}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: window.innerWidth > 640 },
                    fontSize: window.innerWidth > 640 ? 14 : 12,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                    renderLineHighlight: "all",
                    smoothScrolling: true,
                    scrollbar: {
                      vertical: "visible",
                      horizontal: "visible",
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8
                    },
                    wordWrap: window.innerWidth < 640 ? "on" : "off"
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