import { axiosInstance } from "../../config/axios.config";

export const adminService = {
    getAllApplicants: async ({ page = 1, limit = 10, search = "", status = "" }) => {
        try {
            const params = new URLSearchParams();
            params.append("page", page);
            params.append("limit", limit);
            if (search) params.append("search", search);
            if (status) params.append("status", status);

            const response = await axiosInstance.get(`/api/admin/applicants/?${params.toString()}`);
            return response;
        } catch (error) {
            console.error("Error in getAllApplicants:", error);
            throw error;
        }
    },
};
