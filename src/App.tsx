// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <Routes>
      {/* No homepage yet: redirect root to /search */}
      <Route path="/" element={<Navigate to="/search" replace />} />
      <Route path="/search" element={<SearchPage />} />
      {/* Keep room for future routes:
         <Route path="/vault" element={<VaultPage />} />
         <Route path="/profile" element={<ProfilePage />} /> */}
    </Routes>
  );
}
