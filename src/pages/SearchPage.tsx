// src/pages/SearchPage.tsx
import { useState } from 'react';
import SearchForm from '../components/search/SearchForm';
import ArtworkSearchCard from '../components/search/ArtworkSearchCard';
import { searchArtworks } from '../services/artworkService';
import type { Artwork } from '../types/artwork';

type Grouped = Record<'rijksmuseum' | 'harvard', Artwork[]>;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Grouped>({ rijksmuseum: [], harvard: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(submittedQuery: string) {
    const q = submittedQuery.trim();
    setQuery(q);
    if (!q) return;

    setIsLoading(true);
    setError(null);
    try {
      const { items } = await searchArtworks(q);
      const grouped: Grouped = { rijksmuseum: [], harvard: [] };
      for (const it of items) {
        if (it.source === 'rijksmuseum') grouped.rijksmuseum.push(it);
        else if (it.source === 'harvard') grouped.harvard.push(it);
      }
      setResults(grouped);
    } catch {
      setError('Something went wrong while searching. Please try again.');
      setResults({ rijksmuseum: [], harvard: [] });
    } finally {
      setIsLoading(false);
    }
  }

  const allItems = [...results.rijksmuseum, ...results.harvard];

  return (
    <main className="artsearchform">
      <h1>Search Artworks</h1>
      <SearchForm
        onSearch={(q) => {
          void handleSearch(q);
        }}
        isLoading={isLoading}
      />
      {error && <p role="alert">{error}</p>}

      {query && !isLoading && (
        <>
          <h2 className="section-heading">
            {allItems.length} artwork{allItems.length === 1 ? '' : 's'} found for “{query}”
          </h2>
          <div className="grid">
            {allItems.map((art) => (
              <ArtworkSearchCard key={`${art.source}:${art.id}`} artwork={art} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
