// src/pages/GalleryPage.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useGalleryStore } from '../store/galleryStore';
import { getDisplaySrc, hasDisplayImage } from '../utils/getDisplaySrc';

/**
 * Phase 0.3.7 — Full modal content + a11y/resilience
 * - Modal shows: image (max available), title, artist, date, institution, Source Link
 * - a11y: aria-labelledby/aria-describedby, focus trap, focus return, Esc close
 * - Resilience: all fields optional; Source Link only if safe URL present
 * - No shared component extraction; all state remains local and reversible
 */

type ArtworkLike = {
  id: string;
  title?: string;
  artist?: string;
  date?: string;
  institution?: string;
  objectUrl?: string; // external source page
};

export default function GalleryPage() {
  const { id } = useParams();
  const { getGallery } = useGalleryStore();
  const gallery = id ? getGallery(id) : undefined;

  // --- Modal state (file-local) ---
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastInvokerRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [artworkForModal, setArtworkForModal] = useState<ArtworkLike | null>(null);

  // For labelling/description
  const modalTitleId = 'artwork-modal-title';
  const modalDescId = 'artwork-modal-desc';

  // Open/Close
  const open = (art: ArtworkLike, invoker: HTMLElement | null) => {
    setArtworkForModal(art);
    lastInvokerRef.current = invoker;

    const dlg = dialogRef.current;
    if (dlg && typeof dlg.showModal === 'function') {
      dlg.showModal();
      setIsOpen(true);
      queueMicrotask(() => {
        closeBtnRef.current?.focus();
      });
    }
  };

  const close = () => {
    const dlg = dialogRef.current;
    if (dlg && typeof dlg.close === 'function') {
      dlg.close();
    }
    setIsOpen(false);
    setArtworkForModal(null);
    lastInvokerRef.current?.focus();
    lastInvokerRef.current = null;
  };

  // Global Esc guard (native <dialog> handles Esc, but we ensure parity)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.stopPropagation();
        close();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // Focus trap while the dialog is open (keyboard-only users)
  useEffect(() => {
    if (!isOpen) return;

    const dlg = dialogRef.current;
    if (!dlg) return;

    // Collect focusable controls inside the dialog
    const focusables = Array.from(
      dlg.querySelectorAll<HTMLElement>(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), ' +
          'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, ' +
          '[contenteditable], [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);

    const first = focusables[0] ?? closeBtnRef.current ?? null;
    const last = focusables[focusables.length - 1] ?? closeBtnRef.current ?? null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (!first || !last) return;

      // Trap focus within the dialog
      if (e.shiftKey) {
        // Shift+Tab at first -> go to last
        if (document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      } else {
        // Tab at last -> go to first
        if (document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };

    dlg.addEventListener('keydown', onKeyDown);
    return () => {
      dlg.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, artworkForModal]);

  // Safe external link (Source) only if clearly http(s)
  const providerHref = useMemo(() => {
    const url = artworkForModal?.objectUrl?.trim();
    if (!url) return undefined;
    try {
      const u = new URL(url);
      return u.protocol === 'http:' || u.protocol === 'https:' ? u.toString() : undefined;
    } catch {
      return undefined;
    }
  }, [artworkForModal]);

  if (!gallery) {
    return (
      <main>
        <h1>Gallery Not Found</h1>
        <p>
          <Link to="/galleries">Back to Your Galleries</Link>
        </p>
      </main>
    );
  }

  return (
    <main>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/galleries">← Your Galleries</Link>
      </nav>

      <header>
        <h1>{gallery.name}</h1>
        <p>{gallery.description}</p>
        <p>
          Created {new Date(gallery.createdAt).toLocaleDateString()} • {gallery.artworks.length}{' '}
          {gallery.artworks.length === 1 ? 'artwork' : 'artworks'}
        </p>
      </header>

      {gallery.artworks.length === 0 ? (
        <section aria-labelledby="empty-art">
          <h2 id="empty-art">No artworks yet</h2>
          <p>Use “Save to Gallery” on any search result to add artworks here.</p>
        </section>
      ) : (
        <section aria-label="Artworks">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {gallery.artworks.filter(hasDisplayImage).map((a: ArtworkLike) => {
              const src = getDisplaySrc(a);
              const onThumbClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
                e.preventDefault();
                open(a, e.currentTarget);
              };
              const onTitleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
                e.preventDefault();
                open(a, e.currentTarget);
              };

              return (
                <li key={a.id}>
                  <article data-artworkcard-context="gallery" className="art-card__gallery">
                    {src ? (
                      <a href="#" onClick={onThumbClick} aria-label="Open artwork locally">
                        <SafeImage
                          src={src}
                          alt={`${a.title ?? 'Untitled'}${a.artist ? ` — ${a.artist}` : ''}`}
                        />
                      </a>
                    ) : (
                      <div className="art-card__placeholder" aria-hidden="true" />
                    )}

                    <h3 className="art-card__title">
                      <a
                        href="#"
                        onClick={onTitleClick}
                        aria-label="Open artwork locally from title"
                      >
                        {a.title ?? 'Untitled'}
                      </a>
                    </h3>

                    {a.objectUrl && (
                      <p className="art-card__provider">
                        <a href={a.objectUrl} target="_blank" rel="noopener noreferrer">
                          Source Link
                        </a>
                      </p>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Modal with full content and a11y */}
      <dialog
        ref={dialogRef}
        className="artwork__modal"
        aria-labelledby={modalTitleId}
        aria-describedby={modalDescId}
      >
        <form method="dialog">
          <button ref={closeBtnRef} type="submit" onClick={close} aria-label="Close artwork view">
            Close
          </button>
        </form>

        {artworkForModal && (
          <article className="artwork__modal__content">
            <figure style={{ margin: 0 }}>
              {/* Image: request the best display variant available; SafeImage follows the same pathing as cards */}
              {artworkForModal.id && (
                <SafeImage
                  src={getDisplaySrc(artworkForModal)}
                  alt={`${artworkForModal.title ?? 'Untitled'}${
                    artworkForModal.artist ? ` — ${artworkForModal.artist}` : ''
                  }`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
              <figcaption id={modalDescId} style={{ marginTop: '0.75rem' }}>
                <h2 id={modalTitleId} style={{ margin: 0 }}>
                  {artworkForModal.title ?? 'Untitled'}
                </h2>

                {/* Optional fields displayed only when present */}
                {artworkForModal.artist && (
                  <p className="artwork__artist" style={{ margin: '0.25rem 0' }}>
                    {artworkForModal.artist}
                  </p>
                )}

                {artworkForModal.date && (
                  <p className="artwork__date" style={{ margin: '0.25rem 0' }}>
                    {artworkForModal.date}
                  </p>
                )}

                {artworkForModal.institution && (
                  <p className="artwork__institution" style={{ margin: '0.25rem 0' }}>
                    {artworkForModal.institution}
                  </p>
                )}

                {providerHref && (
                  <p className="artwork__source" style={{ margin: '0.5rem 0 0 0' }}>
                    <a href={providerHref} target="_blank" rel="noopener noreferrer">
                      Source Link
                    </a>
                  </p>
                )}
              </figcaption>
            </figure>
          </article>
        )}
      </dialog>
    </main>
  );
}
