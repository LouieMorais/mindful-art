// src/components/search/ArtworkSearchCard.tsx

/**
 * Search cards: render semantic HTML for all instances.
 * - Structure: <article> + <h3> + <dl>/<dt>/<dd>
 * - Thumbnail/title: now open a local Artwork Modal (<dialog>) per 0.3.1 wiring
 * - Institution: only external link (provider page)
 * - Preserve existing classes and image utilities; no CSS/wrapper changes
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SafeImage } from '../SafeImage';
import { getDisplaySrc, hasDisplayImage } from '../../utils/getDisplaySrc';
import type { Artwork } from '../../types/artwork';
import SaveToGalleryModal from '../modals/SaveToGalleryModal';

type Props = { artwork: Artwork };

/* ---------------- 0.3.1: minimal modal wiring (retained) ---------------- */

function useArtworkModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const invokerRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((invoker: HTMLElement | null) => {
    invokerRef.current = invoker;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    // Close via dialog API (native only; no Safari polyfill per sprint scope)
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  // When opening, call showModal() and focus the Close button
  useEffect(() => {
    if (!isOpen) return;
    const dlg = dialogRef.current;
    if (dlg && typeof dlg.showModal === 'function') {
      dlg.showModal();
      const closeBtn = dlg.querySelector<HTMLButtonElement>('button[data-close]');
      closeBtn?.focus();
    }
  }, [isOpen]);

  // Restore focus to invoker after close
  const handleClose = useCallback(() => {
    const invoker = invokerRef.current;
    invokerRef.current = null;
    if (invoker && typeof invoker.focus === 'function') {
      // Defer to next tick to ensure DOM is stable
      setTimeout(() => invoker.focus(), 0);
    }
  }, []);

  // Ensure Esc uses our close() so focus restoration runs
  const handleCancel = useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
      e.preventDefault();
      close();
    },
    [close]
  );

  return { dialogRef, isOpen, open, close, handleClose, handleCancel };
}

/* ---------------- Step 0.3.2 helpers ---------------- */

/** Minimum target width for the modal image; upscale with DPR and viewport width. */
function computeRequestedWidth(): number {
  if (typeof window === 'undefined') return 1000;
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const vw = Math.max(320, window.innerWidth || 0);
  return Math.max(1000, Math.round(dpr * vw));
}

/**
 * Try to derive a larger IIIF-style URL from the card's display src.
 * Supported patterns (best-effort, safe fallback to the original URL):
 *   1) /full/{size}/0/  → replace {size} with `${w},`
 *   2) ?width=500       → replace with `width=w`
 */
function buildModalImageSrcFromDisplaySrc(
  displaySrc: string | undefined,
  w: number
): string | undefined {
  if (!displaySrc) return undefined;

  // pattern 1: IIIF path /full/{size}/0/
  const iiifPath = /\/full\/([^/]+)\/0\//;
  if (iiifPath.test(displaySrc)) {
    return displaySrc.replace(iiifPath, `/full/${w},/0/`);
  }

  // pattern 2: width= query param
  if (displaySrc.includes('width=')) {
    const url = new URL(
      displaySrc,
      typeof window !== 'undefined' ? window.location.href : 'http://localhost'
    );
    url.searchParams.set('width', String(w));
    return url.toString();
  }

  // Fallback: return original (will still work, just not optimised)
  return displaySrc;
}

/* ---------------- Existing component (imports and structure preserved) ---------------- */

const ArtworkSearchCard: React.FC<Props> = ({ artwork }) => {
  const [isSaveOpen, setSaveOpen] = useState(false);

  // CARD THUMBNAIL: keep as before — SafeImage + getDisplaySrc → 500px thumbnail
  const canDisplay = hasDisplayImage(artwork);
  const displaySrc = getDisplaySrc(artwork); // expected to be a 500px (or provider-optimised) URL
  const providerHref: string | undefined = artwork.objectUrl ?? undefined;

  // 0.3.1: wire clicks to open the modal
  const modal = useArtworkModal();

  const onOpenFrom = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    modal.open(e.currentTarget as HTMLElement);
  };

  const titleText = artwork.title || 'Untitled';

  // 0.3.2: compute modal image URL at higher resolution (separate request from thumbnail)
  const requestedWidth = computeRequestedWidth();
  const modalImageSrc = useMemo(
    () => buildModalImageSrcFromDisplaySrc(displaySrc, requestedWidth),
    [displaySrc, requestedWidth]
  );

  return (
    <>
      <article data-artworkcard-context="search" className="art-card__search">
        {canDisplay ? (
          <a href="#" onClick={onOpenFrom} aria-label="Open artwork locally">
            <SafeImage
              src={displaySrc!}
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
            // No link at all when there is no image
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

      {/* Existing Save modal (unchanged) */}
      {isSaveOpen && <SaveToGalleryModal artwork={artwork} onClose={() => setSaveOpen(false)} />}

      {/* ===== 0.3.2: Artwork Modal (spec-compliant content) ===== */}
      {modal.isOpen && (
        <dialog
          className="artwork__modal"
          ref={modal.dialogRef}
          aria-labelledby="artwork-modal-title"
          onClose={modal.handleClose}
          onCancel={modal.handleCancel}
        >
          {/* Close button first in DOM, focus target on open */}
          <button type="button" data-close onClick={modal.close} aria-label="Close modal">
            Close
          </button>

          {/* Image: separate, higher-resolution request; never a link */}
          {modalImageSrc && (
            <SafeImage
              className="artwork__image"
              src={modalImageSrc}
              alt={`${titleText} — ${artwork.artist || 'Unknown'}`}
              width={requestedWidth}
              decoding="async"
              // 100% width in layout; SafeImage guards the URL & attributes
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="100vw"
            />
          )}

          {/* Title (H1) */}
          <h1 id="artwork-modal-title" className="artwork__title">
            {titleText}
          </h1>

          {/* Artist */}
          {artwork.artist && <p className="artwork__artist">{artwork.artist}</p>}

          {/* Date / Year */}
          {artwork.date && <p className="artwork__date">{artwork.date}</p>}

          {/* Institution label (no link) */}
          {artwork.institution && (
            <p className="artwork__institution">Courtesy of {artwork.institution}</p>
          )}

          {/* Object Source (objectUrl) Link */}
          {providerHref && (
            <ul>
              <li className="artwork-object_url">
                <a href={providerHref} target="_blank" rel="noopener noreferrer">
                  Source Link
                </a>
              </li>
            </ul>
          )}
        </dialog>
      )}
    </>
  );
};

export default ArtworkSearchCard;
