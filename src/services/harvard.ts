// src/services/harvard.ts
import { z } from 'zod';
import { sanitizeToPlainText, toSafeHttpUrl } from '../utils/sanitizeHtml';
import type { Artwork } from '../types/artwork';

const HARVARD_KEY = import.meta.env.VITE_HARVARD_API_KEY as string | undefined;

// Minimal fields to keep payload small
const HarvardItemSchema = z.object({
  id: z.number(),
  title: z.string().optional().nullable(),
  dated: z.string().optional().nullable(),
  primaryimageurl: z.string().url().optional().nullable(),
  url: z.string().url().optional().nullable(),
  people: z
    .array(z.object({ name: z.string().optional().nullable() }))
    .optional()
    .nullable(),
});

const HarvardResponseSchema = z.object({
  info: z.object({ totalrecordsperquery: z.number().optional() }).optional().nullable(),
  records: z.array(HarvardItemSchema),
});

export async function searchHarvard(
  query: string,
  limit = 24
): Promise<{ items: Artwork[]; warning?: string }> {
  if (!HARVARD_KEY) {
    return {
      items: [],
      warning: 'Harvard API key not configured (VITE_HARVARD_API_KEY); skipping provider.',
    };
  }

  const q = encodeURIComponent(query);
  const url =
    `https://api.harvardartmuseums.org/object?apikey=${HARVARD_KEY}` +
    `&q=${q}&size=${limit}&hasimage=1&fields=id,title,dated,primaryimageurl,url,people`;

  const res = await fetch(url);
  if (!res.ok) {
    return { items: [], warning: `Harvard HTTP ${res.status}` };
  }

  // Fix: use explicit typing and safe narrowing
  const rawJson: unknown = await res.json();
  if (typeof rawJson !== 'object' || rawJson === null) {
    return { items: [], warning: 'Harvard API returned non-object JSON' };
  }

  const parsed = HarvardResponseSchema.safeParse(rawJson);
  if (!parsed.success) {
    return { items: [], warning: 'Harvard schema validation failed' };
  }

  const { records } = parsed.data;

  const items: Artwork[] = records.map((r) => {
    const title = sanitizeToPlainText(r.title ?? '');
    const artist = sanitizeToPlainText(r.people?.[0]?.name ?? '');
    const date = sanitizeToPlainText(r.dated ?? '');
    const imageUrl = toSafeHttpUrl(r.primaryimageurl ?? null);
    const objectUrl = toSafeHttpUrl(r.url ?? null);
    return {
      id: String(r.id),
      title: title || 'Untitled',
      artist: artist || 'Unknown',
      date,
      imageUrl,
      objectUrl,
      institution: 'Harvard Art Museums',
      source: 'harvard',
    };
  });

  return { items };
}
