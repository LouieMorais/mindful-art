// src/services/harvard.ts
import { z } from 'zod';
import { sanitizeToPlainText, toSafeHttpUrl } from '../utils/sanitizeHtml';
import { logError, AppError } from '../utils/errorLogger';
import type { Artwork } from '../types/artwork';
import type { ProviderResult } from './artworkService';

const HARVARD_KEY = import.meta.env.VITE_HARVARD_API_KEY as string | undefined;
const HARVARD_BASE_URL = 'https://api.harvardartmuseums.org/object';
const REQUEST_TIMEOUT = 10000; // 10 seconds

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

/**
 * Search Harvard Art Museums with comprehensive error handling
 */
export async function searchHarvard(query: string, limit = 24): Promise<ProviderResult> {
  if (!HARVARD_KEY) {
    return {
      items: [],
      warning: 'Harvard API key not configured',
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const q = encodeURIComponent(query);
    const url =
      `${HARVARD_BASE_URL}?apikey=${HARVARD_KEY}` +
      `&q=${q}&size=${limit}&hasimage=1&fields=id,title,dated,primaryimageurl,url,people`;

    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new AppError(`Harvard API returned ${response.status}`, 'API_ERROR', {
        component: 'harvard',
        action: 'searchHarvard',
        metadata: { status: response.status, query },
      });
    }

    const rawJson: unknown = await response.json();

    if (typeof rawJson !== 'object' || rawJson === null) {
      throw new AppError('Invalid response format from Harvard', 'INVALID_RESPONSE', {
        component: 'harvard',
        action: 'searchHarvard',
      });
    }

    const parsed = HarvardResponseSchema.safeParse(rawJson);

    if (!parsed.success) {
      logError(parsed.error, {
        component: 'harvard',
        action: 'searchHarvard',
        metadata: { query },
      });

      return {
        items: [],
        warning: 'Unable to process Harvard response',
      };
    }

    const { records } = parsed.data;

    const items: Artwork[] = records
      .map((record) => {
        const title = sanitizeToPlainText(record.title ?? '');
        const artist = sanitizeToPlainText(record.people?.[0]?.name ?? '');
        const date = sanitizeToPlainText(record.dated ?? '');
        const imageUrl = toSafeHttpUrl(record.primaryimageurl ?? null);
        const objectUrl = toSafeHttpUrl(record.url ?? null);

        return {
          id: String(record.id),
          title: title || 'Untitled',
          artist: artist || 'Unknown',
          date,
          imageUrl,
          objectUrl,
          institution: 'Harvard Art Museums' as const,
          source: 'harvard' as const,
        };
      })
      .filter((item) => item.imageUrl !== null);

    return { items };
  } catch (error) {
    if (error instanceof AppError) {
      logError(error, error.context);
      return { items: [], warning: error.message };
    }

    if ((error as Error).name === 'AbortError') {
      logError(error, {
        component: 'harvard',
        action: 'searchHarvard',
        metadata: { reason: 'timeout', query },
      });
      return { items: [], warning: 'Harvard request timed out' };
    }

    logError(error, {
      component: 'harvard',
      action: 'searchHarvard',
      metadata: { query },
    });

    return { items: [], warning: 'Failed to search Harvard' };
  } finally {
    clearTimeout(timeoutId);
  }
}
