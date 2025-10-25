// src/pages/GalleryPage.tsx
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useGalleryStore } from '../store/galleryStore';
import { getDisplaySrc, hasDisplayImage } from '../utils/getDisplaySrc';

/**
 * Phase 0.3.6 — minimal modal content
 * - Uses artworkForModal for image, title, artist
 * - Removes ESLint disable
 * - Keeps all 0.3.5 wiring (open/close/focus restore)
 */

type ArtworkLike = {
  id: string;
  title?: string;
  artist?: string;
  date?: string;
  institution?: string;
  objectUrl?: string;
};

export default function GalleryPage() {
  const { id } = useParams();
  const { getGallery } = useGalleryStore();
  const gallery = id ? getGallery(id) : undefined;

  // --- Modal wiring (file-local) ---
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastInvokerRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [artworkForModal, setArtworkForModal] = useState<ArtworkLike | null>(null);

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
    lastInvokerRef.current?.focus();
    lastInvokerRef.current = null;
    setArtworkForModal(null);
  };

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
              const providerHref: string | undefined = a.objectUrl ?? undefined;

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

                    {providerHref && (
                      <p className="art-card__provider">
                        <a href={providerHref} target="_blank" rel="noopener noreferrer">
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

      {/* Modal with minimal content */}
      <dialog ref={dialogRef} className="artwork__modal" aria-labelledby="artwork-modal-title">
        <form method="dialog">
          <button ref={closeBtnRef} type="submit" onClick={close} aria-label="Close artwork view">
            Close
          </button>
        </form>

        {artworkForModal && (
          <figure className="artwork__modal__content">
            {artworkForModal.id && (
              <SafeImage
                src={getDisplaySrc(artworkForModal)}
                alt={`${artworkForModal.title ?? 'Untitled'}${
                  artworkForModal.artist ? ` — ${artworkForModal.artist}` : ''
                }`}
              />
            )}
            <figcaption>
              <h2 id="artwork-modal-title">{artworkForModal.title ?? 'Untitled'}</h2>
              {artworkForModal.artist && (
                <p className="artwork__artist">{artworkForModal.artist}</p>
              )}
            </figcaption>
          </figure>
        )}
      </dialog>
    </main>
  );
}
