// src/services/searchPartition.ts
import type { Artwork, Institution } from '../types/artwork';

export interface PartitionedResults {
  byInstitution: Record<Institution, Artwork[]>;
  institutions: Institution[]; // order to iterate over
}

/**
 * Group results by institution in a predictable order:
 * Rijksmuseum first, then Harvard.
 */
export function partitionByInstitution(items: Artwork[]): PartitionedResults {
  const order: Institution[] = ['Rijksmuseum', 'Harvard Art Museums'];
  const byInstitution: Record<Institution, Artwork[]> = {
    Rijksmuseum: [],
    'Harvard Art Museums': [],
  };

  for (const it of items) {
    byInstitution[it.institution].push(it);
  }

  // Stable sort within groups by title
  for (const inst of order) {
    byInstitution[inst].sort((a, b) => a.title.localeCompare(b.title));
  }

  return { byInstitution, institutions: order };
}
