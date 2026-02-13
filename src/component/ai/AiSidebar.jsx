import React from 'react';
import { MessageSquare, Plus, Trash2, Clock, Bot } from 'lucide-react';

const AiSidebar = ({ sessions, currentSessionId, onNewChat, onSelectSession, onDeleteSession }) => {
    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
                    <Bot size={24} className="animate-pulse" />
                    <span>CodeArc Tutor</span>
                </div>
                
                <button
                    onClick={onNewChat}
                    className="flex items-center gap-2 w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/20 text-sm font-medium"
                >
                    <Plus size={18} />
                    New Chat
                </button>
            </div>

            {/* Session List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <div className="text-[10px] uppercase font-bold text-slate-500 px-3 py-2 flex items-center gap-1.5">
                    <Clock size={12} />
                    Recent Chats
                </div>
                
                <div className="space-y-1">
                    {sessions.length === 0 ? (
                        <div className="px-3 py-8 text-center">
                            <p className="text-slate-500 text-xs italic">No previous chats</p>
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session.id}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 border ${
                                    currentSessionId === session.id
                                        ? "bg-slate-800 border-indigo-500/30 text-white shadow-md shadow-black/20"
                                        : "hover:bg-slate-800/50 border-transparent text-slate-400 hover:text-slate-200"
                                }`}
                                onClick={() => onSelectSession(session.id)}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <MessageSquare size={16} className={currentSessionId === session.id ? "text-indigo-400" : "text-slate-500"} />
                                    <span className="text-sm truncate font-medium">{session.title}</span>
                                </div>
                                
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteSession(session.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-slate-500 transition-all rounded hover:bg-red-400/10"
                                    title="Delete chat"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Footer/User Info */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/30">
                <div className="flex items-center gap-3 px-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">
                        U
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-xs font-medium text-slate-300 truncate">Pro Account</p>
                        <p className="text-[10px] text-indigo-400 font-mono">AI Tutor Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiSidebar;
