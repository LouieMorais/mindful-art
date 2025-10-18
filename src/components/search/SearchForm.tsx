// src/components/search/SearchForm.tsx
import { FormEvent } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}

export default function SearchForm({ value, onChange, onSubmit }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby="search-heading">
      <h1 id="search-heading" style={{ fontSize: '1.5rem' }}>
        Search artworks
      </h1>
      <label htmlFor="q">Keywords</label>
      <input
        id="q"
        name="q"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Rembrandt portrait"
        aria-describedby="search-help"
        style={{ display: 'block', width: '100%', maxWidth: 480, margin: '0.5rem 0' }}
      />
      <div id="search-help" style={{ fontSize: '0.9rem', color: '#666' }}>
        Searches Rijksmuseum and Harvard Art Museums.
      </div>
      <button type="submit">Search</button>
    </form>
  );
}
