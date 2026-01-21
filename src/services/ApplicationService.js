import { axiosInstance } from "../config/axios.config";

export const applicationService = {
    // Submit job application
    postJobApplication: async (formData) => {
        try {
            const response = await axiosInstance.post("/api/user/applications/", formData);
            return response.data;
        } catch (error) {
            console.error("Error in postJobApplication details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    },
};
