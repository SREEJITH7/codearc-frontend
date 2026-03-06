import React from 'react';
import RecruiterLayout from '../../../layouts/RecruiterLayout';
import ChatLayout from '../../../component/chat/ChatLayout';

const RecruiterChatPage = () => {
  return (
    <RecruiterLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-100px)]">
        <ChatLayout />
      </div>
    </RecruiterLayout>
  );
};

export default RecruiterChatPage;
