// src/components/search/SearchResults.tsx
import type { Artwork } from '../../types/artwork';
import ArtworkSearchCard from './ArtworkSearchCard';
import { INSTITUTIONS } from '../../config/institutions';

interface SearchResultsProps {
  query: string;
  results: Record<string, Artwork[]>;
  isLoading: boolean;
}

export default function SearchResults({ query, results, isLoading }: SearchResultsProps) {
  if (isLoading) return <p>Loading results…</p>;
  if (!query) return null;

  const total = Object.values(results)
    .flat()
    .filter((a) => a.imageUrl).length;

  const allEmpty = total === 0;

  if (allEmpty) {
    return (
      <section aria-labelledby="noResultsTitle">
        <h2 id="noResultsTitle">No Art Found</h2>
        <p>
          We couldn’t locate artworks matching “{query}”. Try refining your keywords or exploring
          different topics.
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
        const items = (results[inst.id] ?? []).filter((a) => a.imageUrl);
        if (!items.length) return null;

        return (
          <article key={inst.id} aria-labelledby={`heading-${inst.id}`}>
            <h3 id={`heading-${inst.id}`}>
              {inst.name} ({items.length})
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              {items.map((art) => (
                <ArtworkSearchCard key={art.id} artwork={art} />
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}
