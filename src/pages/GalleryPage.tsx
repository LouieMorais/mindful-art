// src/pages/GalleryPage.tsx
/**
 * Gallery page:
 * - Renders a list of artworks in a gallery.
 * - SECURITY HARDENING: all external links now use toSafeHttpUrl() before rendering.
 *   This eliminates DOM-based XSS via dynamic href values (Snyk CWE-79 alerts).
 *   No behavioural changes beyond link hardening.
 */

import React, { useState, useRef, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useGalleryStore } from '../store/galleryStore';
import { getDisplaySrc, hasDisplayImage } from '../utils/getDisplaySrc';
import SaveToGalleryModal from '../components/modals/SaveToGalleryModal';
import type { Artwork } from '../types/artwork';
import { toSafeHttpUrl } from '../utils/sanitiseHtml';

/* ---------------- helpers (unchanged) ---------------- */

function computeRequestedWidth(): number {
  if (typeof window === 'undefined') return 1000;
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const vw = Math.max(320, window.innerWidth || 0);
  return Math.max(1000, Math.round(dpr * vw));
}

function pickModalBaseUrl(art: Artwork, displaySrc?: string): string | undefined {
  const withImage = art as Partial<Artwork> & { imageUrl?: string };
  return withImage.imageUrl ?? displaySrc;
}

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

  const [selected, setSelected] = useState<Artwork | null>(null);
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
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {gallery.artworks.map((a) => {
              const canDisplay = hasDisplayImage(a);
              const displaySrc = getDisplaySrc(a);

              // HARDEN: compute a sanitised external URL once per artwork.
              // Only http/https survive; unsafe or invalid values become undefined.
              const providerHrefRaw: string | undefined = a.objectUrl ?? undefined;
              const providerHref: string | undefined =
                (providerHrefRaw && toSafeHttpUrl(providerHrefRaw)) || undefined;

              const thumbSrc = useMemo(
                () => (displaySrc ? (buildSizedUrl(displaySrc, 500) ?? displaySrc) : undefined),
                [displaySrc]
              );

              const titleText = a.title || 'Untitled';

              return (
                <li key={a.id}>
                  <article data-artworkcard-context="gallery" className="art-card__gallery">
                    {canDisplay ? (
                      <a href="#" onClick={onOpenFrom(a)} aria-label="Open artwork locally">
                        <SafeImage
                          src={thumbSrc!}
                          alt={titleText}
                          width={500}
                          style={{ height: 'auto' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    ) : (
                      <div
                        className="art-card__noimage"
                        role="img"
                        aria-label="No image available"
                        style={{ width: 240, height: 240 }}
                      >
                        <span className="art-card__noimage__label" aria-hidden="true">
                          No image available
                        </span>

                        {/* SAFE external link (formerly: href={providerHrefRaw}) */}
                        {providerHref && (
                          <a
                            className="art-card__noimage__provider"
                            href={providerHref}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View on provider
                          </a>
                        )}
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

                      {/* SAFE external link (formerly: href={providerHrefRaw}) */}
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

      {/* Save overlay */}
      {isSaveOpen && selected && (
        <SaveToGalleryModal artwork={selected} onClose={handleSaveClose} />
      )}

      {/* Artwork Modal */}
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

            // HARDEN: sanitise providerHref for the modal too.
            const providerHrefRaw: string | undefined = selected.objectUrl ?? undefined;
            const providerHref: string | undefined =
              (providerHrefRaw && toSafeHttpUrl(providerHrefRaw)) || undefined;

            return (
              <>
                {modalImageSrc && (
                  <SafeImage
                    className="artwork__image"
                    src={modalImageSrc}
                    alt={`${titleText} — ${selected.artist || 'Unknown'}`}
                    width={requestedWidth}
                    decoding="async"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    sizes="100vw"
                  />
                )}

                <h1 id="artwork-modal-title" className="artwork__title">
                  {titleText}
                </h1>

                {selected.artist && <p className="artwork__artist">{selected.artist}</p>}
                {selected.date && <p className="artwork__date">{selected.date}</p>}
                {selected.institution && (
                  <p className="artwork__institution">Courtesy of {selected.institution}</p>
                )}

                <ul>
                  {/* SAFE external link (formerly: href={providerHrefRaw}) */}
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

/* local modal hook (unchanged behaviour) */
function useArtworkModal() {
  const dialogRef = React.useRef<HTMLDialogElement | null>(null);
  const [isOpen, setOpen] = React.useState(false);
  const open = React.useCallback((invoker?: HTMLElement | null) => {
    dialogRef.current?.showModal();
    setOpen(true);
    if (invoker) (dialogRef.current as any).__invoker = invoker;
    setTimeout(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>('button[data-close]')?.focus();
    }, 0);
  }, []);
  const close = React.useCallback(() => {
    const invoker = (dialogRef.current as any)?.__invoker as HTMLElement | undefined;
    dialogRef.current?.close();
    setOpen(false);
    if (invoker && typeof invoker.focus === 'function') setTimeout(() => invoker.focus(), 0);
  }, []);
  const handleClose = React.useCallback(() => close(), [close]);
  const handleCancel = React.useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
      e.preventDefault();
      close();
    },
    [close]
  );
  return { dialogRef, isOpen, open, close, handleClose, handleCancel };
}
