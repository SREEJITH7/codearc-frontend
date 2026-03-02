import React, { Suspense, lazy } from 'react';
import LoadingFallback from './LoadingFallback';

// Lazy load Monaco editor
const Editor = lazy(() => import('@monaco-editor/react'));

const LazyEditor = (props) => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Editor {...props} />
    </Suspense>
  );
};

export default LazyEditor;
