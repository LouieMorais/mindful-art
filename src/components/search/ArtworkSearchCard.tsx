// src/components/search/ArtworkSearchCard.tsx
import { useState } from 'react';
import type { Artwork } from '../../types/artwork';
import SaveToGalleryModal from '../modals/SaveToGalleryModal';

interface ArtworkSearchCardProps {
  artwork: Artwork;
}

export default function ArtworkSearchCard({ artwork }: ArtworkSearchCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="art-card">
      {artwork.imageUrl ? (
        <img
          src={artwork.imageUrl}
          alt={`${artwork.title} — ${artwork.artist}`}
          className="art-card__image"
          loading="lazy"
        />
      ) : (
        <div className="art-card__placeholder" aria-label="No image available">
          <span>No Image</span>
        </div>
      )}

      <figcaption className="art-card__caption">
        <strong className="art-card__title">{artwork.title}</strong>
        <br />
        <span className="art-card__artist">{artwork.artist}</span>
        {(artwork.year ?? artwork.date) && (
          <>
            <br />
            <time className="art-card__date">{artwork.year ?? artwork.date}</time>
          </>
        )}
      </figcaption>

      <div className="art-card__actions">
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
          Save to Gallery
        </button>
      </div>

      {open && <SaveToGalleryModal artwork={artwork} onClose={() => setOpen(false)} />}
    </figure>
  );
}
