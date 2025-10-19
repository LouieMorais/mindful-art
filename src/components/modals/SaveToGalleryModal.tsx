// src/components/modals/SaveToGalleryModal.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Artwork } from '../../types/artwork';
import { useGalleryStore } from '../../store/galleryStore';
import { trapFocus, restoreFocus, cleanupTrap } from '../../utils/focusTrap';
import Portal from '../common/Portal';
import '../../styles/modal.css';

interface Props {
  artwork: Artwork;
  onClose: () => void;
}

export default function SaveToGalleryModal({ artwork, onClose }: Props) {
  const { galleries, addArtworkToGalleries, createGallery } = useGalleryStore();
  const [selection, setSelection] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [savedSummary, setSavedSummary] = useState<string | null>(null);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement);

  useEffect(() => {
    const node = overlayRef.current;
    const opener = openerRef.current;
    if (node) trapFocus(node);
    return () => {
      if (node) cleanupTrap(node);
      restoreFocus(opener);
    };
  }, []);

  const sorted = useMemo(
    () =>
      [...galleries].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
    [galleries]
  );

  function toggle(id: string) {
    setSelection((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleCreateInline(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const g = createGallery(name, newDesc);
    setSelection((prev) => [...prev, g.id]);
    setCreating(false);
    setNewName('');
    setNewDesc('');
  }

  function handleConfirm() {
    if (selection.length === 0) return;
    addArtworkToGalleries(selection, artwork);
    setSavedSummary(
      `Added to ${selection.length} ${selection.length === 1 ? 'gallery' : 'galleries'}.`
    );
  }

  return (
    <Portal>
      <div
        className="overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-gallery-title"
        ref={overlayRef}
      >
        <section className="dialog" role="document">
          {!savedSummary ? (
            <>
              <h2 id="save-gallery-title">Save to Gallery</h2>

              <section aria-label="Artwork">
                <p>
                  <strong>{artwork.title}</strong> — {artwork.artist}
                  {artwork.year ? (
                    <>
                      {' '}
                      (<time>{artwork.year}</time>)
                    </>
                  ) : null}
                </p>
              </section>

              <fieldset>
                <legend>Select galleries</legend>
                <ul className="gallery-list">
                  {sorted.map((g) => {
                    const alreadyIn = g.artworks.some((a) => a.id === artwork.id);
                    return (
                      <li key={g.id} className="gallery-list__item">
                        <label className="gallery-list__label">
                          <input
                            type="checkbox"
                            checked={selection.includes(g.id) || alreadyIn}
                            disabled={alreadyIn}
                            onChange={() => toggle(g.id)}
                          />
                          <span>{g.name}</span>
                          {alreadyIn && <span className="badge">already added</span>}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>

              {!creating ? (
                <button
                  type="button"
                  onClick={() => setCreating(true)}
                  className="btn btn-secondary"
                >
                  Create a new gallery
                </button>
              ) : (
                <form
                  onSubmit={handleCreateInline}
                  aria-label="Create new gallery"
                  className="form"
                >
                  <label htmlFor="inline-name">Name</label>
                  <input
                    id="inline-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                  <label htmlFor="inline-desc">Description</label>
                  <textarea
                    id="inline-desc"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                  <div className="button-row">
                    <button type="submit" className="btn btn-primary">
                      Add Gallery
                    </button>
                    <button type="button" onClick={() => setCreating(false)} className="btn">
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="button-row">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="btn btn-primary"
                  disabled={selection.length === 0}
                >
                  Save
                </button>
                <button type="button" onClick={onClose} className="btn">
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 id="save-gallery-title">Saved</h2>
              <p aria-live="polite">{savedSummary}</p>
              <div className="button-row">
                <button type="button" onClick={onClose} className="btn btn-primary">
                  Close
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </Portal>
  );
}
