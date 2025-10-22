// src/services/rijksmuseum.ts
import { z } from 'zod';
import { sanitiseToPlainText, toSafeHttpUrl } from '../utils/sanitiseHtml';
import type { Artwork } from '../types/artwork';

const RIJKS_KEY = import.meta.env.VITE_RIJKS_API_KEY as string | undefined;

/** Keep only fields we actually use, aligned with the spike */
const RijksLinksSchema = z.object({ web: z.string().optional().nullable() });
const RijksImageSchema = z.object({ url: z.string().optional().nullable() });

const RijksItemSchema = z.object({
  id: z.string().optional().nullable(),
  objectNumber: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  principalOrFirstMaker: z.string().optional().nullable(),
  webImage: RijksImageSchema.optional().nullable(), // spike source for images
  links: RijksLinksSchema.optional().nullable(),
});

const RijksResponseSchema = z.object({
  artObjects: z.array(RijksItemSchema).optional().nullable(),
});

/**
 * Normalise Google (lh3.googleusercontent.com) URLs to a specific size.
 * - '=s0' (original) → '=s500' for thumbnails
 * - if '=sNNN' present, replace with requested size
 * - if no '=s...' suffix, append one
 */
function googleThumb(url: string | null | undefined, size = 500): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!/(^|\.)googleusercontent\.com$/i.test(u.hostname)) return url;
    if (/=s\d+$/i.test(url)) return url.replace(/=s\d+$/i, `=s${size}`);
    if (url.includes('=s0')) return url.replace(/=s0\b/gi, `=s${size}`);
    return `${url}=s${size}`;
  } catch {
    return url;
  }
}

/** Mapper (spike-aligned): use webImage for both imageUrl and thumbnail (thumb is downscaled) */
export const mapRijksItemToArtwork = (o: z.infer<typeof RijksItemSchema>): Artwork => {
  const id = (o.id ?? o.objectNumber ?? '').toString().trim() || 'unknown';
  const title = sanitiseToPlainText(o.title ?? '') || 'Untitled';
  const artist = sanitiseToPlainText(o.principalOrFirstMaker ?? '') || 'Unknown';

  const web = o.webImage?.url ?? null;

  // Thumbnail: a smaller Google variant of webImage (spike used webImage for thumb/full)
  const thumbCandidate = googleThumb(web, 500);
  const thumbnailUrl = toSafeHttpUrl(thumbCandidate) ?? undefined;

  // Full/regular image: keep original webImage URL
  const imageUrl = toSafeHttpUrl(web) ?? null;

  // Record page: prefer https if needed, then sanitise
  const rawObject = o.links?.web ?? null;
  const httpsObject = rawObject?.startsWith('http://')
    ? rawObject.replace(/^http:\/\//, 'https://')
    : rawObject;
  const objectUrl = toSafeHttpUrl(httpsObject);

  return {
    id,
    title,
    artist,
    imageUrl,
    thumbnailUrl,
    objectUrl,
    institution: 'Rijksmuseum',
    source: 'rijksmuseum',
  };
};

export async function searchRijksmuseum(
  query: string,
  limit = 24
): Promise<{ items: Artwork[]; warning?: string }> {
  if (!RIJKS_KEY) {
    return {
      items: [],
      warning: 'Rijksmuseum API key not configured (VITE_RIJKS_API_KEY); skipping provider.',
    };
  }

  // Spike behaviour: English endpoint, imgonly=true, page size (ps)
  const q = encodeURIComponent(query);
  const url =
    `https://www.rijksmuseum.nl/api/en/collection?key=${RIJKS_KEY}` +
    `&q=${q}&imgonly=true&ps=${limit}`;

  const res = await fetch(url);
  if (!res.ok) return { items: [], warning: `Rijksmuseum HTTP ${res.status}` };

  const raw: unknown = await res.json();
  const parsed = RijksResponseSchema.safeParse(raw);
  if (!parsed.success || !parsed.data.artObjects) {
    return { items: [], warning: 'Rijksmuseum schema validation failed' };
  }

  const items = parsed.data.artObjects.map(mapRijksItemToArtwork);
  return { items };
}
