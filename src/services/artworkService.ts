// src/services/artworkService.ts
import type { Artwork } from '../types/artwork';
import { searchRijksmuseum } from './rijksmuseum';
import { searchHarvard } from './harvard';
import { logError, AppError } from '../utils/errorLogger';

export interface SearchResult {
  items: Artwork[];
  warnings: string[];
}

export interface ProviderResult {
  items: Artwork[];
  warning?: string;
}

/**
 * Orchestrated search across providers with comprehensive error handling
 */
export async function searchArtworks(query: string, limitPerProvider = 24): Promise<SearchResult> {
  if (!query || query.trim().length === 0) {
    throw new AppError('Search query cannot be empty', 'INVALID_QUERY', {
      action: 'searchArtworks',
    });
  }

  const trimmedQuery = query.trim();
  const warnings: string[] = [];
  const allItems: Artwork[] = [];

  // Run providers concurrently with individual error handling
  const results = await Promise.allSettled([
    searchRijksmuseum(trimmedQuery, limitPerProvider),
    searchHarvard(trimmedQuery, limitPerProvider),
  ]);

  // Process results
  results.forEach((result, index) => {
    const providerName = index === 0 ? 'Rijksmuseum' : 'Harvard';

    if (result.status === 'fulfilled') {
      const { items, warning } = result.value;
      allItems.push(...items);

      if (warning) {
        warnings.push(`${providerName}: ${warning}`);
      }
    } else {
      // Log the error but don't fail the entire search
      logError(result.reason, {
        component: 'artworkService',
        action: 'searchArtworks',
        metadata: { provider: providerName, query: trimmedQuery },
      });

      warnings.push(`${providerName} is temporarily unavailable`);
    }
  });

  // Sort by title for consistent ordering
  allItems.sort((a, b) => a.title.localeCompare(b.title));

  return { items: allItems, warnings };
}
