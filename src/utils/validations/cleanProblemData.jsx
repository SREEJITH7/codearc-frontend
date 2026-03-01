export const cleanProblemData = (data, isEdit) => {
  return {
    title: data.title,
    description: data.description,
    difficulty: data.difficulty ? data.difficulty.toUpperCase() : "EASY",
    tags: data.tags,
    constraints: data.constraints, 
    examples: data.examples,
    hints: data.hints,
    function_name: data.functionName,
    parameters: data.parameters,
    return_type: data.returnType,
    solution: data.solution,
    category_id: data.category?._id || data.category?.id || null, 
    starter_code: data.starterCode,
    time_limit: data.timeLimit,
    memory_limit: data.memoryLimit,
    is_premium: data.isPremium,
    visible: data.visible,
    
    testcases: data.testCases?.map(tc => ({
        input: tc.input,
        expected_output: tc.output,
        is_sample: false, 
        order: 0
    })) || []
  };
};