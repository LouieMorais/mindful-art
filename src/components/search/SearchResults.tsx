// src/components/search/SearchResults.tsx
import type { Artwork } from '../../types/artwork';
import { partitionByInstitution } from '../../services/searchPartition';
import ArtworkSearchCard from './ArtworkSearchCard';

interface Props {
  items: Artwork[];
  warnings: string[];
}

export default function SearchResults({ items, warnings }: Props) {
  if (warnings.length > 0) {
    // Non-fatal provider warnings (e.g., missing API keys)
    // We surface them unobtrusively above results.
    return (
      <div>
        <div role="note" style={{ padding: '0.5rem 0', color: '#8a6d3b' }}>
          {warnings.map((w, i) => (
            <div key={i}>Note: {w}</div>
          ))}
        </div>
        <ResultsBody items={items} />
      </div>
    );
  }
  return <ResultsBody items={items} />;
}

function ResultsBody({ items }: { items: Artwork[] }) {
  if (items.length === 0) {
    return (
      <p role="status" aria-live="polite" style={{ paddingTop: '1rem' }}>
        No results.
      </p>
    );
  }

  const { byInstitution, institutions } = partitionByInstitution(items);

  return (
    <div style={{ marginTop: '1rem' }}>
      {institutions.map((inst) => (
        <section key={inst} aria-labelledby={`inst-${inst}`}>
          <h2 id={`inst-${inst}`} style={{ marginTop: '1rem' }}>
            {inst}
          </h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {byInstitution[inst].map((it) => (
              <ArtworkSearchCard key={`${it.source}:${it.id}`} item={it} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
