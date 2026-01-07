
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
    return response.data;
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
      `${ADMIN_API}/updateproblem/${problemId}`,
      data
    );
    return response.data;
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
    return response.data;
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
    return response;
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
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update status",
    };
  }
};

const runCode = async (code, problemId, language) => {
  try {
    const response = await axiosInstance.post(`${USER_API}/runcode/`, {
      code,
      problemId,
      language,
    });
    console.log("res", response);
    return response.data;
  } catch (error) {
    console.error("Error running code:", error);
    throw error;
  }
};

const submitCode = async (code, problemId, language) => {
  try {
    const response = await axiosInstance.post(`${USER_API}/submitcode/`, {
      code,
      problemId,
      language,
    });
    console.log("res", response);
    return response.data;
  } catch (error) {
    console.error("Error submitting code:", error);
    throw error;
  }
};

const allSubmissions = async (problemId) => {
  try {
    console.log("submisison ethii");
    const response = await axiosInstance.get(`${USER_API}/allsubmissions/${problemId}`);
    console.log("allsubmissions response", response);
    return response.data.data;
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
  allSubmissions,
  deleteProblem,
};
