import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Send,
  Zap,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Plus,
  ArrowLeft,
  Settings,
  MoreVertical,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Code,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { aiService } from "../../services/AiService";
import { toast } from "react-toastify";
import UserLayout from "../../layouts/UserLayout";
import LazyMarkdown from "../../component/common/LazyMarkdown";
import AiSidebar from "./AiSidebar";

const AiChatPage = () => {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [usageInfo, setUsageInfo] = useState(null);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([fetchSessions(), fetchUsage()]);
      if (location.state?.initialPrompt) {
        await handleSendMessage(location.state.initialPrompt);
      }
    };
    initialize();
  }, []);

  const fetchUsage = async () => {
    try {
      const data = await aiService.getCurrentSubscription();
      setUsageInfo(data);
    } catch (err) {
      console.error("Failed to fetch usage info", err);
    }
  };

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    }
  }, [inputValue]);

  const fetchSessions = async () => {
    try {
      const data = await aiService.getSessions();
      setSessions(data);
      if (data.length > 0 && !currentSessionId) {
        setCurrentSessionId(data[0].id);
        await loadSession(data[0].id);
      }
    } catch (err) {
      toast.error("Failed to fetch chat history");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const loadSession = async (sessionId) => {
    try {
      setCurrentSessionId(sessionId);
      const data = await aiService.getSessionDetail(sessionId);
      setMessages(data.messages || []);
    } catch (err) {
      toast.error("Failed to load session");
    }
  };

  const handleSendMessage = async (text = inputValue) => {
    const messageToSend = text.trim();
    if (!messageToSend || isLoading) return;

    setInputValue("");
    setIsLoading(true);

    // Add user message optimistically
    const newUserMessage = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await aiService.sendMessage(messageToSend, currentSessionId);
      
      if (!currentSessionId && response.session_id) {
        setCurrentSessionId(response.session_id);
        fetchSessions();
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response.reply }]);
      fetchUsage(); // Update usage count after each message
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      // Remove the user message if it failed
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInputValue("");
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await aiService.deleteSession(sessionId);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        handleNewChat();
      }
      toast.success("Chat deleted");
    } catch (err) {
      toast.error("Failed to delete chat");
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", { autoClose: 1000 });
  };

  if (isInitialLoading)
    return (
      <UserLayout>
        <div className="h-full flex flex-col items-center justify-center gap-4 bg-[#060b14]">
          <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-slate-500 text-base font-mono">
            Initialising tutor…
          </p>
        </div>
      </UserLayout>
    );

  const sessionTitle = Array.isArray(sessions) ? sessions.find((s) => s.id === currentSessionId)?.title : null;

  return (
    <UserLayout fullScreen>
      <div className="flex h-full bg-[#060b14] text-slate-200 overflow-hidden">
        <AiSidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onNewChat={handleNewChat}
          onSelectSession={loadSession}
          onDeleteSession={handleDeleteSession}
        />

        {/* Main panel */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Subtle grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Header */}
          <div
            className="relative z-10 h-16 border-b border-slate-800/60 flex items-center justify-between px-8
            bg-[#060b14]/80 backdrop-blur-md flex-shrink-0"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
                  <Zap size={17} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100 leading-none">
                    {sessionTitle || "New Session"}
                  </h2>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    Powered by Groq
                  </p>
                </div>
              </div>

              {/* Usage stats badge */}
              {usageInfo?.feature_access?.ai_tutor && !usageInfo.feature_access.ai_tutor.is_pro && (
                <div className="flex items-center px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-cyan-500/5 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse" />
                  {usageInfo.feature_access.ai_tutor.remaining_queries} queries left
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-slate-500">Ready</span>
            </div>
          </div>

          {/* Chat area */}
          <div
            className="relative z-10 flex-1 overflow-y-auto px-4 py-8 md:px-10 lg:px-20"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#1e293b transparent",
            }}
          >
            {messages.length === 0 ? (
              /* Welcome state */
              <div
                className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center"
                style={{ animation: "fadeSlideUp 0.4s ease forwards" }}
              >
                <div className="relative mb-10">
                  <div className="absolute inset-0 blur-3xl bg-cyan-500/15 rounded-full scale-150" />
                  <div
                    className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                    border border-cyan-500/25 flex items-center justify-center shadow-2xl shadow-cyan-500/10"
                  >
                    <Zap size={44} className="text-cyan-400" />
                  </div>
                </div>

                <h1 className="text-4xl font-black text-white tracking-tight mb-4">
                  Master Coding with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                    AI Tutor
                  </span>
                </h1>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                  Your advanced pair programming partner. Paste code snippets,
                  ask architectural questions, or learn new algorithms with
                  context-aware guidance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                  {[
                    {
                      label: "Explain a concept",
                      text: "Explain how React useMemo works with a clear example.",
                      icon: Sparkles,
                    },
                    {
                      label: "Debug performance",
                      text: "How can I optimize a slow SQL join query in PostgreSQL?",
                      icon: Zap,
                    },
                    {
                      label: "Architecture advice",
                      text: "What are the pros and cons of Microservices vs Monolith?",
                      icon: Bot,
                    },
                    {
                      label: "Code review",
                      text: "Review this function for potential security vulnerabilities.",
                      icon: Code,
                    },
                  ].map((item, id) => (
                    <button
                      key={id}
                      onClick={() => handleSendMessage(item.text)}
                      className="group p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/40 
                        transition-all text-sm hover:translate-y-[-2px] hover:shadow-xl hover:shadow-cyan-500/5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <item.icon
                          size={16}
                          className="text-cyan-400 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-slate-200 font-bold">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-slate-500 italic line-clamp-1 group-hover:text-slate-400 transition-colors">
                        "{item.text}"
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Message list */
              <div className="max-w-4xl mx-auto space-y-8 pb-20">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${
                      msg.role === "assistant" ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center border ${
                        msg.role === "assistant"
                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                          : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <Bot size={20} />
                      ) : (
                        <User size={20} />
                      )}
                    </div>

                    <div
                      className={`group relative flex-1 min-w-0 flex flex-col ${
                        msg.role === "assistant" ? "items-start" : "items-end"
                      }`}
                    >
                      <div
                        className={`px-6 py-4 rounded-3xl text-sm leading-relaxed ${
                          msg.role === "assistant"
                            ? "bg-slate-900/40 border border-slate-800/60 text-slate-300 rounded-tl-none shadow-sm"
                            : "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/10"
                        }`}
                      >
                        <LazyMarkdown
                          content={msg.content}
                        />
                      </div>

                      {msg.role === "assistant" && (
                        <button
                          onClick={() => handleCopy(msg.content)}
                          className="mt-2 text-[10px] font-mono font-bold text-slate-600 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 bg-slate-900/40 px-2 py-1 rounded-md border border-slate-800"
                        >
                          <Copy size={10} /> COPY RESPONSE
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center border bg-cyan-500/10 border-cyan-500/20 text-cyan-400">
                      <Bot size={20} className="animate-pulse" />
                    </div>
                    <div className="flex gap-1.5 items-center px-6 py-4 rounded-3xl bg-slate-900/40 border border-slate-800/60 rounded-tl-none">
                      <span
                        className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input container */}
          <div className="relative z-20 px-4 pb-8 md:px-10 lg:px-20 bg-gradient-to-t from-[#060b14] via-[#060b14]/90 to-transparent pt-12">
            <div className="max-w-4xl mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[28px] blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-end gap-3 p-2 bg-[#0d1525] border border-slate-800 rounded-[26px] shadow-2xl focus-within:border-cyan-500/40 transition-all">
                <div className="flex-1 min-w-0">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask your coding tutor anything..."
                    className="w-full bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-600 text-base py-3 px-4 resize-none leading-relaxed"
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
                    inputValue.trim() && !isLoading
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 scale-100 active:scale-95"
                      : "bg-slate-800 text-slate-600 scale-95 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase opacity-60">
                  Shift + Enter for new line • Markdown supported
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        textarea::-webkit-scrollbar {
          width: 0;
        }
      `}</style>
    </UserLayout>
  );
};

export default AiChatPage;
