// src/hooks/useSearch.ts
import { useCallback, useState } from 'react';
import { searchArtworks } from '../services/artworkService';
import type { Artwork } from '../types/artwork';

interface UseSearchState {
  query: string;
  setQuery: (v: string) => void;
  isLoading: boolean;
  error: string | null;
  warnings: string[];
  results: Artwork[];
  runSearch: (q?: string) => Promise<void>;
}

export function useSearch(initialQuery = ''): UseSearchState {
  const [query, setQuery] = useState<string>(initialQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [results, setResults] = useState<Artwork[]>([]);

  const runSearch = useCallback(
    async (q?: string) => {
      const effective = (q ?? query).trim();
      if (!effective) {
        setResults([]);
        setWarnings([]);
        setError(null);
        return;
      }
      setIsLoading(true);
      setError(null);
      setWarnings([]);
      try {
        const { items, warnings } = await searchArtworks(effective);
        setResults(items);
        setWarnings(warnings);
      } catch {
        // purposefully ignore underlying error to avoid leaking details to the UI
        setError('Something went wrong while searching. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  return { query, setQuery, isLoading, error, warnings, results, runSearch };
}
