// src/pages/ResultsPage.tsx
import { useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchResults from '../components/search/SearchResults';

export default function ResultsPage() {
  const { isLoading, error, warnings, results, runSearch } = useSearch('');

  useEffect(() => {
    // Optionally trigger a default search here if you later parse a query param.
    // void runSearch('Rembrandt');
  }, [runSearch]);

  return (
    <main>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && <SearchResults items={results} warnings={warnings} />}
    </main>
  );
}
