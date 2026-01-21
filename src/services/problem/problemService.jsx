
import { axiosInstance } from "../../config/axios.config";
 
import { ADMIN_API,USER_API, PROBLEM_API } from "../../utils/apiRoutes";

const getAllProblems = async ({ page, limit, search, status, verified }) => {
  try {
    const response = await axiosInstance.get(`${PROBLEM_API}/problems/`, {
      params: { 
        page, 
        page_size: limit, 
        search,
        difficulty: status, // Frontend passes difficulty in 'status' field
        // verified: verified // Backend currently doesn't support status filtering, adding later if needed
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch problems",
    };
  }
};


const addProblems = async (problems) => {
  try {
    const response = await axiosInstance.post(
      `${PROBLEM_API}/admin/problems/`,
      problems
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to add problem",
    };
  }
};

const updateProblem = async (problemId, data) => {
  try {
    const response = await axiosInstance.put(
      `${PROBLEM_API}/admin/problems/${problemId}/`,
      data
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update problem",
    };
  }
};

const deleteProblem = async (problemId) => {
  try {
    const response = await axiosInstance.delete(
      `${PROBLEM_API}/admin/problems/${problemId}/delete/`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to delete problem",
    };
  }
};

const getProblems = async (params) => {
  try {
    const response = await axiosInstance.get(`${PROBLEM_API}/problems/`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching problems:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch problems",
    };
  }
};

const getSingleProblem = async (problemId) => {
  try {
    const response = await axiosInstance.get(
      `${PROBLEM_API}/problems/${problemId}/`
    );
    console.log("problem response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching single problem:", error);
    throw error;
  }
};

const toggleProblemStatus = async (problemId) => {
  try {
    const response = await axiosInstance.patch(
      `${PROBLEM_API}/problems/${problemId}/toggle/`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update status",
    };
  }
};

const runCode = async (code, problemId, language) => {
  try {
    const response = await axiosInstance.post(`${PROBLEM_API}/problems/run/`, {
      code,
      problem_id: problemId,
      language,
    });
    console.log("run result", response);
    return response.data;
  } catch (error) {
    console.error("Error running code:", error);
    throw error;
  }
};

const submitCode = async (code, problemId, language) => {
  try {
    const response = await axiosInstance.post(`${PROBLEM_API}/problems/submit/`, {
      code,
      problem_id: problemId,
      language,
    });
    console.log("submit result", response);
    return response.data;
  } catch (error) {
    console.error("Error submitting code:", error);
    throw error;
  }
};

const getUserSubmissions = async (problemId) => {
  try {
    const response = await axiosInstance.get(`${PROBLEM_API}/problems/${problemId}/submissions/me/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    throw error;
  }
};

const allSubmissions = async (problemId) => {
  try {
    console.log("fetching submissions for problem:", problemId);
    const response = await axiosInstance.get(`${PROBLEM_API}/problems/${problemId}/submissions/`);
    console.log("allSubmissions response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

export const problemService = {
  getAllProblems,
  addProblems,
  updateProblem,
  getProblems,
  getSingleProblem,
  toggleProblemStatus,
  runCode,
  submitCode,
  getUserSubmissions,
  allSubmissions,
  deleteProblem,
};
