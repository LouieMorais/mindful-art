// src/services/harvard.ts
import { z } from 'zod';
import { sanitiseToPlainText, toSafeHttpUrl } from '../utils/sanitiseHtml';
import type { Artwork } from '../types/artwork';

const HARVARD_KEY = import.meta.env.VITE_HARVARD_API_KEY as string | undefined;

// Minimal fields to keep payload small
const HarvardImageSchema = z.object({
  baseimageurl: z.string().optional().nullable(), // do URL safety separately
  iiifbaseuri: z.string().optional().nullable(),
});

const HarvardItemSchema = z.object({
  id: z.number(),
  title: z.string().optional().nullable(),
  dated: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  people: z
    .array(z.object({ name: z.string().optional().nullable() }))
    .optional()
    .nullable(),
  primaryimageurl: z.string().optional().nullable(),
  images: z.array(HarvardImageSchema).optional().nullable(),
});

const HarvardResponseSchema = z.object({
  info: z
    .object({
      totalrecords: z.number().optional().nullable(),
    })
    .optional()
    .nullable(),
  records: z.array(HarvardItemSchema),
});

export async function searchHarvard(
  query: string,
  limit = 70
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
    `&q=${q}&size=${limit}&hasimage=1` +
    `&fields=id,title,dated,primaryimageurl,url,people,images.baseimageurl,images.iiifbaseuri`;

  const res = await fetch(url);
  if (!res.ok) {
    return { items: [], warning: `Harvard HTTP ${res.status}` };
  }

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
    const title = sanitiseToPlainText(r.title ?? '');
    const artist = sanitiseToPlainText(r.people?.[0]?.name ?? '');
    const date = sanitiseToPlainText(r.dated ?? '');

    // IIIF-first selection
    const iiif = r.images?.find((i) => i?.iiifbaseuri)?.iiifbaseuri?.replace(/\/$/, '') ?? null;
    const base = r.images?.find((i) => i?.baseimageurl)?.baseimageurl ?? null;
    const primary = r.primaryimageurl ?? null;

    // Derive URLs with IIIF preference and safe fallbacks
    const thumbnailUrl = toSafeHttpUrl(
      iiif ? `${iiif}/full/500,/0/default.jpg` : (base ?? primary)
    );
    const imageUrl = toSafeHttpUrl(primary ?? (iiif ? `${iiif}/full/1200,/0/default.jpg` : base));
    const objectUrl = toSafeHttpUrl(r.url ?? null);

    return {
      id: String(r.id),
      title: title || 'Untitled',
      artist: artist || 'Unknown',
      date,
      imageUrl,
      thumbnailUrl: thumbnailUrl ?? undefined, // optional field
      objectUrl,
      institution: 'Harvard Art Museums',
      source: 'harvard',
    };
  });

  return { items };
}
