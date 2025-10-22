// src/components/search/ArtworkSearchCard.tsx
import React, { useState } from 'react';
import type { Artwork } from '../../types/artwork';
import { SafeImage } from '../SafeImage';
import SaveToGalleryModal from '../modals/SaveToGalleryModal';
import { getDisplaySrc } from '../../utils/getDisplaySrc';

/**
 * ArtworkSearchCard
 * List/rail card: ALWAYS use getDisplaySrc(a) to avoid full-res thumbnails.
 */
export default function ArtworkSearchCard({ artwork }: { artwork: Artwork }) {
  const [open, setOpen] = useState(false);

  const displaySrc = getDisplaySrc(artwork);
  const hasImage = Boolean(displaySrc);

  // Normalise nullable objectUrl to undefined for the <a href> prop
  const recordHref: string | undefined = artwork.objectUrl ?? undefined;

  const imageNode = hasImage ? (
    <SafeImage
      src={displaySrc!}
      alt={`${artwork.title} — ${artwork.artist ?? 'Unknown'}`}
      className="art-card__image"
      width={500} // intrinsic width convention for thumbnails
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
