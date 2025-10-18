// src/pages/SearchPage.tsx
import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useSearch } from '../hooks/useSearch';

export default function SearchPage() {
  const { query, setQuery, isLoading, error, warnings, results, runSearch } = useSearch('');

  return (
    <main>
      <SearchForm value={query} onChange={setQuery} onSubmit={() => void runSearch()} />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && <SearchResults items={results} warnings={warnings} />}
    </main>
  );
}
