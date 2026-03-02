import React, { useState, lazy, Suspense } from 'react';
import LazyMarkdown from '../common/LazyMarkdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Zap } from 'lucide-react';

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider
        text-slate-500 hover:text-slate-200 hover:bg-slate-700/60 transition-all"
    >
      {copied
        ? <><Check size={13} className="text-cyan-400"/><span className="text-cyan-400">Copied</span></>
        : <><Copy size={13}/><span>Copy</span></>}
    </button>
  );
};

const AiMessageBubble = ({ role, content }) => {
  const isUser = role === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-7 group`}
      style={{ animation: 'fadeSlideUp 0.25s ease forwards' }}
    >
       
      {!isUser && (
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25
          flex items-center justify-center mr-4 mt-1 shrink-0 shadow-lg shadow-cyan-500/5">
          <Zap size={18} className="text-cyan-400"/>
        </div>
      )}

      <div className={`max-w-[82%] rounded-2xl shadow-xl border leading-relaxed
        ${isUser
          ? 'bg-gradient-to-br from-cyan-600/80 to-blue-700/80 border-cyan-500/30 text-white rounded-tr-sm px-5 py-4 text-base'
          : 'bg-[#0d1520] border-slate-700/50 text-slate-200 rounded-tl-sm px-6 py-5 text-base'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-base leading-relaxed">{content}</p>
        ) : (
          <div className="prose prose-invert max-w-none break-words
            prose-p:text-base prose-p:leading-relaxed prose-p:mb-3 prose-p:last:mb-0
            prose-headings:text-slate-100 prose-headings:font-bold
            prose-h1:text-2xl prose-h1:mt-6 prose-h1:mb-3
            prose-h2:text-xl prose-h2:mt-5 prose-h2:mb-2
            prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
            prose-strong:text-cyan-300 prose-strong:font-semibold
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
            prose-li:text-base prose-li:my-1
            prose-ul:my-3 prose-ol:my-3
            prose-ul:ml-5 prose-ol:ml-5">
            <LazyMarkdown
              content={content}
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeStr = String(children).replace(/\n$/, '');
                  return !inline && match ? (
                    <div className="my-5 rounded-xl overflow-hidden border border-slate-700/60 shadow-2xl shadow-black/40">
                      <div className="flex items-center justify-between px-5 py-3
                        bg-[#0a0f1a] border-b border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/50"/>
                            <span className="w-3 h-3 rounded-full bg-amber-500/50"/>
                            <span className="w-3 h-3 rounded-full bg-emerald-500/50"/>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                            {match[1]}
                          </span>
                        </div>
                        <CopyButton code={codeStr}/>
                      </div>
                      <LazyMarkdown
                        content={`\`\`\`${match[1]}\n${codeStr}\n\`\`\``}
                        components={{
                          pre: ({ children }) => <div className="m-0 p-5 bg-[#060b14] text-[15px] leading-relaxed">{children}</div>
                        }}
                      />
                    </div>
                  ) : (
                    <code className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300
                      px-2 py-0.5 rounded-md text-[0.9em] font-mono" {...props}>
                      {children}
                    </code>
                  );
                },
                p:  ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-base">{children}</p>,
                ul: ({ children }) => <ul className="list-disc ml-5 my-3 space-y-1 text-base">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal ml-5 my-3 space-y-1 text-base">{children}</ol>,
                h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-3 text-slate-100">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-2 text-slate-100">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-bold mt-4 mb-2 text-slate-200">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-cyan-500/40 pl-5 my-4 text-slate-400 italic text-base">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="text-sm border-collapse w-full">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2.5 bg-slate-800 border border-slate-700/50 text-left font-semibold text-slate-300 text-sm">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2.5 border border-slate-700/50 text-slate-400 text-sm">{children}</td>
                ),
              }}
            />
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700
          flex items-center justify-center ml-4 mt-1 shrink-0 text-xs font-black text-slate-400">
          ME
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AiMessageBubble;