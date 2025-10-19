// src/pages/ResultsPage.tsx
import { useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchResults from '../components/search/SearchResults';

export default function ResultsPage() {
  const { query, isLoading, error, results, runSearch } = useSearch('');

  useEffect(() => {
    // Optionally trigger a default search here if you later parse a query param.
    // void runSearch('Rembrandt');
  }, [runSearch]);

  // Group results by source for SearchResults component
  const groupedResults: Record<string, typeof results> = {
    rijksmuseum: results.filter((r) => r.source === 'rijksmuseum'),
    harvard: results.filter((r) => r.source === 'harvard'),
  };

  return (
    <main>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <SearchResults query={query} results={groupedResults} isLoading={isLoading} />
      )}
    </main>
  );
}
