import React, { Suspense, lazy } from 'react';
import LoadingFallback from './LoadingFallback';

// Import PrismLight instead of full Prism
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// Register specific languages manually to prevent chunk explosion
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cpp', cpp);

// Style should be imported directly as it's a JS object, not a component
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ReactMarkdown = lazy(() => import('react-markdown'));
import remarkGfm from 'remark-gfm';

const LazyMarkdown = ({ content, components, remarkPlugins = [], ...props }) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReactMarkdown
        remarkPlugins={[...remarkPlugins]}
        components={{
          code({ node, inline, className, children, ...codeProps }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...codeProps}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...codeProps}>
                {children}
              </code>
            );
          },
          ...components
        }}
        {...props}
      >
        {content}
      </ReactMarkdown>
    </Suspense>
  );
};

export default LazyMarkdown;
