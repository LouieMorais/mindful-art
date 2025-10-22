// src/utils/getDisplaySrc.ts
import type { Artwork } from '../types/artwork';

/** Shared thumbnail width convention (px). Adjust here if standard changes. */
const THUMB_WIDTH = 500;

/**
 * getDisplaySrc
 * Canonical selector and normaliser for thumbnail URLs (list/rail contexts only).
 * Ensures both Harvard IIIF and Rijks (Google) sources conform to the THUMB_WIDTH convention.
 */
export function getDisplaySrc(a: Artwork): string | undefined {
  const raw = a.thumbnailUrl ?? a.imageUrl ?? undefined;
  if (!raw) return undefined;
  return normaliseThumbUrl(raw, THUMB_WIDTH);
}

/** Predicate to filter artworks that actually have a displayable image. */
export function hasDisplayImage(a: Artwork): boolean {
  return Boolean(a.thumbnailUrl ?? a.imageUrl);
}

/* ---------- Normalisation helpers ---------- */

/**
 * Force Harvard IIIF and Rijks (Google) thumbnails to the configured width.
 * This corrects legacy or mis-sized URLs so that lists/rails never use full-res assets.
 */
function normaliseThumbUrl(src: string, width: number): string {
  // 1) IIIF (…/full/<w>,/0/default.jpg) → …/full/500,/0/default.jpg
  const iiif = rewriteIiifWidth(src, width);
  if (iiif.changed) return iiif.url;

  // 2) Google (…=sNNN or …=s0) → …=s500
  const google = rewriteGoogleSize(src, width);
  if (google.changed) return google.url;

  // 3) As-is (non-IIIF/non-Google)
  return src;
}

function rewriteIiifWidth(url: string, width: number): { url: string; changed: boolean } {
  // Match …/full/<width>,/0/default.jpg (retain query/hash tails)
  const m = url.match(/^(.*\/full\/)(\d+)(,\/0\/default\.jpg(?:[?#].*)?)$/i);
  if (!m) return { url, changed: false };
  const [, pre, w, post] = m;
  if (Number(w) === width) return { url, changed: false };
  return { url: `${pre}${width}${post}`, changed: true };
}

function rewriteGoogleSize(url: string, size: number): { url: string; changed: boolean } {
  let host = '';
  try {
    host = new URL(url).hostname;
  } catch {
    /* ignore */
  }
  if (!/\bgoogleusercontent\.com$/i.test(host)) return { url, changed: false };

  // Match a Google size token: =s<digits> optionally followed by dash-modifiers (e.g. -no, -c, -k)
  // Replace the *first* size token anywhere, preserving existing modifiers.
  const re = /=s(\d+)(-[a-z\-]+)?/i;
  const m = url.match(re);

  if (m) {
    const current = Number(m[1]);
    const modifiers = m[2] ?? '';
    if (Number.isFinite(current) && current === size) {
      return { url, changed: false };
    }
    return { url: url.replace(re, `=s${size}${modifiers}`), changed: true };
  }

  // No size token found at all: append one
  return { url: `${url}=s${size}`, changed: true };
}
