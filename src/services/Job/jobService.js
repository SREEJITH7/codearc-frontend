import { axiosInstance } from "../../config/axios.config";

export const jobService = {

    postJobDetails: async (jobData) => {
        try {
            const response = await axiosInstance.post("/api/recruiter/jobs/", jobData);
            return response.data;
        } catch (error) {
            console.error("Error in postJobDetails:", error);
            throw error;
        }
    },

    
    updateJobDetails: async (jobId, jobData) => {
        try {
            const response = await axiosInstance.put(`/api/recruiter/jobs/${jobId}/`, jobData);
            return response.data;
        } catch (error) {
            console.error("Error in updateJobDetails:", error);
            throw error;
        }
    },

    
    getJobs: async () => {
        try {
            const response = await axiosInstance.get("/api/recruiter/jobs/");
            return response.data;
        } catch (error) {
            console.error("Error in getJobs:", error);
            throw error;
        }
    },

    
    getJobById: async (jobId) => {
        try {
            const response = await axiosInstance.get(`/api/recruiter/jobs/${jobId}/`);
            return response.data;
        } catch (error) {
            console.error("Error in getJobById:", error);
            throw error;
        }
    },

    // Fetch location suggestions using OpenStreetMap Nominatim API
    fetchLocationSuggestions: async (query) => {
        try {
            const response = await axiosInstance.get(`/api/recruiter/jobs/locations/?q=${encodeURIComponent(query)}`);
            return response;
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
            return { data: { success: false, data: [] } };
        }
    },

    
    viewAllJobs: async ({ page = 1, limit = 6, search, status, workmode, worktime }) => {
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);
            if (search) params.append('search', search);
            if (status) params.append('status', status);
            if (workmode) params.append('workmode', workmode);
            if (worktime) params.append('worktime', worktime);

            const response = await axiosInstance.get(`/api/recruiter/jobs/?${params.toString()}`);
            return response;
        } catch (error) {
            console.error("Error in viewAllJobs:", error);
            throw error;
        }
    },

    
    toggleJobStatus: async (jobId) => {
        try {
            const response = await axiosInstance.patch(`/api/recruiter/jobs/${jobId}/toggle_status/`);
            return response;
        } catch (error) {
            console.error("Error in toggleJobStatus:", error);
            throw error;
        }
    },

    
    jobDetails: async ({ page = 1, limit = 6, search, status, workmode, worktime, skills, location }) => {
        try {
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', limit);
            if (search) params.append('search', search);
            if (status) params.append('status', status);
            if (workmode) params.append('workmode', workmode);
            if (worktime) params.append('worktime', worktime);
            if (skills) params.append('skills', skills);
            if (location) params.append('location', location);

            const response = await axiosInstance.get(`/api/user/jobs/?${params.toString()}`);
            return response;
        } catch (error) {
            console.error("Error in jobDetails:", error);
            throw error;
        }
    },

    
    getSingleJob: async (jobId) => {
        try {
            const response = await axiosInstance.get(`/api/user/jobs/${jobId}/`);
            return response;
        } catch (error) {
            console.error("Error in getSingleJob:", error);
            throw error;
        }
    },
};
