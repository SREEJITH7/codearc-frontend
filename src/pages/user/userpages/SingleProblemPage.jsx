import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CompilerComponent from "../../../component/user/CompilerComponent";
import ProblemDetailsComponent from "../../../component/user/ProblemDetailsComponent";
import ResultComponent from "../../../component/user/ResultComponent";
import UserLayout from "../../../layouts/UserLayout";

import { aiAuthService } from "../../../service/AiService";
import { problemService } from "../../../service/problemService";

import ShimmerSkeleton from "../../../utils/shimmer/ProblemShimmer";
import AIExplanationPopup from "../../../component/user/AIExplanationPopup";
import AILoadingModal from "../../../utils/AILoadingModal";
import { SubscriptionModal } from "../../../component/user/SubscriptionModal";

const SingleProblemPage = () => {
  const { problemId } = useParams();

  const [problemData, setProblemData] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState(null);
  const [overallStatus, setOverallStatus] = useState(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const [code, setCode] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [allSubmissions, setAllSubmissions] = useState(null);

  const [aiPopup, setAiPopup] = useState({
    isOpen: false,
    explanation: "",
    suggestedFix: "",
    codeExample: "",
    confidence: 0,
    aiProvider: "",
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setLoading(true);
        if (!problemId) return;

        const response = await problemService.getSingleProblem(problemId);
        const data = response?.data?.data;

        setProblemData(data);

        if (data?.starterCode) {
          setCode(
            data.starterCode.javascript ||
              data.starterCode.python ||
              ""
          );
        }
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemData();
  }, [problemId]);

  const handleExplainError = async ({ code, errorLog, problemStatement }) => {
    try {
      const res = await aiAuthService.checkStandard();

      if (!res?.data?.success) {
        setIsModalOpen(true);
        return;
      }

      setAiLoading(true);

      const response = await aiAuthService.getExplainedError({
        code,
        errorLog,
        problemStatement,
      });

      if (response?.success && response?.data) {
        setAiPopup({
          isOpen: true,
          ...response.data,
        });
      } else {
        alert("AI could not generate explanation.");
      }
    } catch (err) {
      console.error("AI Error:", err);
      alert("Something went wrong while explaining the error.");
    } finally {
      setAiLoading(false);
    }
  };

  const closeAiPopup = () => {
    setAiPopup({
      isOpen: false,
      explanation: "",
      suggestedFix: "",
      codeExample: "",
      confidence: 0,
      aiProvider: "",
    });
  };

  const handleRunCode = async (code, problemId, language) => {
    try {
      setIsRunning(true);
      setRunError(null);
      setTestResults([]);
      setConsoleOutput("");

      const response = await problemService.runCode(
        code,
        problemId,
        language
      );

      if (response?.success) {
        setTestResults(response.testResults || []);
        setOverallStatus(response.overallStatus || "unknown");
        setConsoleOutput(response.consoleOutput || "");
      } else {
        setRunError(response?.message || "Execution failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async (code, problemId, language) => {
    try {
      setIsRunning(true);
      setRunError(null);
      setTestResults([]);
      setConsoleOutput("");

      const response = await problemService.submitCode(
        code,
        problemId,
        language
      );

      if (response?.success) {
        setTestResults(response.testResults || []);
        setOverallStatus(response.overallStatus || "unknown");
        setConsoleOutput(response.consoleOutput || "");
      } else {
        setRunError(response?.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    setLeftWidth(Math.max(20, Math.min(80, newWidth)));
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (loading && !problemData) {
    return (
      <UserLayout>
        <ShimmerSkeleton />
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="flex h-screen bg-gray-100">
        <div style={{ width: `${leftWidth}%` }}>
          <ProblemDetailsComponent
            problemData={problemData}
            loading={loading}
            problemId={problemId}
          />
        </div>

        <div
          className="w-1 bg-gray-300 cursor-col-resize"
          onMouseDown={handleMouseDown}
        />

        <div style={{ width: `${100 - leftWidth}%` }} className="flex flex-col">
          <CompilerComponent
            problemData={problemData}
            code={code}
            setCode={setCode}
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

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <AILoadingModal isOpen={aiLoading} />

      <AIExplanationPopup
        isOpen={aiPopup.isOpen}
        onClose={closeAiPopup}
        {...aiPopup}
      />
    </UserLayout>
  );
};

export default SingleProblemPage;
