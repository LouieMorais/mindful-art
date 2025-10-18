// src/services/rijksmuseum.ts
import { z } from 'zod';
import { sanitizeToPlainText, toSafeHttpUrl } from '../utils/sanitizeHtml';
import type { Artwork } from '../types/artwork';

const RIJKS_KEY = import.meta.env.VITE_RIJKS_API_KEY as string | undefined;

/**
 * Zod schema aligned to the spike:
 * - Accept both `id` and `objectNumber` (either may be present).
 * - Permit optional/nullable URL-bearing fields; we do URL safety separately.
 */
const RijksItemSchema = z.object({
  id: z.string().optional().nullable(),
  objectNumber: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  principalOrFirstMaker: z.string().optional().nullable(),
  webImage: z
    .object({
      url: z.string().optional().nullable(), // do not enforce URL format here
    })
    .optional()
    .nullable(),
  links: z
    .object({
      web: z.string().optional().nullable(), // do not enforce URL format here
    })
    .optional()
    .nullable(),
});

const RijksResponseSchema = z.object({
  artObjects: z.array(RijksItemSchema).optional().nullable(),
});

/**
 * Drop-in search for Rijksmuseum that mirrors the spike’s normalisation.
 * - Gracefully handles missing keys / variant payloads.
 * - Returns warnings instead of throwing on schema mismatch.
 */
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

  const q = encodeURIComponent(query);
  const url = `https://www.rijksmuseum.nl/api/en/collection?key=${RIJKS_KEY}&q=${q}&imgonly=true&ps=${limit}`;

  const res = await fetch(url);
  if (!res.ok) {
    return { items: [], warning: `Rijksmuseum HTTP ${res.status}` };
  }

  // Parse as unknown first to avoid unsafe assignment; then validate.
  const raw: unknown = await res.json();

  // Some error payloads are 200 OK but not the usual shape — handle that.
  if (typeof raw !== 'object' || raw === null) {
    return { items: [], warning: 'Rijksmuseum returned a non-object JSON payload' };
  }

  const parsed = RijksResponseSchema.safeParse(raw);
  if (!parsed.success || !parsed.data.artObjects) {
    return { items: [], warning: 'Rijksmuseum schema validation failed' };
  }

  const items: Artwork[] = parsed.data.artObjects.map((o) => {
    // id: prefer `id`, fall back to `objectNumber`
    const stableId = (o.id ?? o.objectNumber ?? '').toString().trim();
    const title = sanitizeToPlainText(o.title ?? '');
    const artist = sanitizeToPlainText(o.principalOrFirstMaker ?? '');

    const imageUrl = toSafeHttpUrl(o.webImage?.url ?? null);
    const objectUrl = toSafeHttpUrl(o.links?.web ?? null);

    return {
      id: stableId || 'unknown',
      title: title || 'Untitled',
      artist: artist || 'Unknown',
      date: '', // Rijks “collection” endpoint doesn’t reliably return a single date field in this list view
      imageUrl,
      objectUrl,
      institution: 'Rijksmuseum',
      source: 'rijksmuseum',
    };
  });

  return { items };
}
