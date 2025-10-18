// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { testDatabaseConnection } from './lib/testConnection';
import { AuthProvider } from './contexts/AuthContext';

// Test database connectivity on app start
void testDatabaseConnection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
