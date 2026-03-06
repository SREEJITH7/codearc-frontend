import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import { fetchConversations, setActiveConversation } from '../../store/chatSlice';

const ChatLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { activeConversation, conversations, loading } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  // Handle automatic selection via query param
  useEffect(() => {
    if (!loading && conversations.length > 0) {
      const queryParams = new URLSearchParams(location.search);
      const appId = queryParams.get('applicationId');
      
      if (appId && !activeConversation) {
        const targetConv = conversations.find(c => c.application_id === appId);
        if (targetConv) {
          dispatch(setActiveConversation(targetConv));
        }
      }
    }
  }, [conversations, loading, location.search, activeConversation, dispatch]);

  const handleSelectConversation = (conv) => {
    dispatch(setActiveConversation(conv));
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50 overflow-hidden rounded-xl border border-gray-200 shadow-sm mt-4 mx-4">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading conversations...</div>
          ) : (
            <ConversationList 
              conversations={conversations} 
              activeId={activeConversation?.id} 
              onSelect={handleSelectConversation} 
            />
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white flex flex-col">
        {activeConversation ? (
          <ChatWindow conversation={activeConversation} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600">Your Messages</h3>
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
