import React from 'react';
import UserNavbar from '../../../component/user/UserNavbar';
import ChatLayout from '../../../component/chat/ChatLayout';

const UserChatPage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <UserNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-100px)]">
        <ChatLayout />
      </div>
    </div>
  );
};

export default UserChatPage;
