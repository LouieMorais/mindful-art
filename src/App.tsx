// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import SearchPage from './pages/SearchPage';
import YourGalleriesPage from './pages/YourGalleriesPage';
import GalleryPage from './pages/GalleryPage';
import CreateGalleryPage from './pages/_CreateGalleryPage';
import './styles/layout.css';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/galleries" element={<YourGalleriesPage />} />
        <Route path="/galleries/create" element={<CreateGalleryPage />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
      </Route>
    </Routes>
  );
}
