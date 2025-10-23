// src/components/search/ArtworkSearchCard.tsx

/**
 * Search cards: render semantic HTML for all instances.
 * - Structure: <article> + <h3> + <dl>/<dt>/<dd>
 * - Thumbnail/title: now open a local Artwork Modal (<dialog>) per 0.3.1 wiring
 * - Institution: only external link (provider page)
 * - Preserve existing classes and image utilities; no CSS/wrapper changes
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SafeImage } from '../SafeImage';
import { getDisplaySrc, hasDisplayImage } from '../../utils/getDisplaySrc';
import type { Artwork } from '../../types/artwork';
import SaveToGalleryModal from '../modals/SaveToGalleryModal';

type Props = { artwork: Artwork };

/* ---------------- 0.3.1: minimal modal wiring (no content yet) ---------------- */

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

/* ---------------- Existing component (imports and structure preserved) ---------------- */

const ArtworkSearchCard: React.FC<Props> = ({ artwork }) => {
  const [isSaveOpen, setSaveOpen] = useState(false);

  const canDisplay = hasDisplayImage(artwork);
  const displaySrc = getDisplaySrc(artwork);
  // Use undefined (not null) so <a href> typing is satisfied when used
  const providerHref: string | undefined = artwork.objectUrl ?? undefined;

  // 0.3.1: wire clicks to open the (empty) modal
  const modal = useArtworkModal();

  const onOpenFrom = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    modal.open(e.currentTarget as HTMLElement);
  };

  const titleText = artwork.title || 'Untitled';

  return (
    <>
      <article data-artworkcard-context="search" className="art-card__search">
        {canDisplay ? (
          <a href="#" onClick={onOpenFrom} aria-label="Open artwork locally">
            <SafeImage src={displaySrc} width={500} alt={titleText} />
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

      {/* ===== 0.3.1: Bare Artwork Modal (no content yet) ===== */}
      {modal.isOpen && (
        <dialog
          className="artwork__modal"
          ref={modal.dialogRef}
          onClose={modal.handleClose}
          onCancel={modal.handleCancel}
        >
          <button type="button" data-close onClick={modal.close} aria-label="Close modal">
            Close
          </button>
          {/* Content intentionally deferred to 0.3.2 */}
        </dialog>
      )}
    </>
  );
};

export default ArtworkSearchCard;
