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
  const [topHeight, setTopHeight] = useState(60) // Default 60% for compiler
  const [isDraggingVertical, setIsDraggingVertical] = useState(false)
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
    setIsDraggingVertical(false)
  }

  const handleVerticalMouseDown = (e) => {
    e.preventDefault()
    setIsDraggingVertical(true)
  }

  const handleVerticalMouseMove = (e) => {
    if (!isDraggingVertical) return
    const container = document.getElementById('right-panel')
    if (!container) return
    const rect = container.getBoundingClientRect()
    const newHeight = ((e.clientY - rect.top) / rect.height) * 100
    setTopHeight(Math.max(20, Math.min(80, newHeight)))
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else if (isDraggingVertical) {
      document.addEventListener("mousemove", handleVerticalMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleVerticalMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousemove", handleVerticalMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isDraggingVertical])

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
          id="right-panel"
          style={{ width: `${100 - leftWidth}%` }}
          className="flex flex-col bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm overflow-hidden relative"
        >
          <div style={{ height: `${topHeight}%` }} className="flex flex-col overflow-hidden">
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
          </div>

          {/* Vertical Resizable Divider */}
          <div
            className={`group relative h-1.5 cursor-row-resize transition-all duration-200 z-10 ${
              isDraggingVertical
                ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 h-2"
                : "bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 hover:shadow-md hover:shadow-blue-500/30 hover:h-2"
            }`}
            onMouseDown={handleVerticalMouseDown}
          >
            {/* Drag Handle Indicator */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
              isDraggingVertical ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}>
              <div className="flex gap-1 items-center">
                <div className="h-0.5 w-8 bg-white/40 rounded-full"></div>
                <div className="h-0.5 w-8 bg-white/40 rounded-full"></div>
              </div>
            </div>
          </div>

          <div style={{ height: `${100 - topHeight}%` }} className="flex flex-col overflow-hidden">
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
      </div>

      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </UserLayout>
  )
}

export default SingleProblemPage