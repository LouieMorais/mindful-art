// src/components/search/SearchResults.tsx
import React from 'react';
import type { Artwork } from '../../types/artwork';
import ArtworkSearchCard from './ArtworkSearchCard';
import { INSTITUTIONS } from '../../config/institutions';
import { hasDisplayImage } from '../../utils/getDisplaySrc';

/**
 * SearchResults
 * Groups and renders results by institution.
 * Filters to items that have a displayable image via the canonical predicate.
 */
interface SearchResultsProps {
  query: string;
  results: Record<string, Artwork[]>;
  isLoading: boolean;
}

export default function SearchResults({ query, results, isLoading }: SearchResultsProps) {
  if (isLoading) return <p>Loading results…</p>;
  if (!query) return null;

  const total = Object.values(results).flat().filter(hasDisplayImage).length;

  if (total === 0) {
    return (
      <section aria-labelledby="noResultsTitle">
        <h2 id="noResultsTitle">No Art Found</h2>
        <p>
          We could not locate artworks matching “{query}”. Refine your keywords or try a different
          topic.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Search Results">
      <h2>
        {total} artwork{total === 1 ? '' : 's'} found for “{query}”
      </h2>

      {INSTITUTIONS.map((inst) => {
        const items = (results[inst.id] ?? []).filter(hasDisplayImage);
        if (!items.length) return null;

        return (
          <article key={inst.id} aria-labelledby={`heading-${inst.id}`}>
            <h3 id={`heading-${inst.id}`}>
              {inst.name} ({items.length})
            </h3>
            <div className="art-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {items.map((art) => (
                <ArtworkSearchCard key={`${art.institution}:${art.id}`} artwork={art} />
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
