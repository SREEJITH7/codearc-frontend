import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, addMessage } from '../../store/messageSlice';
import { resetUnreadCount } from '../../store/chatSlice';
import useChatSocket from '../../hooks/useChatSocket';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatWindow = ({ conversation }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messagesByConversation[conversation.id] || []);
  const user = useSelector((state) => state.auth.user);
  const { sendMessage } = useChatSocket(conversation.id);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages(conversation.id));
    dispatch(resetUnreadCount({ conversationId: conversation.id }));
  }, [conversation.id, dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content) => {
    sendMessage(content);
  };

  const displayName = (user?.id === conversation.recruiter || String(user?.id) === String(conversation.recruiter))
    ? conversation.applicant_name 
    : conversation.company_name || conversation.applicant_name || "Unknown";

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{displayName}</h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((msg, idx) => (
          <MessageBubble 
            key={msg.id || idx} 
            message={msg} 
            isOwn={msg.sender?.id === user?.id || msg.sender_id === String(user?.id)} 
          />
        ))}
      </div>

      {/* Input Area */}
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
