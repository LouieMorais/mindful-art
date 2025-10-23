// src/components/search/ArtworkSearchCard.tsx

/**
 * Search cards: render semantic HTML for all instances.
 * - Structure: <article> + <h3> + <dl>/<dt>/<dd>
 * - Thumbnail/title: local no-op click handler (modal deferred)
 * - Institution: only external link (provider page)
 * - Preserve existing classes and image utilities; no CSS/wrapper changes
 */

import React, { useState } from 'react';
import { SafeImage } from '../SafeImage';
import { getDisplaySrc, hasDisplayImage } from '../../utils/getDisplaySrc';
import type { Artwork } from '../../types/artwork';
import SaveToGalleryModal from '../modals/SaveToGalleryModal';

type Props = { artwork: Artwork };

const ArtworkSearchCard: React.FC<Props> = ({ artwork }) => {
  const [isSaveOpen, setSaveOpen] = useState(false);

  const canDisplay = hasDisplayImage(artwork);
  const displaySrc = getDisplaySrc(artwork);
  // Use undefined (not null) so <a href> typing is satisfied when used
  const providerHref: string | undefined = artwork.objectUrl ?? undefined;

  const openLocal = (e: React.MouseEvent) => {
    e.preventDefault();

    console.debug('openLocal (stub)', artwork);
  };

  const onRemoveStub = (e: React.MouseEvent) => {
    e.preventDefault();

    console.debug('remove from gallery (stub)', artwork);
  };

  return (
    <>
      <article data-artworkcard-context="search" className="art-card__search">
        {canDisplay ? (
          <a href="#" onClick={openLocal} aria-label="Open artwork locally">
            <SafeImage src={displaySrc} width={500} alt={artwork.title || 'Artwork'} />
          </a>
        ) : (
          <div className="art-card__noimage">
            <span className="art-card__noimage__label">No image available</span>
            {providerHref && (
              <a
                className="art-card__noimage__provider"
                href={providerHref}
                target="_blank"
                rel="noreferrer"
              >
                View on provider
              </a>
            )}
          </div>
        )}

        <h3 className="art-card__title">
          <a href="#" onClick={openLocal}>
            {artwork.title || 'Untitled'}
          </a>
        </h3>

        <dl className="art-card__meta">
          <dt className="visually-hidden">Artist</dt>
          <dd className="art-card__artist">{artwork.artist || 'Unknown artist'}</dd>

          {artwork.date && (
            <>
              <dt className="visually-hidden">Date</dt>
              <dd className="art-card__date">{artwork.date}</dd>
            </>
          )}

          {providerHref && (
            <>
              <dt className="visually-hidden">Institution</dt>
              <dd className="art-card__institution">
                <a href={providerHref} target="_blank" rel="noreferrer">
                  Courtesy of {artwork.institution || 'the provider'}
                </a>
              </dd>
            </>
          )}
        </dl>

        <ul className="art-card__actions">
          <li className="art-card__save">
            <button type="button" className="btn btn-primary" onClick={() => setSaveOpen(true)}>
              Save to Gallery
            </button>
          </li>
          <li className="art-card__remove">
            <a href="#" onClick={onRemoveStub}>
              Remove from Gallery
            </a>
          </li>
        </ul>
      </article>

      {isSaveOpen && <SaveToGalleryModal artwork={artwork} onClose={() => setSaveOpen(false)} />}
    </>
  );
};

export default ArtworkSearchCard;
