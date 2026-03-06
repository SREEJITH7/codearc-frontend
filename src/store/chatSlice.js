import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axios.config";

export const fetchConversations = createAsyncThunk(
    "chat/fetchConversations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/api/chat/conversations/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch conversations");
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        conversations: [],
        activeConversation: null,
        loading: false,
        error: null,
    },
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
        },
        updateLastMessage: (state, action) => {
            const { conversationId, message } = action.payload;
            const conversation = state.conversations.find((c) => c.id === conversationId);
            if (conversation) {
                conversation.last_message = message;
            }
        },
        incrementUnreadCount: (state, action) => {
            const { conversationId } = action.payload;
            const conversation = state.conversations.find((c) => c.id === conversationId);
            if (conversation && state.activeConversation?.id !== conversationId) {
                conversation.unread_count = (conversation.unread_count || 0) + 1;
            }
        },
        resetUnreadCount: (state, action) => {
            const { conversationId } = action.payload;
            const conversation = state.conversations.find((c) => c.id === conversationId);
            if (conversation) {
                conversation.unread_count = 0;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.loading = false;
                // Handle both paginated {results:[]} and plain array responses
                state.conversations = action.payload.results ?? action.payload;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setActiveConversation, updateLastMessage, incrementUnreadCount, resetUnreadCount } = chatSlice.actions;
export default chatSlice.reducer;
