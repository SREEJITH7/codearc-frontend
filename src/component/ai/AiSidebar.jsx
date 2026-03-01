
import React from 'react';
import { MessageSquare, Plus, Trash2, Zap, Hash } from 'lucide-react';

const AiSidebar = ({ sessions, currentSessionId, onNewChat, onSelectSession, onDeleteSession }) => {
  return (
    <div className="w-72 flex flex-col h-full shrink-0 bg-[#080c14] border-r border-slate-800/60">
      
      <div className="px-6 pt-7 pb-6 border-b border-slate-800/60">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Zap size={20} className="text-cyan-400" />
          </div>
          <div>
            <p className="text-white font-bold text-base tracking-tight leading-none">CodeArc Tutor</p>
            <p className="text-xs text-cyan-500/70 font-mono tracking-widest uppercase mt-0.5">Groq-powered</p>
          </div>
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
            bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/25 hover:border-cyan-500/50
            text-cyan-300 text-sm font-bold transition-all duration-200 group"
        >
          <Plus size={17} className="group-hover:rotate-90 transition-transform duration-200"/>
          New Chat
        </button>
      </div>

       
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1"
        style={{ scrollbarWidth: 'none' }}>
        <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.15em] px-3 py-2 flex items-center gap-2">
          <Hash size={12}/>Recent Chats
        </p>

        {!Array.isArray(sessions) || sessions.length === 0 ? (
          <div className="px-2 py-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-slate-800/50 border border-slate-700/40 flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={20} className="text-slate-600"/>
            </div>
            <p className="text-slate-600 text-sm">
              {!Array.isArray(sessions) ? "Loading…" : "No chats yet"}
            </p>
          </div>
        ) : (
          sessions.map((session) => {
            const isActive = currentSessionId === session.id;
            return (
              <div
                key={session.id}
                onClick={() => onSelectSession(session.id)}
                className={`group flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer
                  transition-all duration-150 border
                  ${isActive
                    ? 'bg-cyan-500/10 border-cyan-500/25 text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                  }`}
              >
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                  <MessageSquare size={15} className={isActive ? "text-cyan-400 flex-shrink-0" : "text-slate-600 flex-shrink-0"}/>
                  <span className="text-sm truncate font-medium">{session.title}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-600
                    hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
                >
                  <Trash2 size={14}/>
                </button>
              </div>
            );
          })
        )}
      </div>

       
      <div className="p-5 border-t border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/20 flex items-center justify-center text-sm font-black text-cyan-300">
            U
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-300">Pro Account</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"/>
              <p className="text-xs text-cyan-500 font-mono">AI Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiSidebar;