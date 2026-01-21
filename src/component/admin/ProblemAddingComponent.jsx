import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { categoryService } from "../../services/problem/categoryService";
import { DropdownFilter } from "../common/DropDownFilter";
import { ADMIN_API } from "../../utils/apiRoutes";

const  ProblemAddingComponent = ({ problemData, onChange }) => {
  const [newTag, setNewTag] = useState("");
  const [newConstraint, setNewConstraint] = useState("");
  const [newHint, setNewHint] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []); 

const fetchCategories = async () => {
  try {
    setLoading(true);
    const response = await categoryService.getAllCategories();

    console.log("Full raw API response:", response);

    let categoryList = [];

    // ✅ DRF paginated response (CURRENT BACKEND)
    if (response?.results?.categories && Array.isArray(response.results.categories)) {
      categoryList = response.results.categories;
    }
    // ✅ Handle { data: { categories: [] } } structure
    else if (response?.data?.categories && Array.isArray(response.data.categories)) {
      categoryList = response.data.categories;
    }
    // ✅ Non-paginated fallback (optional)
    else if (Array.isArray(response?.data)) {
      categoryList = response.data;
    }

    if (categoryList.length > 0) {
      const options = categoryList.map((cat) => ({
        value: cat.id || cat._id,
        label: cat.name,
      }));

      setCategories(options);
      console.log("Successfully mapped categories:", options);
    } else {
      console.warn("No valid categories found in response");
      setCategories([]);
    }
  } catch (err) {
    console.error("Critical error fetching categories:", err);
    setCategories([]);
  } finally {
    setLoading(false);
  }
};


  const handleArrayAdd = (field, value) => {
    if (value.trim()) {
      const currentArray = problemData[field] || [];
      onChange(field, [...currentArray, value.trim()]);

      if (field === "tags") setNewTag("");
      if (field === "constraints") setNewConstraint("");
      if (field === "hints") setNewHint("");
    }
  };

  const handleArrayRemove = (field, index) => {
    const currentArray = problemData[field] || [];
    onChange(
      field,
      currentArray.filter((_, i) => i !== index)
    );
  };

  const addExample = () => {
    onChange("examples", [
      ...problemData.examples,
      { input: "", output: "", explanation: "" },
    ]);
  };

  const removeExample = (index) => {
    if (problemData.examples.length > 1) {
      onChange(
        "examples",
        problemData.examples.filter((_, i) => i !== index)
      );
    }
  };

  const addTestCase = () => {
    const initialInputs = problemData.parameters.map(() => "");
    onChange("testCases", [
      ...problemData.testCases,
      { input: initialInputs, output: "" },
    ]);
  };

  const removeTestCase = (index) => {
    if (problemData.testCases.length > 1) {
      onChange(
        "testCases",
        problemData.testCases.filter((_, i) => i !== index)
      );
    }
  };

  

  const addParameter = () => {
    const updatedParams = [...problemData.parameters, { name: "", type: "" }];
    onChange("parameters", updatedParams);

    const updatedTestCases = problemData.testCases.map((testCase) => ({
      ...testCase,
      input: [...testCase.input, ""],
    }));
    onChange("testCases", updatedTestCases);
  };

  const removeParameter = (index) => {
    if (problemData.parameters.length > 1) {
      const updatedParams = problemData.parameters.filter((_, i) => i !== index);
      onChange("parameters", updatedParams);

      const updatedTestCases = problemData.testCases.map((testCase) => ({
        ...testCase,
        input: testCase.input.filter((_, i) => i !== index),
      }));
      onChange("testCases", updatedTestCases);
    }
  };

  const updateExample = (index, field, value) => {
    const updatedExamples = problemData.examples.map((example, i) =>
      i === index ? { ...example, [field]: value } : example
    );
    onChange("examples", updatedExamples);
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = problemData.testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    onChange("testCases", updatedTestCases);
  };

  const updateTestCaseInput = (testCaseIndex, paramIndex, value) => {
    const updatedTestCases = problemData.testCases.map((testCase, i) => {
      if (i === testCaseIndex) {
        const updatedInputs = [...testCase.input];
        updatedInputs[paramIndex] = value;
        return { ...testCase, input: updatedInputs };
      }
      return testCase;
    });
    onChange("testCases", updatedTestCases);
  };

  const updateParameter = (index, field, value) => {
    const updatedParameters = problemData.parameters.map((param, i) =>
      i === index ? { ...param, [field]: value } : param
    );
    onChange("parameters", updatedParameters);
  };

  const updateStarterCode = (language, code) => {
    onChange("starterCode", {
      ...problemData.starterCode,
      [language]: code,
    });
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Basic Information</h2>
        
        {/* Problem ID - REMOVED (Auto-generated) */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Problem ID
          </label>
          <input
            type="number"
            value={problemData.problemId}
            onChange={(e) => onChange("problemId", e.target.value)}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
            placeholder="e.g., 1"
          />
        </div> */}

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={problemData.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
            placeholder="e.g., Two Sum"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={problemData.description}
            onChange={(e) => onChange("description", e.target.value)}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white h-32"
            placeholder="Problem description..."
          />
        </div>

        {/* Difficulty and Category Row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              value={problemData.difficulty}
              onChange={(e) => onChange("difficulty", e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category {loading && <span className="text-xs">(Loading...)</span>}
            </label>
            {loading ? (
              <div className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-gray-400">
                Loading categories...
              </div>
            ) : categories.length > 0 ? (
              <DropdownFilter
                options={categories}
                value={problemData.category?._id || problemData.category?.id || ""}
                onChange={(value) => {
                  const selected = categories.find(c => c.value === value);
                  onChange("category", {
                    _id: value,
                    id: value,
                    name: selected?.label || ""
                  });
                }}
                placeholder="Select category"
              />
            ) : (
              <div className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-red-400">
                No categories available. Please add categories first.
              </div>
            )}
          </div>
        </div>

        {/* Premium and Visible Checkboxes */}
        <div className="flex gap-6 mb-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={problemData.isPremium}
              onChange={(e) => onChange("isPremium", e.target.checked)}
              className="mr-2"
            />
            Premium Problem
          </label>
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              checked={problemData.visible}
              onChange={(e) => onChange("visible", e.target.checked)}
              className="mr-2"
            />
            Visible
          </label>
        </div>
      </div>

      {/* Tags */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Tags</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleArrayAdd("tags", newTag)}
            className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            placeholder="Add a tag (e.g., Array, Hash Table)"
          />
          <button
            onClick={() => handleArrayAdd("tags", newTag)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {problemData.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-slate-700 px-3 py-1 rounded-full text-white flex items-center gap-2"
            >
              {tag}
              <Trash2
                size={14}
                className="cursor-pointer text-red-400 hover:text-red-300"
                onClick={() => handleArrayRemove("tags", index)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Examples</h2>
          <button
            onClick={addExample}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} /> Add Example
          </button>
        </div>
        {problemData.examples?.map((example, index) => (
          <div key={index} className="mb-4 p-4 bg-slate-700 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white">Example {index + 1}</h3>
              {problemData.examples.length > 1 && (
                <button
                  onClick={() => removeExample(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <input
              type="text"
              value={example.input}
              onChange={(e) => updateExample(index, "input", e.target.value)}
              className="w-full p-2 mb-2 bg-slate-600 border border-slate-500 rounded text-white"
              placeholder="Input"
            />
            <input
              type="text"
              value={example.output}
              onChange={(e) => updateExample(index, "output", e.target.value)}
              className="w-full p-2 mb-2 bg-slate-600 border border-slate-500 rounded text-white"
              placeholder="Output"
            />
            <textarea
              value={example.explanation}
              onChange={(e) => updateExample(index, "explanation", e.target.value)}
              className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-white"
              placeholder="Explanation"
            />
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Constraints</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newConstraint}
            onChange={(e) => setNewConstraint(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && handleArrayAdd("constraints", newConstraint)
            }
            className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            placeholder="Add a constraint"
          />
          <button
            onClick={() => handleArrayAdd("constraints", newConstraint)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <ul className="list-disc ml-6 mt-2">
          {problemData.constraints?.map((constraint, index) => (
            <li key={index} className="text-white flex justify-between items-center mb-1">
              <span>{constraint}</span>
              <Trash2
                size={14}
                className="cursor-pointer text-red-400 hover:text-red-300"
                onClick={() => handleArrayRemove("constraints", index)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Function Signature */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Function Signature</h2>
        
        {/* Function Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Function Name
          </label>
          <input
            type="text"
            value={problemData.functionName}
            onChange={(e) => onChange("functionName", e.target.value)}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
            placeholder="e.g., twoSum"
          />
        </div>

        {/* Parameters */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-300">
              Parameters
            </label>
            <button
              onClick={addParameter}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1 text-sm"
            >
              <Plus size={14} /> Add Parameter
            </button>
          </div>
          {problemData.parameters?.map((param, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={param.name}
                onChange={(e) => updateParameter(index, "name", e.target.value)}
                className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded text-white"
                placeholder="Parameter name"
              />
              <input
                type="text"
                value={param.type}
                onChange={(e) => updateParameter(index, "type", e.target.value)}
                className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded text-white"
                placeholder="Type (e.g., int[], string)"
              />
              {problemData.parameters.length > 1 && (
                <button
                  onClick={() => removeParameter(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Return Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Return Type
          </label>
          <input
            type="text"
            value={problemData.returnType}
            onChange={(e) => onChange("returnType", e.target.value)}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
            placeholder="e.g., int[], boolean"
          />
        </div>
      </div>

      {/* Test Cases */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Test Cases</h2>
          <button
            onClick={addTestCase}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            <Plus size={16} /> Add Test Case
          </button>
        </div>
        {problemData.testCases?.map((testCase, tcIndex) => (
          <div key={tcIndex} className="mb-4 p-4 bg-slate-700 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-white">Test Case {tcIndex + 1}</h3>
              {problemData.testCases.length > 1 && (
                <button
                  onClick={() => removeTestCase(tcIndex)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            
            {/* Input fields for each parameter */}
            {problemData.parameters?.map((param, paramIndex) => (
              <div key={paramIndex} className="mb-2">
                <label className="block text-sm text-gray-400 mb-1">
                  {param.name} ({param.type})
                </label>
                <input
                  type="text"
                  value={testCase.input[paramIndex] || ""}
                  onChange={(e) =>
                    updateTestCaseInput(tcIndex, paramIndex, e.target.value)
                  }
                  className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-white"
                  placeholder={`Value for ${param.name}`}
                />
              </div>
            ))}
            
            {/* Expected Output */}
            <div className="mt-2">
              <label className="block text-sm text-gray-400 mb-1">
                Expected Output
              </label>
              <input
                type="text"
                value={testCase.output}
                onChange={(e) => updateTestCase(tcIndex, "output", e.target.value)}
                className="w-full p-2 bg-slate-600 border border-slate-500 rounded text-white"
                placeholder="Expected output"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Starter Code */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Starter Code</h2>
        
        {["javascript", "python", "java", "cpp"].map((lang) => (
          <div key={lang} className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
              {lang === "cpp" ? "C++" : lang}
            </label>
            <textarea
              value={problemData.starterCode?.[lang] || ""}
              onChange={(e) => updateStarterCode(lang, e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white font-mono h-24"
              placeholder={`Starter code for ${lang}...`}
            />
          </div>
        ))}
      </div>

      {/* Hints */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Hints</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newHint}
            onChange={(e) => setNewHint(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleArrayAdd("hints", newHint)}
            className="flex-1 p-2 bg-slate-700 border border-slate-600 rounded text-white"
            placeholder="Add a hint"
          />
          <button
            onClick={() => handleArrayAdd("hints", newHint)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} /> Add
          </button>
        </div>
        <ul className="list-decimal ml-6 mt-2">
          {problemData.hints?.map((hint, index) => (
            <li key={index} className="text-white flex justify-between items-center mb-2">
              <span>{hint}</span>
              <Trash2
                size={14}
                className="cursor-pointer text-red-400 hover:text-red-300"
                onClick={() => handleArrayRemove("hints", index)}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Solution */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Solution (Optional)</h2>
        <textarea
          value={problemData.solution}
          onChange={(e) => onChange("solution", e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white font-mono h-48"
          placeholder="Detailed solution explanation..."
        />
      </div>

      {/* Limits */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Limits</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time Limit (seconds)
            </label>
            <input
              type="number"
              value={problemData.timeLimit}
              onChange={(e) => onChange("timeLimit", e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="e.g., 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Memory Limit (MB)
            </label>
            <input
              type="number"
              value={problemData.memoryLimit}
              onChange={(e) => onChange("memoryLimit", e.target.value)}
              className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
              placeholder="e.g., 256"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemAddingComponent;