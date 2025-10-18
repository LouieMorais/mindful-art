// src/pages/SearchPage.tsx
import { useState } from 'react';
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';
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

      // Group items by provider (exactly what the UI expects)
      const grouped: Grouped = { rijksmuseum: [], harvard: [] };
      for (const it of items) {
        if (it.source === 'rijksmuseum') grouped.rijksmuseum.push(it);
        else if (it.source === 'harvard') grouped.harvard.push(it);
      }

      setResults(grouped);
    } catch (err) {
      console.error('Search error', err);
      setError('Something went wrong while searching. Please try again.');
      setResults({ rijksmuseum: [], harvard: [] });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>Search Artworks</h1>
      <SearchForm
        onSearch={(q) => {
          void handleSearch(q);
        }}
        isLoading={isLoading}
      />

      {error && <p role="alert">{error}</p>}

      <SearchResults query={query} results={results} isLoading={isLoading} />
    </main>
  );
}
