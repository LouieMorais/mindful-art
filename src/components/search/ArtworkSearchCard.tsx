// src/components/search/ArtworkSearchCard.tsx
import React, { useState } from 'react';
import type { Artwork } from '../../types/artwork';
import { SafeImage } from '../SafeImage';
import SaveToGalleryModal from '../modals/SaveToGalleryModal';

/**
 * ArtworkSearchCard
 * Renders a single artwork result card.
 * Displays a dedicated thumbnail when present, falling back to imageUrl.
 * Link targets and actions are unchanged when a record URL is available.
 */
export default function ArtworkSearchCard({ artwork }: { artwork: Artwork }) {
  const [open, setOpen] = useState(false);

  const displaySrc = artwork.thumbnailUrl ?? artwork.imageUrl;
  const hasImage = Boolean(displaySrc);

  // Normalise nullable objectUrl (string | null) to string | undefined for <a href>
  const recordHref: string | undefined = artwork.objectUrl ?? undefined;

  const imageNode = hasImage ? (
    <SafeImage
      src={displaySrc!}
      alt={`${artwork.title} — ${artwork.artist ?? 'Unknown'}`}
      className="art-card__image"
      width={240}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 240px"
    />
  ) : (
    <div className="art-card__placeholder" aria-label="No image available">
      <span>No Image</span>
    </div>
  );

  return (
    <figure className="art-card" aria-label={`${artwork.title} — ${artwork.artist ?? 'Unknown'}`}>
      {recordHref ? (
        <a
          className="art-card__link"
          href={recordHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Open museum record in a new tab"
        >
          {imageNode}
        </a>
      ) : (
        // If there is no record URL, render a non-link wrapper to keep layout consistent.
        <div className="art-card__link" aria-label="No external record available">
          {imageNode}
        </div>
      )}

      <figcaption className="art-card__caption">
        <strong className="art-card__title">{artwork.title}</strong>
        <br />
        <span className="art-card__artist">{artwork.artist ?? 'Unknown artist'}</span>
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
