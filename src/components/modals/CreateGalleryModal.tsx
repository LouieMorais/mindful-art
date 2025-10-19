// src/components/modals/CreateGalleryModal.tsx
import { useEffect, useRef, useState } from 'react';
import { useGalleryStore } from '../../store/galleryStore';
import { trapFocus, restoreFocus } from '../../utils/focusTrap';

interface Props {
  onClose: () => void;
}

export default function CreateGalleryModal({ onClose }: Props) {
  const { createGallery } = useGalleryStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdName, setCreatedName] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement);

  useEffect(() => {
    const node = dialogRef.current;
    const opener = openerRef.current; // capture at mount time
    if (node) trapFocus(node);
    return () => {
      if (node) restoreFocus(opener);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    createGallery(trimmed, description);
    setCreatedName(trimmed);
  }

  return (
    <div ref={dialogRef} role="dialog" aria-labelledby="create-gallery-title" aria-modal="true">
      {!createdName ? (
        <>
          <h2 id="create-gallery-title">Create Gallery</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="g-name">Gallery Name</label>
            <input
              id="g-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required="true"
            />
            <label htmlFor="g-desc">Description</label>
            <textarea
              id="g-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <button type="submit">Create</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 id="create-gallery-title">Gallery Created</h2>
          <p aria-live="polite">“{createdName}” was created successfully.</p>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </>
      )}
    </div>
  );
}
