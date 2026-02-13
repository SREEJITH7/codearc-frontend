import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const AiMessageBubble = ({ role, content }) => {
    const isUser = role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 group animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold mr-3 mt-1 shadow-lg shrink-0">
                    AI
                </div>
            )}
            
            <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-lg border ${
                    isUser
                        ? "bg-indigo-600 border-indigo-500 text-white rounded-tr-none"
                        : "bg-slate-800/80 border-slate-700/50 text-gray-200 rounded-tl-none font-light"
                }`}
            >
                <div className="prose prose-invert prose-sm max-w-none break-words overflow-auto">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <div className="my-4 rounded-lg overflow-hidden border border-slate-700/50 shadow-2xl">
                                        <div className="bg-slate-900 px-4 py-1.5 text-[10px] text-slate-400 font-mono flex justify-between items-center border-b border-slate-700/50">
                                            <span>{match[1].toUpperCase()}</span>
                                        </div>
                                        <SyntaxHighlighter
                                            style={tomorrow}
                                            language={match[1]}
                                            PreTag="div"
                                            customStyle={{
                                                margin: 0,
                                                padding: '1rem',
                                                fontSize: '13px',
                                                backgroundColor: '#0f172a'
                                            }}
                                            {...props}
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className={`${className} bg-slate-700/50 px-1 py-0.5 rounded text-indigo-300`} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            p: ({ children }) => <p className="mb-0 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc ml-4 my-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal ml-4 my-2">{children}</ol>,
                            h1: ({ children }) => <h1 className="text-lg font-bold my-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-md font-bold my-2">{children}</h2>,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>

            {isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-indigo-400 text-xs font-bold ml-3 mt-1 shadow-lg shrink-0 border border-slate-600">
                    ME
                </div>
            )}
        </div>
    );
}

export default AiMessageBubble;


