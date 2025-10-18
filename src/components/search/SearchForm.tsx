// src/components/search/SearchForm.tsx
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [input, setInput] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Artwork Search">
      <label htmlFor="searchQuery">Keywords</label>
      <input
        id="searchQuery"
        name="searchQuery"
        type="text"
        placeholder="What are you contemplating today?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        aria-required="true"
      />
      <button type="submit" disabled={isLoading || !input.trim()}>
        {isLoading ? 'Searching…' : 'Search for Art'}
      </button>
    </form>
  );
}
