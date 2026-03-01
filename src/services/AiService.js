import { axiosInstance } from "../config/axios.config";

export const aiService = {
    sendMessage: async (message, sessionId = null) => {
        const res = await axiosInstance.post("/api/ai/chat/", {
            message,
            session_id: sessionId
        });
        return res.data;
    },

    getSessions: async () => {
        const res = await axiosInstance.get("/api/ai/sessions/");
        return res.data.data;
    },

    getSessionDetail: async (sessionId) => {
        const res = await axiosInstance.get(`/api/ai/sessions/${sessionId}/`);
        return res.data.data;
    },

    deleteSession: async (sessionId) => {
        const res = await axiosInstance.delete(`/api/ai/sessions/${sessionId}/`);
        return res.data;
    },

    getCurrentSubscription: async () => {
        const res = await axiosInstance.get("/api/subscription/current/");
        return res.data;
    }
}
