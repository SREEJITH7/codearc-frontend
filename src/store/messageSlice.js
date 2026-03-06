import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axios.config";

export const fetchMessages = createAsyncThunk(
    "messages/fetchMessages",
    async (conversationId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/api/chat/messages/?conv_id=${conversationId}`);
            return { conversationId, messages: response.data.results || response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch messages");
        }
    }
);

const messageSlice = createSlice({
    name: "messages",
    initialState: {
        messagesByConversation: {},
        loading: false,
        error: null,
    },
    reducers: {
        addMessage: (state, action) => {
            const { conversationId, message } = action.payload;
            if (!state.messagesByConversation[conversationId]) {
                state.messagesByConversation[conversationId] = [];
            }
            // Check for duplicates
            if (!state.messagesByConversation[conversationId].some(m => m.id === message.id)) {
                state.messagesByConversation[conversationId].push(message);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                const { conversationId, messages } = action.payload;
                state.messagesByConversation[conversationId] = messages;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
