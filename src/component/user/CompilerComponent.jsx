import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  Play,
  RotateCcw,
  Copy,
  Maximize2,
  Minimize2,
  UploadCloud,
  Check,
} from "lucide-react";
import Editor from "@monaco-editor/react";

const CompilerComponent = ({
  problemData,
  code,
  setCode,
  language,
  setLanguage,
  onRunCode,
  onSubmitCode,
  loading,
}) => {
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState(14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [minimap, setMinimap] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const editorRef = useRef(null);
  const containerRef = useRef(null);

  const languages = {
    javascript: { name: "JavaScript", color: "text-yellow-400" },
    python: { name: "Python", color: "text-blue-400" },
    java: { name: "Java", color: "text-orange-400" },
    cpp: { name: "C++", color: "text-purple-400" },
  };

  const themes = {
    dark: { name: "Dark", monacoTheme: "vs-dark" },
    light: { name: "Light", monacoTheme: "vs" },
  };

  const editorOptions = useMemo(
    () => ({
      fontSize,
      wordWrap: wordWrap ? "on" : "off",
      lineNumbers: lineNumbers ? "on" : "off",
      minimap: { enabled: minimap },
      automaticLayout: true,
      formatOnPaste: true,
      formatOnType: true,
      scrollBeyondLastLine: false,
      cursorBlinking: "smooth",
      mouseWheelZoom: true,
    }),
    [fontSize, wordWrap, lineNumbers, minimap]
  );

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column,
      });
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });

    editor.focus();
  };

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const buildFunctionComment = (params, returnType) => {
    if (!params || !returnType) return "";
    const paramsComment = params
      .map((p) => ` * @param {${p.type}} ${p.name}`)
      .join("\n");
    return `/**\n${paramsComment}\n * @return {${returnType}}\n*/\n`;
  };

  // Remove internal useEffect that resets code - Parent now handles starter code logic based on language

  const handleLanguageChange = useCallback(
    (newLanguage) => {
      setLanguage(newLanguage);
    },
    [setLanguage]
  );

  const handleRun = useCallback(async () => {
    if (!problemData?.id) return;
    setIsRunning(true);
    try {
      await onRunCode(code, problemData.id, language);
    } finally {
      setIsRunning(false);
    }
  }, [onRunCode, code, problemData, language]);

  const handleSubmit = useCallback(async () => {
    if (!problemData?.id) return;
    setIsSubmitting(true);
    try {
      await onSubmitCode(code, problemData.id, language);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmitCode, code, problemData, language]);

  const resetCode = () => {
    setCode(problemData?.starter_code?.[language] || "");
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`h-full flex flex-col ${
        theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-900"
      } ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <div className="flex gap-3 items-center">
          <select 
            value={language} 
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="bg-slate-700/50 border border-slate-600/50 text-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-700 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            {Object.entries(languages).map(([key, lang]) => (
              <option key={key} value={key}>{lang.name}</option>
            ))}
          </select>

          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className="bg-slate-700/50 border border-slate-600/50 text-slate-200 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-700 hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            {Object.entries(themes).map(([key, t]) => (
              <option key={key} value={key}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <button 
            onClick={copyCode}
            className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg transition-all"
            title="Copy code"
          >
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
          </button>
          <button 
            onClick={resetCode}
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 rounded-lg transition-all"
            title="Reset code"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-slate-400 hover:text-purple-400 hover:bg-slate-700/50 rounded-lg transition-all"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme={themes[theme].monacoTheme}
          options={editorOptions}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center px-4 py-3 border-t border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <span className="text-xs text-slate-400 font-mono">
          Ln {cursorPosition.line}, Col {cursorPosition.column}
        </span>

        <div className="flex gap-3">
          <button 
            onClick={handleRun} 
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600/90 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-cyan-500/20 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <Play size={16} className={isRunning ? "animate-pulse" : ""} />
            {isRunning ? "Running..." : "Run Code"}
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600/90 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/20 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <UploadCloud size={16} className={isSubmitting ? "animate-pulse" : ""} />
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompilerComponent;
