// src/App.tsx

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useAuth } from './hooks/useAuth';

function App() {
  const [count, setCount] = useState(0);
  const { userId, isLoading } = useAuth();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React + Louie</h1>

      <div className="card">
        <button onClick={() => setCount((c) => c + 38)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      {/* Auth stub readout (safe and minimal) */}
      <div style={{ marginTop: '1rem', fontFamily: 'monospace' }}>
        {isLoading ? 'auth: loading…' : `auth: ${userId ? `userId=${userId}` : 'signed out'}`}
      </div>
    </>
  );
}

export default App;
