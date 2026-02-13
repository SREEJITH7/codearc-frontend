import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Sparkles, Bot } from 'lucide-react';
import UserLayout from '../../layouts/UserLayout';
import AiMessageBubble from '../../component/ai/AiMeassageBubble';
import AiSidebar from '../../component/ai/AiSidebar';
import { aiService } from '../../services/AiService';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const AiChatPage = () => {
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const initialize = async () => {
            await fetchSessions();
            
            // Handle initial prompt from navigation (e.g., Explain Error)
            if (location.state?.initialPrompt) {
                await handleSendMessage(location.state.initialPrompt);
            }
        };
        initialize();
    }, []);

    const fetchSessions = async () => {
        try {
            const data = await aiService.getSessions();
            setSessions(data);
            setIsInitialLoading(false);
        } catch (error) {
            console.error("Failed to fetch sessions", error);
            setIsInitialLoading(false);
        }
    };

    const loadSession = async (sessionId) => {
        setIsLoading(true);
        try {
            const data = await aiService.getSessionDetail(sessionId);
            setMessages(data.messages);
            setCurrentSessionId(sessionId);
        } catch (error) {
            toast.error("Failed to load session");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setCurrentSessionId(null);
        setInput("");
    };

    const handleSendMessage = async (eOrMsg) => {
        const msgText = typeof eOrMsg === 'string' ? eOrMsg : input;
        
        // Handle event preventDefault safely
        if (eOrMsg && typeof eOrMsg === 'object' && eOrMsg.preventDefault) {
            eOrMsg.preventDefault();
        }

        if (!msgText.trim()) return;

        const userMsg = { role: 'user', content: msgText };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await aiService.sendMessage(msgText, currentSessionId);
            if (response.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: response.reply }]);
                
                // If it was a new session, update state
                if (!currentSessionId) {
                    setCurrentSessionId(response.session_id);
                    await fetchSessions();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteSession = async (sessionId) => {
        try {
            await aiService.deleteSession(sessionId);
            if (currentSessionId === sessionId) {
                handleNewChat();
            }
            fetchSessions();
            toast.success("Chat deleted");
        } catch (error) {
            toast.error("Failed to delete chat");
        }
    };

    if (isInitialLoading) {
        return (
            <UserLayout>
                <div className="h-full flex items-center justify-center bg-slate-950">
                    <Loader2 className="animate-spin text-indigo-500" size={40} />
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout fullScreen>
            <div className="flex h-full bg-slate-950 text-slate-200 overflow-hidden font-sans">
                {/* Sidebar */}
                <AiSidebar
                    sessions={sessions}
                    currentSessionId={currentSessionId}
                    onNewChat={handleNewChat}
                    onSelectSession={loadSession}
                    onDeleteSession={handleDeleteSession}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col relative min-w-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                    {/* Header */}
                    <div className="h-16 border-b border-slate-800/50 flex items-center px-8 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                                <Sparkles className="text-indigo-400" size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-100 tracking-tight">
                                    {currentSessionId 
                                        ? sessions.find(s => s.id === currentSessionId)?.title || "Chat Session"
                                        : "New Concept Assistant"}
                                </h2>
                                <p className="text-[10px] text-indigo-400/80 uppercase font-bold tracking-widest">Powered by GPT-4o</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto px-4 py-8 md:px-12 lg:px-24 custom-scrollbar">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full animate-pulse"></div>
                                    <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl transition-transform hover:scale-105 duration-300">
                                        <Bot size={48} className="text-white" />
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                                        Master Coding with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">AI Tutor</span>
                                    </h1>
                                    <p className="text-slate-400 text-lg leading-relaxed">
                                        Your personalized programming mentor. Ask about algorithms, debug your code, 
                                        or learn new tech stacks with guided explanations.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-12">
                                    {[
                                        "Explain React Hooks with an example",
                                        "How does Merge Sort work?",
                                        "What is a REST API?",
                                        "Explain Docker containers simply"
                                    ].map((prompt) => (
                                        <button
                                            key={prompt}
                                            onClick={() => handleSendMessage(prompt)}
                                            className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-left transition-all group"
                                        >
                                            <p className="text-sm text-slate-300 font-medium group-hover:text-indigo-400">{prompt}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-4xl mx-auto space-y-2">
                                {messages.map((msg, idx) => (
                                    <AiMessageBubble key={idx} role={msg.role} content={msg.content} />
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start mb-6 animate-pulse">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500 mr-3 shrink-0"></div>
                                        <div className="bg-slate-800/80 border border-slate-700/50 px-6 py-4 rounded-2xl rounded-tl-none">
                                            <div className="flex gap-2">
                                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 md:px-12 lg:px-24">
                        <div className="max-w-4xl mx-auto relative group">
                            <form 
                                onSubmit={(e) => handleSendMessage(e)}
                                className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl focus-within:border-indigo-500/50 transition-all p-1.5 pr-2"
                            >
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything about coding..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-500 py-3 px-4 resize-none h-14 min-h-[56px] custom-scrollbar"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            handleSendMessage(e);
                                        }
                                    }}
                                />
                                <div className="flex justify-end p-2 border-t border-slate-800/50 bg-slate-900/30 rounded-b-xl">
                                    <button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-600 p-2.5 rounded-xl transition-all duration-200 shadow-lg text-white group-hover:scale-105 active:scale-95"
                                    >
                                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                    </button>
                                </div>
                            </form>
                            <p className="text-[10px] text-center mt-3 text-slate-600 uppercase font-medium tracking-widest">
                                AI Tutor can make mistakes. Verify important information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default AiChatPage;