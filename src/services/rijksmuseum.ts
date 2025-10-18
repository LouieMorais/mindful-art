// src/services/rijksmuseum.ts
import { z } from 'zod';
import { sanitizeToPlainText, toSafeHttpUrl } from '../utils/sanitizeHtml';
import type { Artwork } from '../types/artwork';

const RIJKS_KEY = import.meta.env.VITE_RIJKS_API_KEY as string | undefined;

const RijksItemSchema = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  principalOrFirstMaker: z.string().optional().nullable(),
  webImage: z.object({ url: z.string().url().optional().nullable() }).optional().nullable(),
  links: z.object({ web: z.string().url().optional().nullable() }).optional().nullable(),
});

const RijksResponseSchema = z.object({
  artObjects: z.array(RijksItemSchema),
});

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

  const json: unknown = await res.json();
  const parsed = RijksResponseSchema.safeParse(json);
  if (!parsed.success) {
    return { items: [], warning: 'Rijksmuseum schema validation failed' };
  }

  const items: Artwork[] = parsed.data.artObjects.map((o) => {
    const title = sanitizeToPlainText(o.title ?? '');
    const artist = sanitizeToPlainText(o.principalOrFirstMaker ?? '');
    const imageUrl = toSafeHttpUrl(o.webImage?.url ?? null);
    const objectUrl = toSafeHttpUrl(o.links?.web ?? null);
    return {
      id: o.id,
      title: title || 'Untitled',
      artist: artist || 'Unknown',
      date: '',
      imageUrl,
      objectUrl,
      institution: 'Rijksmuseum',
      source: 'rijksmuseum',
    };
  });

  return { items };
}
