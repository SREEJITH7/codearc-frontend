import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/messageSlice";
import { updateLastMessage, incrementUnreadCount } from "../store/chatSlice";

const useChatSocket = (conversationId) => {
    const dispatch = useDispatch();
    const socketRef = useRef(null);
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (!conversationId) return;

        const wsUrl = `${import.meta.env.VITE_WS_URL || "ws://localhost:8000"}/ws/chat/${conversationId}/`;
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
            console.log(`Connected to chat ${conversationId}`);
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "chat_message") {
                const newMessage = {
                    id: data.id,
                    content: data.message,
                    sender: {
                        id: data.sender_id,
                        username: data.sender_username
                    },
                    timestamp: data.timestamp
                };

                dispatch(addMessage({ conversationId, message: newMessage }));
                dispatch(updateLastMessage({
                    conversationId, message: {
                        content: data.message,
                        timestamp: data.timestamp,
                        sender_id: data.sender_id
                    }
                }));

                // Increment unread if message is not from current user
                if (data.sender_id !== user?.id) {
                    dispatch(incrementUnreadCount({ conversationId }));
                }
            }
        };

        socketRef.current.onclose = () => {
            console.log(`Disconnected from chat ${conversationId}`);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [conversationId, token, dispatch, user?.id]);

    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ message }));
        }
    };

    return { sendMessage };
};

export default useChatSocket;
