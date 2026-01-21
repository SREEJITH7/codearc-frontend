/**
 * Transform backend problem data (snake_case) to frontend format (camelCase)
 * Used when editing a problem
 */
export const transformProblemForEdit = (backendProblem) => {
  if (!backendProblem) return null;

  // Handle constraints - can be string or array
  let constraintsArray = [];
  if (Array.isArray(backendProblem.constraints)) {
    constraintsArray = backendProblem.constraints;
  } else if (typeof backendProblem.constraints === 'string' && backendProblem.constraints) {
    // Split by newlines or commas
    constraintsArray = backendProblem.constraints
      .split(/\n|,/)
      .map(c => c.trim())
      .filter(Boolean);
  }

  return {
    problemId: backendProblem.id || "",
    title: backendProblem.title || "",
    description: backendProblem.description || "",
    difficulty: backendProblem.difficulty || "Easy",
    tags: Array.isArray(backendProblem.tags) ? backendProblem.tags : [],
    constraints: constraintsArray,
    examples: Array.isArray(backendProblem.examples) && backendProblem.examples.length > 0 
      ? backendProblem.examples.map(ex => ({
          ...ex,
          input: typeof ex.input === 'string' ? ex.input : JSON.stringify(ex.input),
          output: typeof ex.output === 'string' ? ex.output : JSON.stringify(ex.output)
        }))
      : [{ input: "", output: "", explanation: "" }],
    hints: Array.isArray(backendProblem.hints) ? backendProblem.hints : [],
    
    // Function signature fields
    functionName: backendProblem.function_name || "",
    parameters: Array.isArray(backendProblem.parameters) && backendProblem.parameters.length > 0
      ? backendProblem.parameters
      : [{ name: "", type: "" }],
    returnType: backendProblem.return_type || "",
    
    // Category
    category: backendProblem.category || { _id: "", id: "", name: "" },
    
    // Code and solution
    starterCode: backendProblem.starter_code || {
      javascript: "",
      python: "",
      java: "",
      cpp: "",
    },
    solution: backendProblem.solution || "",
    
    // Test cases - transform from backend format with safety checks
    testCases: Array.isArray(backendProblem.testcases) && backendProblem.testcases.length > 0
      ? backendProblem.testcases.map((tc) => ({
          input: Array.isArray(tc.input) 
            ? tc.input.map(i => typeof i === 'string' ? i : JSON.stringify(i)) 
            : [typeof tc.input === 'string' ? tc.input : JSON.stringify(tc.input || "")],
          output: typeof tc.expected_output === 'string' 
            ? tc.expected_output 
            : JSON.stringify(tc.expected_output || tc.output || ""),
          is_sample: tc.is_sample || false,
        }))
      : [{ input: [""], output: "" }],
    
    // Limits and settings
    timeLimit: backendProblem.time_limit || 2,
    memoryLimit: backendProblem.memory_limit || 256,
    isPremium: backendProblem.is_premium || false,
    visible: backendProblem.visible !== undefined ? backendProblem.visible : true,
    
    // Keep the original ID for updates
    _id: backendProblem.id || backendProblem._id,
  };

  // Log the transformation for debugging
  console.log("Transform input (backend):", backendProblem);
  console.log("Transform output (frontend):", result);
  
  return result;
};
