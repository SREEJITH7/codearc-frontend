export const validateProblem = (data) => {
  const errors = [];

  // ---------- BASIC INFO ----------
  if (!data.title || !data.title.trim()) {
    errors.push("Title is required");
  }

  if (data.problemId === "" || data.problemId === null || data.problemId === undefined) {
    errors.push("Problem ID is required");
  }

  if (!data.description || !data.description.trim()) {
    errors.push("Description is required");
  }

  if (!data.functionName || !data.functionName.trim()) {
    errors.push("Function name is required");
  }

  if (data.timeLimit === "" || data.timeLimit === null) {
    errors.push("Time limit is required");
  }

  if (data.memoryLimit === "" || data.memoryLimit === null) {
    errors.push("Memory limit is required");
  }

  // ---------- CATEGORY ----------
  const categoryId = data.category?._id || data.category?.id;
  if (!categoryId) {
    errors.push("Category is required");
  }

  // ---------- PARAMETERS ----------
  const validParameters =
    data.parameters?.filter(
      (p) => p.name?.trim() && p.type?.trim()
    ) || [];

  if (data.parameters?.length > 0 && validParameters.length === 0) {
    errors.push("Complete parameter information is required");
  }

  // ---------- EXAMPLES ----------
  const validExamples =
    data.examples?.filter(
      (ex) => ex.input?.trim() && ex.output?.trim()
    ) || [];

  if (validExamples.length === 0) {
    errors.push("At least one complete example is required");
  }

  // ---------- TEST CASES ----------
  const validTestCases =
    data.testCases?.filter((tc) => {
      const allInputsFilled =
        tc.input?.every((input) => input?.trim()) || false;
      const outputFilled = tc.output?.trim() || false;
      return allInputsFilled && outputFilled;
    }) || [];

  if (validTestCases.length === 0) {
    errors.push("At least one complete test case is required");
  }

  // Only check mismatch if parameters exist
  if (validParameters.length > 0) {
    const mismatched = data.testCases?.some(
      (tc) => tc.input?.length !== validParameters.length
    );

    if (mismatched) {
      errors.push(
        "Test case input count must match the number of parameters"
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


