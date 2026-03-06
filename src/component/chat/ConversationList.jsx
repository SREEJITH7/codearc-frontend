import React from 'react';
import { useSelector } from 'react-redux';

const formatRelativeTime = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

const ConversationList = ({ conversations, activeId, onSelect }) => {
  const user = useSelector((state) => state.auth.user);
  if (conversations.length === 0) {
    return <div className="p-8 text-center text-gray-500">No conversations found.</div>;
  }

  return (
    <div className="divide-y divide-gray-100">
      {conversations.map((conv) => {
        const isActive = activeId === conv.id;
        
        // If current user is the recruiter, show applicant name. 
        // Otherwise (current user is applicant), show company name.
        const displayName = (user?.id === conv.recruiter || String(user?.id) === String(conv.recruiter))
          ? conv.applicant_name 
          : conv.company_name || conv.applicant_name || "Unknown";
        
        return (
          <div
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`p-4 cursor-pointer hover:bg-blue-50 transition-colors flex items-center gap-3 ${
              isActive ? 'bg-blue-50 border-r-4 border-blue-600' : ''
            }`}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold shrink-0">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h4 className="font-semibold text-gray-900 truncate">{displayName}</h4>
                {conv.last_message && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatRelativeTime(new Date(conv.last_message.timestamp))}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500 truncate mr-2">
                  {conv.last_message ? conv.last_message.content : "Start a conversation..."}
                </p>
                {conv.unread_count > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {conv.unread_count}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
