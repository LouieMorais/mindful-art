// src/components/search/ArtworkSearchCard.tsx
import type { Artwork } from '../../types/artwork';

interface Props {
  item: Artwork;
  onSave?: (item: Artwork) => void; // future use
}

export default function ArtworkSearchCard({ item, onSave }: Props) {
  const label = `${item.title}${item.artist ? ` — ${item.artist}` : ''}`;
  return (
    <article
      aria-label={label}
      style={{
        border: '1px solid #e5e5e5',
        borderRadius: 6,
        padding: 12,
        display: 'flex',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          overflow: 'hidden',
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={label}
            style={{ maxWidth: '120px', maxHeight: '120px', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <div style={{ fontSize: 12, color: '#666' }}>No image</div>
        )}
      </div>
      <div>
        <h3 style={{ margin: '0 0 6px' }}>{item.title}</h3>
        <div style={{ fontSize: 14, color: '#333' }}>
          {item.artist || 'Unknown'}
          {item.date ? `, ${item.date}` : ''}
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{item.institution}</div>
        {item.objectUrl && (
          <div style={{ marginTop: 8 }}>
            <a href={item.objectUrl} target="_blank" rel="noreferrer">
              View on provider site
            </a>
          </div>
        )}
        {onSave && (
          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={() => onSave(item)} aria-label={`Save ${label}`}>
              Save
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
