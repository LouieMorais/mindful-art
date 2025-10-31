// src/pages/GalleryPage.tsx

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useGalleryStore } from '../store/galleryStore';
import { getDisplaySrc, hasDisplayImage } from '../utils/getDisplaySrc';
import SaveToGalleryModal from '../components/modals/SaveToGalleryModal';
import type { Artwork } from '../types/artwork';

/**
 * Gallery page rendering remains as before.
 * Added: IDENTICAL modal logic and helpers from ArtworkSearchCard.tsx.
 * Source for parity: src/components/search/ArtworkSearchCard.tsx
 */

/* ---------------- dialog wiring (copied from ArtworkSearchCard) ---------------- */

function useArtworkModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const invokerRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((invoker: HTMLElement | null) => {
    invokerRef.current = invoker;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dlg = dialogRef.current;
    if (dlg && typeof dlg.showModal === 'function') {
      dlg.showModal();
      const closeBtn = dlg.querySelector<HTMLButtonElement>('button[data-close]');
      closeBtn?.focus();
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    const invoker = invokerRef.current;
    invokerRef.current = null;
    if (invoker && typeof invoker.focus === 'function') {
      setTimeout(() => invoker.focus(), 0);
    }
  }, []);

  const handleCancel = useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
      e.preventDefault();
      close();
    },
    [close]
  );

  return { dialogRef, isOpen, open, close, handleClose, handleCancel };
}

/* ---------------- helpers (copied from ArtworkSearchCard) ---------------- */

function computeRequestedWidth(): number {
  if (typeof window === 'undefined') return 1000;
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const vw = Math.max(320, window.innerWidth || 0);
  return Math.max(1000, Math.round(dpr * vw));
}

/**
 * Prefer a canonical/base image if available; otherwise fall back to display (thumb) URL.
 * This prevents being stuck at 500px for providers like Rijksmuseum.
 */
function pickModalBaseUrl(art: Artwork, displaySrc?: string): string | undefined {
  const withImage = art as Partial<Artwork> & { imageUrl?: string };
  return withImage.imageUrl ?? displaySrc;
}

/** Upsize common IIIF/CDN patterns; fall back safely. */
function buildSizedUrl(urlStr: string | undefined, w: number): string | undefined {
  if (!urlStr) return undefined;

  // Case A: IIIF path size (/full|/square)
  if (/\/(full|square)\/[^/]+\/0\//.test(urlStr)) {
    return urlStr
      .replace(/\/square\/[^/]+\/0\//, `/full/${w},/0/`)
      .replace(/\/full\/[^/]+\/0\//, `/full/${w},/0/`);
  }

  // Case B: query params width/w
  try {
    const parsed = new URL(
      urlStr,
      typeof window !== 'undefined' ? window.location.href : 'http://localhost'
    );
    let mutated = false;
    if (parsed.searchParams.has('width')) {
      parsed.searchParams.set('width', String(w));
      parsed.searchParams.delete('height');
      parsed.searchParams.delete('h');
      mutated = true;
    } else if (parsed.searchParams.has('w')) {
      parsed.searchParams.set('w', String(w));
      parsed.searchParams.delete('h');
      parsed.searchParams.delete('height');
      mutated = true;
    }
    if (mutated) return parsed.toString();
  } catch {
    /* noop */
  }

  // Case C: common CDN suffix (=s500/=w500)
  const upgraded = urlStr
    .replace(/=s(\d+)(?=$|[&#?])/, `=s${w}`)
    .replace(/=w(\d+)(?=$|[&#?])/, `=w${w}`);
  if (upgraded !== urlStr) return upgraded;

  return urlStr;
}

/* ---------------- component ---------------- */

export default function GalleryPage() {
  const { id } = useParams();
  const { getGallery } = useGalleryStore();
  const gallery = id ? getGallery(id) : undefined;

  // Selected artwork for the modal (gallery page needs to set this before opening modal)
  const [selected, setSelected] = useState<Artwork | null>(null);

  // Sequential modals (identical behaviour as search card): Artwork → Save → Artwork
  const [isSaveOpen, setSaveOpen] = useState(false);
  const [reopenAfterSave, setReopenAfterSave] = useState(false);
  const addBtnRef = useRef<HTMLButtonElement | null>(null);

  const modal = useArtworkModal();

  const onOpenFrom = (art: Artwork) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSelected(art);
    modal.open(e.currentTarget as HTMLElement);
  };

  const onAddToGalleryFromModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReopenAfterSave(true);
    setSaveOpen(true);
    modal.close();
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
    if (reopenAfterSave) {
      setReopenAfterSave(false);
      modal.open(addBtnRef.current);
    }
  };

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
          <ul>
            {gallery.artworks.map((a) => {
              // Keep your original card structure; only add the exact same open behaviour as search
              const canDisplay = hasDisplayImage(a);
              const displaySrc = getDisplaySrc(a);
              const providerHref: string | undefined = a.objectUrl ?? undefined;

              // IDENTICAL thumbnail hardening to 500px as in search card
              const thumbSrc = useMemo(
                () => (displaySrc ? (buildSizedUrl(displaySrc, 500) ?? displaySrc) : undefined),
                [displaySrc]
              );

              const titleText = a.title || 'Untitled';

              // --------------------- NO-IMAGE FILTER (only change) ---------------------
              if (!canDisplay) return null;
              // ------------------------------------------------------------------------

              return (
                <li key={a.id}>
                  <article data-artworkcard-context="gallery" className="art-card__gallery">
                    {canDisplay ? (
                      <a href="#" onClick={onOpenFrom(a)} aria-label="Open artwork locally">
                        <SafeImage
                          src={thumbSrc!}
                          alt={titleText}
                          width={500} // retain your 500px convention
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    ) : (
                      <div className="art-card__noimage" role="img" aria-label="No image available">
                        <span className="art-card__noimage__label" aria-hidden="true">
                          No image available
                        </span>
                      </div>
                    )}

                    <h3 className="art-card__title">
                      {canDisplay ? (
                        <a href="#" onClick={onOpenFrom(a)}>
                          {titleText}
                        </a>
                      ) : (
                        <span>{titleText}</span>
                      )}
                    </h3>

                    <dl className="art-card__meta">
                      <dt className="visually-hidden">Artist</dt>
                      <dd className="art-card__artist">{a.artist || 'Unknown artist'}</dd>

                      {a.date && (
                        <>
                          <dt className="visually-hidden">Date</dt>
                          <dd className="art-card__date">{a.date}</dd>
                        </>
                      )}

                      {providerHref && (
                        <>
                          <dt className="visually-hidden">Institution</dt>
                          <dd className="art-card__institution">
                            <a href={providerHref} target="_blank" rel="noreferrer">
                              Courtesy of {a.institution || 'the provider'}
                            </a>
                          </dd>
                        </>
                      )}
                    </dl>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Existing Save overlay (same sequential behaviour as search card) */}
      {isSaveOpen && selected && (
        <SaveToGalleryModal artwork={selected} onClose={handleSaveClose} />
      )}

      {/* ===== Artwork Modal (identical to ArtworkSearchCard) ===== */}
      {modal.isOpen && selected && (
        <dialog
          className="artwork__modal"
          ref={modal.dialogRef}
          aria-labelledby="artwork-modal-title"
          onClose={modal.handleClose}
          onCancel={modal.handleCancel}
        >
          <button type="button" data-close onClick={modal.close} aria-label="Close modal">
            Close
          </button>

          {(() => {
            const displaySrc = getDisplaySrc(selected);
            const requestedWidth = computeRequestedWidth();
            const modalBaseUrl = pickModalBaseUrl(selected, displaySrc);
            const modalImageSrc = buildSizedUrl(modalBaseUrl, requestedWidth);
            const titleText = selected.title || 'Untitled';
            const providerHref: string | undefined = selected.objectUrl ?? undefined;

            return (
              <>
                {/* Image (separate high-res request), never a link */}
                {modalImageSrc && (
                  <SafeImage
                    className="artwork__image"
                    src={modalImageSrc}
                    alt={`${titleText} — ${selected.artist || 'Unknown'}`}
                    width={requestedWidth}
                    decoding="async"
                    sizes="100vw"
                  />
                )}

                {/* Title */}
                <h1 id="artwork-modal-title" className="artwork__title">
                  {titleText}
                </h1>

                {/* Artist */}
                {selected.artist && <p className="artwork__artist">{selected.artist}</p>}

                {/* Date */}
                {selected.date && <p className="artwork__date">{selected.date}</p>}

                {/* Institution (no link) */}
                {selected.institution && (
                  <p className="artwork__institution">Courtesy of {selected.institution}</p>
                )}

                {/* Source link + Add to Gallery (sequential modals) */}
                <ul>
                  {providerHref && (
                    <li className="artwork-object_url">
                      <a href={providerHref} target="_blank" rel="noopener noreferrer">
                        Source Link
                      </a>
                    </li>
                  )}
                  <li>
                    <button
                      ref={addBtnRef}
                      type="button"
                      className="btn btn-primary"
                      onClick={onAddToGalleryFromModal}
                    >
                      Copy to Another Gallery
                    </button>
                  </li>
                </ul>
              </>
            );
          })()}
        </dialog>
      )}
    </main>
  );
}
