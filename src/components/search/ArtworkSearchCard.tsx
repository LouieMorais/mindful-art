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

function computeRequestedWidth(): number {
  if (typeof window === 'undefined') return 1000;
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const vw = Math.max(320, window.innerWidth || 0);
  return Math.max(1000, Math.round(dpr * vw));
}

/**
 * Prefer the "full/base" image URL if the artwork provides it; otherwise fall back to the
 * display (thumbnail) URL. This avoids being stuck at 500px for providers like Rijksmuseum.
 */
function pickModalBaseUrl(art: Artwork, displaySrc: string | undefined): string | undefined {
  // If your Artwork type exposes a canonical/original image URL, use it first:
  // (The doc shows `imageUrl` in types; if absent in some items, we fall back)
  return art.imageUrl ?? displaySrc;
}

/**
 * Make a larger image URL from common provider patterns.
 * Handles typical IIIF and CDN query/suffix conventions. Falls back safely.
 */
function buildSizedUrl(urlStr: string | undefined, w: number): string | undefined {
  if (!urlStr) return undefined;

  // Try robust URL parsing for query-based variants; otherwise operate as string.
  let parsed: URL | null = null;
  try {
    parsed = new URL(
      urlStr,
      typeof window !== 'undefined' ? window.location.href : 'http://localhost'
    );
  } catch {
    parsed = null;
  }

  const replaceIIIFSize = (s: string) => {
    // IIIF path: /full/{size}/0/  -> use /full/{w},/0/
    s = s.replace(/\/full\/[^/]+\/0\//, `/full/${w},/0/`);
    // IIIF path: /square/{size}/0/ -> prefer a full rendition for the modal
    s = s.replace(/\/square\/[^/]+\/0\//, `/full/${w},/0/`);
    return s;
  };

  // Case A: IIIF-style path sizing
  if (/\/(full|square)\/[^/]+\/0\//.test(urlStr)) {
    return replaceIIIFSize(urlStr);
  }

  // Case B: query parameters (width/w + optional height/h)
  if (parsed) {
    let mutated = false;
    if (parsed.searchParams.has('width')) {
      parsed.searchParams.set('width', String(w));
      mutated = true;
      // Remove conflicting height constraints if present
      if (parsed.searchParams.has('height')) parsed.searchParams.delete('height');
      if (parsed.searchParams.has('h')) parsed.searchParams.delete('h');
    } else if (parsed.searchParams.has('w')) {
      parsed.searchParams.set('w', String(w));
      mutated = true;
      if (parsed.searchParams.has('h')) parsed.searchParams.delete('h');
      if (parsed.searchParams.has('height')) parsed.searchParams.delete('height');
    }
    if (mutated) return parsed.toString();
  }

  // Case C: common CDN suffix pattern e.g. ...=s500, ...=w500
  // Upgrade =s{n} or =w{n} at the end or before other params
  const suffixUpgraded = urlStr
    .replace(/=s(\d+)(?=$|[&#?])/, `=s${w}`)
    .replace(/=w(\d+)(?=$|[&#?])/, `=w${w}`);
  if (suffixUpgraded !== urlStr) return suffixUpgraded;

  // Fallback: return original
  return urlStr;
}

/* ---------------- Existing component (imports and structure preserved) ---------------- */

const ArtworkSearchCard: React.FC<Props> = ({ artwork }) => {
  const [isSaveOpen, setSaveOpen] = useState(false);

  // CARD THUMBNAIL: keep as before — SafeImage + getDisplaySrc → 500px thumbnail
  const canDisplay = hasDisplayImage(artwork);
  const displaySrc = getDisplaySrc(artwork); // expected to be a 500px URL
  const providerHref: string | undefined = artwork.objectUrl ?? undefined;

  // 0.3.1: wire clicks to open the modal
  const modal = useArtworkModal();

  const onOpenFrom = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    modal.open(e.currentTarget as HTMLElement);
  };

  const titleText = artwork.title || 'Untitled';

  // 0.3.2: compute modal image URL from the *base* image URL (or fallback to display src)
  const requestedWidth = computeRequestedWidth();
  const modalBaseUrl = useMemo(() => pickModalBaseUrl(artwork, displaySrc), [artwork, displaySrc]);
  const modalImageSrc = useMemo(
    () => buildSizedUrl(modalBaseUrl, requestedWidth),
    [modalBaseUrl, requestedWidth]
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

          {/* Image: separate, higher-resolution request from base URL; never a link */}
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
