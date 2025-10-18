// src/components/search/ArtworkSearchCard.tsx
import type { Artwork } from '../../types/artwork';

interface ArtworkSearchCardProps {
  artwork: Artwork;
}

export default function ArtworkSearchCard({ artwork }: ArtworkSearchCardProps) {
  return (
    <figure
      style={{
        width: '200px',
        margin: 0,
      }}
    >
      {artwork.imageUrl ? (
        <img
          src={artwork.imageUrl}
          alt={`${artwork.title} — ${artwork.artist}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          loading="lazy"
        />
      ) : (
        <div
          style={{
            width: '200px',
            height: '200px',
            background: '#eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span>No Image</span>
        </div>
      )}

      <figcaption>
        <strong>{artwork.title}</strong>
        <br />
        <span>{artwork.artist}</span>
        {artwork.date && (
          <>
            <br />
            <time>{artwork.date}</time>
          </>
        )}
      </figcaption>
    </figure>
  );
}
