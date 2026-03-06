import React from 'react';

const MessageBubble = ({ message, isOwn }) => {
  const timestamp = message.timestamp ? new Date(message.timestamp) : new Date();
  
  const timeStr = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(timestamp);

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
        isOwn 
          ? 'bg-blue-600 text-white rounded-tr-none' 
          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
      }`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className={`text-[10px] mt-1 text-right ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
          {timeStr}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
