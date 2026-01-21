import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Terminal,
} from "lucide-react";

const ResultComponent = ({
  testResults,
  loading,
  overallStatus,
  error,
  consoleOutput,
  onExplainError,
  userCode,
  problemData,
}) => {
  const [activeTab, setActiveTab] = useState("testcases");
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  // Reset selected case when new results come in
  useEffect(() => {
    if (testResults?.length > 0) {
      setSelectedCaseIdx(0);
    }
  }, [testResults]);

  const getStatusDetails = (result) => {
    const status =
      result?.status || (result?.passed ? "accepted" : "wrong_answer");

    switch (status) {
      case "accepted":
        return {
          color: "text-emerald-400",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/20",
          icon: CheckCircle,
          label: "Accepted",
        };
      case "wrong_answer":
        return {
          color: "text-rose-400",
          bgColor: "bg-rose-500/10",
          borderColor: "border-rose-500/20",
          icon: XCircle,
          label: "Wrong Answer",
        };
      case "timeout":
        return {
          color: "text-amber-400",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/20",
          icon: Clock,
          label: "Time Limit Exceeded",
        };
      case "runtime_error":
        return {
          color: "text-orange-400",
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/20",
          icon: AlertTriangle,
          label: "Runtime Error",
        };
      default:
        return {
          color: "text-slate-400",
          bgColor: "bg-slate-500/10",
          borderColor: "border-slate-500/20",
          icon: AlertCircle,
          label: status.replace("_", " "),
        };
    }
  };

  const getOverallStatusDetails = () => {
    switch (overallStatus) {
      case "Accepted":
      case "passed":
        return {
          color: "text-emerald-400",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/20",
          icon: CheckCircle,
          message: "All test cases passed!",
        };
      case "Wrong Answer":
      case "failed":
        return {
          color: "text-rose-400",
          bgColor: "bg-rose-500/10",
          borderColor: "border-rose-500/20",
          icon: XCircle,
          message: "Some test cases failed.",
        };
      case "error":
        return {
          color: "text-amber-400",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/20",
          icon: AlertCircle,
          message: "An error occurred during execution.",
        };
      default:
        return {
          color: "text-slate-400",
          bgColor: "bg-slate-800/50",
          borderColor: "border-slate-700/50",
          icon: Terminal,
          message: "Run your code to see results.",
        };
    }
  };

  const formatConsoleOutput = (output) => {
    if (!output) return [];

    // Filter out the JSON results if they are in the console output
    return output
      .split("\n")
      .filter(line => {
        try {
          const parsed = JSON.parse(line);
          return !Array.isArray(parsed); // Skip if it's the results array
        } catch {
          return true;
        }
      })
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        try {
          if (
            (part.startsWith("[") && part.endsWith("]")) ||
            (part.startsWith("{") && part.endsWith("}"))
          ) {
            return JSON.stringify(JSON.parse(part), null, 2);
          }
        } catch {}
        return part;
      });
  };

  const hasConsoleOutput = () =>
    Boolean(
      formatConsoleOutput(consoleOutput).length > 0 ||
        testResults?.some((r) => r.consoleOutput?.trim())
    );

  const tabs = [
    { id: "testcases", label: "Test Cases", count: testResults?.length || 0 },
    { id: "console", label: "Console", hasOutput: hasConsoleOutput() },
    { id: "output", label: "Output" },
  ];

  const renderTestCases = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-48 gap-3">
          <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400 animate-pulse">Executing code against test cases...</p>
        </div>
      );
    }

    if (error && (!testResults || testResults.length === 0)) {
      return (
        <div className="p-4 m-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-rose-400">Execution Error</h4>
            <p className="text-sm text-rose-300/80 mt-1 font-mono">{error}</p>
          </div>
        </div>
      );
    }

    if (!testResults || testResults.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-48 text-slate-500">
          <Terminal className="w-8 h-8 mb-2 opacity-20" />
          <p className="text-sm">No test results yet</p>
        </div>
      );
    }

    const passedCases = testResults.filter((t) => t.passed).length;
    const totalCases = testResults.length;
    const overall = getOverallStatusDetails();
    const OverallIcon = overall.icon;
    const currentResult = testResults[selectedCaseIdx] || testResults[0];
    const d = getStatusDetails(currentResult);

    return (
      <div className="flex flex-col h-full bg-slate-900/30">
        {/* Summary Header */}
        <div className={`p-4 border-b border-slate-800/50 backdrop-blur-sm ${overall.bgColor} transition-colors`}>
          <div className="flex items-center gap-3">
            <OverallIcon size={20} className={overall.color} />
            <h3 className={`text-lg font-bold ${overall.color}`}>
              {passedCases === totalCases ? "Accepted" : "Wrong Answer"}
            </h3>
            <span className="text-xs text-slate-400">
              {passedCases}/{totalCases} test cases passed
            </span>
          </div>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex items-center gap-2 p-4 overflow-x-auto custom-scrollbar">
          {testResults.map((result, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCaseIdx(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${
                selectedCaseIdx === idx
                  ? "bg-slate-800 border-slate-600 text-white shadow-lg"
                  : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${result.passed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              Case {idx + 1}
            </button>
          ))}
        </div>

        {/* Selected Case Details */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
           <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 mb-1">
                <d.icon size={14} className={d.color} />
                <span className={`text-xs font-bold uppercase tracking-widest ${d.color}`}>
                  {d.label}
                </span>
              </div>

              {/* Input Section */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Input</span>
                <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 font-mono text-sm text-slate-300">
                  {typeof currentResult.input === 'object' 
                    ? JSON.stringify(currentResult.input, null, 2) 
                    : String(currentResult.input)}
                </div>
              </div>

              {/* Comparison Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Expected Output</span>
                  <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-4 font-mono text-sm text-emerald-400/80">
                    {typeof currentResult.expected === 'object' 
                      ? JSON.stringify(currentResult.expected, null, 2) 
                      : String(currentResult.expected)}
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Actual Output</span>
                  <div className={`bg-slate-950/50 rounded-xl border p-4 font-mono text-sm overflow-hidden ${
                    currentResult.passed ? 'border-emerald-500/30 text-emerald-400' : 'border-rose-500/30 text-rose-400'
                  }`}>
                    {currentResult.actual !== undefined 
                      ? (typeof currentResult.actual === 'object' 
                          ? JSON.stringify(currentResult.actual, null, 2) 
                          : String(currentResult.actual))
                      : <span className="text-slate-600 italic">No output</span>}
                  </div>
                </div>
              </div>

              {/* Console Output for this case if any */}
              {currentResult.consoleOutput && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Stdout</span>
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-400 whitespace-pre-wrap">
                    {currentResult.consoleOutput}
                  </div>
                </div>
              )}

              {/* Error details if any */}
              {currentResult.error && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-rose-400" />
                    <span className="text-[11px] font-bold text-rose-400 uppercase tracking-widest">Runtime Error</span>
                  </div>
                  <div className="bg-rose-500/5 rounded-xl border border-rose-500/20 p-4 font-mono text-xs text-rose-300/80 whitespace-pre-wrap">
                    {currentResult.error}
                  </div>
                </div>
              )}
           </div>
        </div>
      </div>
    );
  };

  const renderConsole = () => {
    const output = formatConsoleOutput(consoleOutput);
    return (
      <div className="p-4 h-full bg-slate-950/50 backdrop-blur-sm">
        {output.length ? (
          <div className="space-y-2 font-mono text-sm">
            {output.map((o, i) => (
              <div key={i} className="flex gap-3 text-slate-300 border-b border-slate-800/50 pb-2">
                <span className="text-slate-600 shrink-0 select-none">{i + 1}</span>
                <pre className="whitespace-pre-wrap break-all">{o}</pre>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-slate-500">
            <Terminal className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-sm">No console output</p>
          </div>
        )}
      </div>
    );
  };

  const renderOutput = () => (
    <div className="p-4 space-y-2">
      {testResults?.length ? (
        testResults.map((r, i) => (
          <div key={i} className="flex items-center gap-3 font-mono text-sm">
            <span className="text-slate-600 w-16">Test {i + 1}:</span>
            <span className={r.passed ? "text-emerald-400" : "text-rose-400"}>
              {r.actual !== undefined 
                ? (typeof r.actual === 'object' ? JSON.stringify(r.actual) : String(r.actual)) 
                : "null"}
            </span>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-48 text-slate-500">
          <Terminal className="w-8 h-8 mb-2 opacity-20" />
          <p className="text-sm">No output yet</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full bg-slate-900/50 backdrop-blur-xl flex flex-col border-t border-slate-800/50">
      <div className="px-4 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-md flex items-center gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-3 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "text-cyan-400"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                  {tab.count}
                </span>
              )}
              {tab.id === "console" && tab.hasOutput && (
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              )}
            </div>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === "testcases" && renderTestCases()}
        {activeTab === "console" && renderConsole()}
        {activeTab === "output" && renderOutput()}
      </div>
    </div>
  );
};

export default ResultComponent;
