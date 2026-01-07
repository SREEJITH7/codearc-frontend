
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";  

import ProblemAddingComponent from "../../../component/admin/ProblemAddingComponent";
import { AdminLayout } from "../../../layouts/AdminLayouts";
import { problemService } from "../../../services/problem/problemService";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

import { validateProblem } from "../../../utils/validations/ProblemAddingValidation";
import { cleanProblemData } from "../../../utils/validations/cleanProblemData";

const ProblemAddingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editProblem = location.state?.problem;

  const [formErrors, setFormErrors] = useState([]);

  const [problemData, setProblemData] = useState(() => {
    if (editProblem) {
      // Migrate old testCases format if needed
      const migrated = {
        ...editProblem,
        testCases: editProblem.testCases?.map((tc) => ({
          ...tc,
          input: Array.isArray(tc.input) ? tc.input : [tc.input],
        })) || [{ input: [""], output: "" }],
      };
      return migrated;
    }

    // Default new problem structure
    return {
      problemId: "",
      title: "",
      description: "",
      difficulty: "Easy",
      tags: [],
      constraints: [],
      examples: [{ input: "", output: "", explanation: "" }],
      testCases: [{ input: [""], output: "" }],
      functionName: "",
      parameters: [{ name: "", type: "" }],
      returnType: "",
      category: { _id: "", name: "" },
      solution: "",
      timeLimit: 2,
      memoryLimit: 256,
      starterCode: {
        javascript: "",
        python: "",
        java: "",
        cpp: "",
      },
      hints: [],
      isPremium: false,
      visible: true,
    };
  });

  const handleChange = (field, value) => {
    setProblemData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    navigate("/admin/problems");
  };

  const handleSubmit = async () => {
    try {
      const validation = validateProblem(problemData);

      if (!validation.isValid) {
        setFormErrors(validation.errors);
        toast.error("Please fix the errors before submitting");
        return;
      }

      setFormErrors([]);

      const cleanedData = cleanProblemData(problemData, !!editProblem);

      let response;
      if (editProblem?._id) {
        response = await problemService.updateProblem(editProblem._id, cleanedData);
      } else {
        response = await problemService.addProblems(cleanedData);
      }

      if (response.success) {
        toast.success(
          editProblem
            ? "Problem updated successfully!"
            : "Problem created successfully!"
        );
        navigate("/admin/problems");
      } else {
        toast.error(response.message || "Failed to save problem");
      }
    } catch (error) {
      console.error("Error saving problem:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="group mb-8 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Problems</span>
        </button>

        {/* Error Messages */}
        {formErrors.length > 0 && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-950/50 p-4 text-red-300">
            <p className="mb-2 font-medium">Please fix the following errors:</p>
            <ul className="list-disc space-y-1 pl-5">
              {formErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <h1 className="mb-8 text-3xl font-bold text-white">
          {editProblem ? "Edit Problem" : "Create New Problem"}
        </h1>

        <ProblemAddingComponent
          problemData={problemData}
          onChange={handleChange}
        />

        {/* Submit Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-3 font-medium text-white shadow-lg transition-all hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            {editProblem ? "Update Problem" : "Create Problem"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProblemAddingPage;