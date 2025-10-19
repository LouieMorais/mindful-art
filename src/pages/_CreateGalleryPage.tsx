// src/pages/_CreateGalleryPage.tsx
import { useNavigate } from 'react-router-dom';
import CreateGalleryModal from '../components/modals/CreateGalleryModal';

export default function CreateGalleryPage() {
  const navigate = useNavigate();
  return (
    <main>
      <CreateGalleryModal
        onClose={() => {
          void navigate('/galleries');
        }}
      />
    </main>
  );
}
