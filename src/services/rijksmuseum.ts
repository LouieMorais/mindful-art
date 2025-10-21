// src/services/rijksmuseum.ts
import { z } from 'zod';
import { sanitiseToPlainText, toSafeHttpUrl } from '../utils/sanitiseHtml';
import type { Artwork } from '../types/artwork';
import type { ProviderResult } from './artworkService';

const RIJKS_KEY = import.meta.env.VITE_RIJKS_API_KEY as string | undefined;
const RIJKS_BASE_URL = 'https://www.rijksmuseum.nl/api/en/collection';
const REQUEST_TIMEOUT = 10000; // 10 seconds

const RijksItemSchema = z.object({
  id: z.string().optional().nullable(),
  objectNumber: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  principalOrFirstMaker: z.string().optional().nullable(),
  webImage: z
    .object({
      url: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  links: z
    .object({
      web: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

const RijksResponseSchema = z.object({
  artObjects: z.array(RijksItemSchema).optional().nullable(),
});

/**
 * Search Rijksmuseum with comprehensive error handling
 */
export async function searchRijksmuseum(query: string, limit = 24): Promise<ProviderResult> {
  // Check for API key
  if (!RIJKS_KEY) {
    return {
      items: [],
      warning: 'Rijksmuseum API key not configured',
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const q = encodeURIComponent(query);
    const url = `${RIJKS_BASE_URL}?key=${RIJKS_KEY}&q=${q}&imgonly=true&ps=${limit}`;

    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new AppError(`Rijksmuseum API returned ${response.status}`, 'API_ERROR', {
        component: 'rijksmuseum',
        action: 'searchRijksmuseum',
        metadata: { status: response.status, query },
      });
    }

    const raw: unknown = await response.json();

  const items: Artwork[] = parsed.data.artObjects.map((o) => {
    // id: prefer `id`, fall back to `objectNumber`
    const stableId = (o.id ?? o.objectNumber ?? '').toString().trim();
    const title = sanitiseToPlainText(o.title ?? '');
    const artist = sanitiseToPlainText(o.principalOrFirstMaker ?? '');

    const parsed = RijksResponseSchema.safeParse(raw);

    if (!parsed.success) {
      logError(parsed.error, {
        component: 'rijksmuseum',
        action: 'searchRijksmuseum',
        metadata: { query },
      });

      return {
        items: [],
        warning: 'Unable to process Rijksmuseum response',
      };
    }

    const artObjects = parsed.data.artObjects ?? [];

    const items: Artwork[] = artObjects
      .map((obj) => {
        const stableId = (obj.id ?? obj.objectNumber ?? '').toString().trim();
        const title = sanitizeToPlainText(obj.title ?? '');
        const artist = sanitizeToPlainText(obj.principalOrFirstMaker ?? '');
        const imageUrl = toSafeHttpUrl(obj.webImage?.url ?? null);
        const objectUrl = toSafeHttpUrl(obj.links?.web ?? null);

        return {
          id: stableId || 'unknown',
          title: title || 'Untitled',
          artist: artist || 'Unknown',
          date: '',
          imageUrl,
          objectUrl,
          institution: 'Rijksmuseum' as const,
          source: 'rijksmuseum' as const,
        };
      })
      .filter((item) => item.id !== 'unknown' && item.imageUrl !== null);

    return { items };
  } catch (error) {
    if (error instanceof AppError) {
      logError(error, error.context);
      return { items: [], warning: error.message };
    }

    if ((error as Error).name === 'AbortError') {
      logError(error, {
        component: 'rijksmuseum',
        action: 'searchRijksmuseum',
        metadata: { reason: 'timeout', query },
      });
      return { items: [], warning: 'Rijksmuseum request timed out' };
    }

    logError(error, {
      component: 'rijksmuseum',
      action: 'searchRijksmuseum',
      metadata: { query },
    });

    return { items: [], warning: 'Failed to search Rijksmuseum' };
  } finally {
    clearTimeout(timeoutId);
  }
}
