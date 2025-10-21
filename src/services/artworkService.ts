// src/services/artworkService.ts
import type { Artwork } from '../types/artwork';
import { searchRijksmuseum } from './rijksmuseum';
import { searchHarvard } from './harvard';

export interface SearchResult {
  items: Artwork[];
  warnings: string[]; // provider-level warnings (e.g., missing API key)
}

/**
 * Orchestrated search across providers.
 * - Runs providers concurrently.
 * - Flattens and returns all validated Artwork items.
 * - Collects provider warnings without failing the whole search.
 */
export async function searchArtworks(query: string, limitPerProvider = 24): Promise<SearchResult> {
  const [rijks, harvard] = await Promise.all([
    searchRijksmuseum(query, limitPerProvider),
    searchHarvard(query, limitPerProvider),
  ]);

  const items: Artwork[] = [...rijks.items, ...harvard.items];
  const warnings: string[] = [];
  if (rijks.warning) warnings.push(rijks.warning);
  if (harvard.warning) warnings.push(harvard.warning);

  // Sort by title asc as a stable default; UI will group by institution later.
  items.sort((a, b) => a.title.localeCompare(b.title));
  return { items, warnings };
}