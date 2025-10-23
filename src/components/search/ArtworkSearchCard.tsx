// src/components/search/ArtworkSearchCard.tsx

/**
 * Search cards: render semantic HTML for all instances.
 * - Structure: <article> + <h3> + <dl>/<dt>/<dd>
 * - Thumbnail/title: open a local Artwork Modal (<dialog>)
 * - Institution: only external link (provider page)
 * - Preserve existing classes and image utilities; no CSS/wrapper changes
 * - NEW: inside the Artwork Modal, an "Add to Gallery" button closes this dialog
 *        and opens SaveToGalleryModal; on close, we re-open this dialog and
 *        restore focus to the "Add to Gallery" button.
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SafeImage } from '../SafeImage';
import { getDisplaySrc, hasDisplayImage } from '../../utils/getDisplaySrc';
import type { Artwork } from '../../types/artwork';
import SaveToGalleryModal from '../modals/SaveToGalleryModal';

type Props = { artwork: Artwork };

/* ---------------- dialog wiring ---------------- */

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

/* ---------------- helpers ---------------- */

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

const ArtworkSearchCard: React.FC<Props> = ({ artwork }) => {
  // Existing Save overlay state (used for sequential modals)
  const [isSaveOpen, setSaveOpen] = useState(false);
  // If true, we re-open the artwork modal after the Save overlay closes
  const [reopenAfterSave, setReopenAfterSave] = useState(false);

  // CARD THUMBNAIL: get base display src
  const canDisplay = hasDisplayImage(artwork);
  const displaySrc = getDisplaySrc(artwork); // may be 500px or a base IIIF URL depending on provider
  const providerHref: string | undefined = artwork.objectUrl ?? undefined;

  // --- HARDEN THUMBNAIL SIZE TO 500px (fixes Rijks full-res thumbnails) ---
  const thumbSrc = useMemo(
    () => (displaySrc ? (buildSizedUrl(displaySrc, 500) ?? displaySrc) : undefined),
    [displaySrc]
  );

  // Artwork modal wiring
  const modal = useArtworkModal();
  const addBtnRef = useRef<HTMLButtonElement | null>(null);

  const onOpenFrom = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    modal.open(e.currentTarget as HTMLElement);
  };

  const titleText = artwork.title || 'Untitled';

  // Modal image URL at higher resolution (separate from 500px thumb)
  const requestedWidth = computeRequestedWidth();
  const modalBaseUrl = useMemo(() => pickModalBaseUrl(artwork, displaySrc), [artwork, displaySrc]);
  const modalImageSrc = useMemo(
    () => buildSizedUrl(modalBaseUrl, requestedWidth),
    [modalBaseUrl, requestedWidth]
  );

  // Sequential modals behaviour: Artwork → Save → Artwork
  const onAddToGalleryFromModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReopenAfterSave(true);
    setSaveOpen(true); // open Save overlay
    modal.close(); // close Artwork overlay
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
    if (reopenAfterSave) {
      setReopenAfterSave(false);
      modal.open(addBtnRef.current); // re-open and later restore focus to Add button
    }
  };

  return (
    <>
      <article data-artworkcard-context="search" className="art-card__search">
        {canDisplay ? (
          <a href="#" onClick={onOpenFrom} aria-label="Open artwork locally">
            <SafeImage
              src={thumbSrc!}
              alt={titleText}
              className="art-card__image"
              width={500}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 240px"
            />
          </a>
        ) : (
          <div className="art-card__noimage">
            <span className="art-card__noimage__label">No image available</span>
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
            <a href="#" onClick={onOpenFrom}>
              {titleText}
            </a>
          ) : (
            <span>{titleText}</span>
          )}
        </h3>

        <dl className="art-card__meta">
          <dt className="visually-hidden">Artist</dt>
          <dd className="art-card__artist">{artwork.artist || 'Unknown artist'}</dd>

          {artwork.date && (
            <>
              <dt className="visually-hidden">Date</dt>
              <dd className="art-card__date">{artwork.date}</dd>
            </>
          )}

          {providerHref && (
            <>
              <dt className="visually-hidden">Institution</dt>
              <dd className="art-card__institution">
                <a href={providerHref} target="_blank" rel="noreferrer">
                  Courtesy of {artwork.institution || 'the provider'}
                </a>
              </dd>
            </>
          )}
        </dl>

        <ul className="art-card__actions">
          <li className="art-card__save">
            <button type="button" className="btn btn-primary" onClick={() => setSaveOpen(true)}>
              Save to Gallery
            </button>
          </li>
        </ul>
      </article>

      {/* Existing Save overlay (card-level entry point remains) */}
      {isSaveOpen && <SaveToGalleryModal artwork={artwork} onClose={handleSaveClose} />}

      {/* ===== Artwork Modal ===== */}
      {modal.isOpen && (
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

          {/* Image (separate high-res request), never a link */}
          {modalImageSrc && (
            <SafeImage
              className="artwork__image"
              src={modalImageSrc}
              alt={`${titleText} — ${artwork.artist || 'Unknown'}`}
              width={requestedWidth}
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="100vw"
            />
          )}

          {/* Title */}
          <h1 id="artwork-modal-title" className="artwork__title">
            {titleText}
          </h1>

          {/* Artist */}
          {artwork.artist && <p className="artwork__artist">{artwork.artist}</p>}

          {/* Date */}
          {artwork.date && <p className="artwork__date">{artwork.date}</p>}

          {/* Institution (no link) */}
          {artwork.institution && (
            <p className="artwork__institution">Courtesy of {artwork.institution}</p>
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
                Add to Gallery
              </button>
            </li>
          </ul>
        </dialog>
      )}
    </>
  );
};

export default ArtworkSearchCard;
