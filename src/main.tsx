// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { testDatabaseConnection } from './lib/testConnection';
import { AuthProvider } from './contexts/AuthContext';

// ✅ DEV-ONLY axe-react initialisation (no effect in prod/CI)
if (import.meta.env.DEV) {
  import('@axe-core/react').then(async ({ default: axeReact }) => {
    // axe-react requires references to React and react-dom (not the client helper)
    const React = await import('react');
    const ReactDOM = await import('react-dom');
    axeReact(React, ReactDOM, 1000); // debounce (ms) to reduce console spam
  });
}

void testDatabaseConnection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
