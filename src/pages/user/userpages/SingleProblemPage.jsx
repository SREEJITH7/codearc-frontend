// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import CompilerComponent from "../../../component/user/CompilerComponent";
// import ProblemDetailsComponent from "../../../component/user/ProblemDetailsComponent";
// import ResultComponent from "../../../component/user/ResultComponent";
// import UserLayout from "../../../layouts/UserLayout";

// // import { aiAuthService } from "../../../service/AiService";

// import { problemService } from "../../../services/problem/problemService";

// import ShimmerSkeleton from "../../../utils/shimmer/ProblemShimmer";
// // import AIExplanationPopup from "../../../component/user/AIExplanationPopup";
// // import AILoadingModal from "../../../utils/AILoadingModal";
// import { SubscriptionModal } from "../../../component/user/SubscriptionModal";

// const SingleProblemPage = () => {
//   const { problemId } = useParams();

//   const [problemData, setProblemData] = useState(null);
//   const [testResults, setTestResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRunning, setIsRunning] = useState(false);
//   const [runError, setRunError] = useState(null);
//   const [overallStatus, setOverallStatus] = useState(null);
//   const [leftWidth, setLeftWidth] = useState(50);
//   const [code, setCode] = useState("");
//   const [consoleOutput, setConsoleOutput] = useState("");
//   const [allSubmissions, setAllSubmissions] = useState(null);

//   const [aiPopup, setAiPopup] = useState({
//     isOpen: false,
//     explanation: "",
//     suggestedFix: "",
//     codeExample: "",
//     confidence: 0,
//     aiProvider: "",
//   });

//   const [aiLoading, setAiLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchProblemData = async () => {
//       try {
//         setLoading(true);
//         if (!problemId) return;

//         const response = await problemService.getSingleProblem(problemId);
//         const data = response;

//         setProblemData(data);

//         if (data?.starter_code) {
//           setCode(
//             data.starter_code.javascript ||
//               data.starter_code.python ||
//               ""
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching problem:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblemData();
//   }, [problemId]);

//   const handleExplainError = async ({ code, errorLog, problemStatement }) => {
//     // try {
//     //   const res = await aiAuthService.checkStandard();

//     //   if (!res?.data?.success) {
//     //     setIsModalOpen(true);
//     //     return;
//     //   }

//     //   setAiLoading(true);

//     //   const response = await aiAuthService.getExplainedError({
//     //     code,
//     //     errorLog,
//     //     problemStatement,
//     //   });

//     //   if (response?.success && response?.data) {
//     //     setAiPopup({
//     //       isOpen: true,
//     //       ...response.data,
//     //     });
//     //   } else {
//     //     alert("AI could not generate explanation.");
//     //   }
//     // } catch (err) {
//     //   console.error("AI Error:", err);
//     //   alert("Something went wrong while explaining the error.");
//     // } finally {
//     //   setAiLoading(false);
//     // }
//     console.log("AI Explanation requested but service not found.");
//   };

//   const closeAiPopup = () => {
//     setAiPopup({
//       isOpen: false,
//       explanation: "",
//       suggestedFix: "",
//       codeExample: "",
//       confidence: 0,
//       aiProvider: "",
//     });
//   };

//   const handleRunCode = async (code, problemId, language) => {
//     try {
//       setIsRunning(true);
//       setRunError(null);
//       setTestResults([]);
//       setConsoleOutput("");

//       const response = await problemService.runCode(
//         code,
//         problemId,
//         language
//       );

//       if (response?.success) {
//         setTestResults(response.testResults || []);
//         setOverallStatus(response.overallStatus || "unknown");
//         setConsoleOutput(response.consoleOutput || "");
//       } else {
//         setRunError(response?.message || "Execution failed");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   const handleSubmitCode = async (code, problemId, language) => {
//     try {
//       setIsRunning(true);
//       setRunError(null);
//       setTestResults([]);
//       setConsoleOutput("");

//       const response = await problemService.submitCode(
//         code,
//         problemId,
//         language
//       );

//       if (response?.success) {
//         setTestResults(response.testResults || []);
//         setOverallStatus(response.overallStatus || "unknown");
//         setConsoleOutput(response.consoleOutput || "");
//       } else {
//         setRunError(response?.message || "Submission failed");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   const handleMouseDown = (e) => {
//     e.preventDefault();
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   const handleMouseMove = (e) => {
//     const newWidth = (e.clientX / window.innerWidth) * 100;
//     setLeftWidth(Math.max(20, Math.min(80, newWidth)));
//   };

//   const handleMouseUp = () => {
//     document.removeEventListener("mousemove", handleMouseMove);
//     document.removeEventListener("mouseup", handleMouseUp);
//   };

//   useEffect(() => {
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, []);

//   if (loading && !problemData) {
//     return (
//       <UserLayout>
//         <ShimmerSkeleton />
//       </UserLayout>
//     );
//   }

//   return (
//     <UserLayout>
//       <div className="flex h-screen bg-gray-100">
//         <div style={{ width: `${leftWidth}%` }}>
//           <ProblemDetailsComponent
//             problemData={problemData}
//             loading={loading}
//             problemId={problemId}
//           />
//         </div>

//         <div
//           className="w-1 bg-gray-300 cursor-col-resize"
//           onMouseDown={handleMouseDown}
//         />

//         <div style={{ width: `${100 - leftWidth}%` }} className="flex flex-col">
//           <CompilerComponent
//             problemData={problemData}
//             code={code}
//             setCode={setCode}
//             onRunCode={handleRunCode}
//             onSubmitCode={handleSubmitCode}
//             loading={isRunning}
//           />

//           <ResultComponent
//             testResults={testResults}
//             loading={isRunning}
//             overallStatus={overallStatus}
//             error={runError}
//             consoleOutput={consoleOutput}
//             userCode={code}
//             problemData={problemData}
//             onExplainError={handleExplainError}
//           />
//         </div>
//       </div>

//       <SubscriptionModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />

//       {/* <AILoadingModal isOpen={aiLoading} />

//       <AIExplanationPopup
//         isOpen={aiPopup.isOpen}
//         onClose={closeAiPopup}
//         {...aiPopup}
//       /> */}
//     </UserLayout>
//   );
// };

// export default SingleProblemPage;
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import CompilerComponent from "../../../component/user/CompilerComponent"
import ProblemDetailsComponent from "../../../component/user/ProblemDetailsComponent"
import ResultComponent from "../../../component/user/ResultComponent"
import UserLayout from "../../../layouts/UserLayout"
import { problemService } from "../../../services/problem/problemService"
import ShimmerSkeleton from "../../../utils/shimmer/ProblemShimmer"
import { SubscriptionModal } from "../../../component/user/SubscriptionModal"

const SingleProblemPage = () => {
  const { problemId } = useParams()

  const [problemData, setProblemData] = useState(null)
  const [testResults, setTestResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [isRunning, setIsRunning] = useState(false)
  const [runError, setRunError] = useState(null)
  const [overallStatus, setOverallStatus] = useState(null)
  const [leftWidth, setLeftWidth] = useState(50)
  const [code, setCode] = useState("")
  const [consoleOutput, setConsoleOutput] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("preferred_language") || "javascript";
  })
  const [submissionResult, setSubmissionResult] = useState(null)

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setLoading(true)
        if (!problemId) return

        const response = await problemService.getSingleProblem(problemId)
        const data = response

        setProblemData(data)
      } catch (error) {
        console.error("Error fetching problem:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProblemData()
  }, [problemId])

  // Load saved code on mount or when problem/language changes
  useEffect(() => {
    if (!problemData || !problemId) return;

    const key = `code_${problemId}_${language}`;
    const savedCode = localStorage.getItem(key);

    if (savedCode) {
      setCode(savedCode);
    } else if (problemData?.starter_code) {
      setCode(problemData.starter_code[language] || problemData.starter_code.python || "");
    }
  }, [problemData, problemId, language]);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    if (problemId && language && code) {
      const key = `code_${problemId}_${language}`;
      localStorage.setItem(key, code);
    }
  }, [code, problemId, language]);

  // Save preferred language to localStorage
  useEffect(() => {
    localStorage.setItem("preferred_language", language);
  }, [language]);


  const handleExplainError = async ({ code, errorLog, problemStatement }) => {
    console.log("AI Explanation requested but service not found.")
  }

  const handleRunCode = async (code, problemId, language) => {
    try {
      setIsRunning(true)
      setRunError(null)
      setTestResults([])
      setConsoleOutput("")

      const response = await problemService.runCode(code, problemId, language)

      if (response?.success) {
        setTestResults(response.testResults || [])
        setOverallStatus(response.overallStatus || "unknown")
        setConsoleOutput(response.consoleOutput || "")
      } else {
        setRunError(response?.message || "Execution failed")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmitCode = async (code, problemId, language) => {
    try {
      setIsRunning(true)
      setRunError(null)
      setTestResults([])
      setConsoleOutput("")

      const response = await problemService.submitCode(code, problemId, language)

      if (response?.success) {
        setTestResults(response.testResults || [])
        setOverallStatus(response.overallStatus || "unknown")
        setConsoleOutput(response.consoleOutput || "")
        setSubmissionResult({
          ...response,
          isNew: true // Flag to indicate this is a fresh submission
        })
      } else {
        setRunError(response?.message || "Submission failed")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsRunning(false)
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const newWidth = (e.clientX / window.innerWidth) * 100
    setLeftWidth(Math.max(30, Math.min(70, newWidth)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  if (loading && !problemData) {
    return (
      <UserLayout fullScreen>
        <ShimmerSkeleton />
      </UserLayout>
    )
  }

  return (
    <UserLayout fullScreen>
      <div className="flex h-full bg-slate-950 overflow-hidden">
        {/* Left Panel - Problem Details */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="flex flex-col border-r border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm overflow-hidden"
        >
          <ProblemDetailsComponent 
            problemData={problemData} 
            loading={loading} 
            problemId={problemId} 
            lastSubmission={submissionResult}
          />
        </div>

        {/* Resizable Divider */}
        <div
          className={`group relative w-1.5 cursor-col-resize transition-all duration-200 ${
            isDragging
              ? "bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 w-2"
              : "bg-slate-800 hover:bg-gradient-to-b hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 hover:shadow-md hover:shadow-blue-500/30 hover:w-2"
          }`}
          onMouseDown={handleMouseDown}
        >
          {/* Drag Handle Indicator */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
            isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-0.5 h-8 bg-white/40 rounded-full"></div>
              <div className="w-0.5 h-8 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Compiler & Results */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm overflow-hidden"
        >
          <CompilerComponent
            problemData={problemData}
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onRunCode={handleRunCode}
            onSubmitCode={handleSubmitCode}
            loading={isRunning}
          />

          <ResultComponent
            testResults={testResults}
            loading={isRunning}
            overallStatus={overallStatus}
            error={runError}
            consoleOutput={consoleOutput}
            userCode={code}
            problemData={problemData}
            onExplainError={handleExplainError}
          />
        </div>
      </div>

      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </UserLayout>
  )
}

export default SingleProblemPage