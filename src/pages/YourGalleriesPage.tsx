// src/pages/YourGalleriesPage.tsx
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useGalleryStore } from '../store/galleryStore';
import { getDisplaySrc, hasDisplayImage } from '../utils/getDisplaySrc';

export default function YourGalleriesPage() {
  const { galleries } = useGalleryStore();

  return (
    <main className="page page--galleries" aria-labelledby="page-title">
      {/* Page Title + Intro + Primary CTA (matches wireframes header area) */}
      <header className="page-header">
        <div className="page-header__titles">
          <h1 id="page-title" className="page-title">
            Your Galleries
          </h1>
          <p className="page-subtitle">All the beautiful things you curated</p>
        </div>
        <div className="page-header__actions">
          <Link className="btn btn-primary" to="/galleries/create" aria-label="Create a gallery">
            Create a Gallery
          </Link>
        </div>
      </header>

      {/* EMPTY STATE (exact IA: headline + helper copy + centred CTA) */}
      {galleries.length === 0 && (
        <section className="galleries-empty" aria-labelledby="empty-title">
          <h2 id="empty-title" className="visually-hidden">
            No galleries yet
          </h2>
          <p className="galleries-empty__lead">
            Let’s add a little colour to this empty room. Create a gallery!
          </p>
          <div className="galleries-empty__cta">
            <Link className="btn btn-primary" to="/galleries/create">
              Create your first gallery
            </Link>
          </div>
        </section>
      )}

      {/* POPULATED STATE (strap per gallery: name, counts, preview rail, open link) */}
      {galleries.length > 0 && (
        <section className="galleries-list" aria-label="Your galleries">
          <ul className="galleries-list__items">
            {galleries.map((g) => {
              const artworks = g.artworks ?? [];
              // Apply Step 6: only render items that have a displayable image
              const previewArtworks = artworks.filter(hasDisplayImage).slice(0, 12);

              return (
                <li key={g.id} className="gallery-strap">
                  <article aria-labelledby={`g-${g.id}-title`}>
                    <header className="gallery-strap__header">
                      <h2 id={`g-${g.id}-title`} className="gallery-strap__title">
                        {g.name}
                      </h2>
                      <p className="gallery-strap__meta">
                        <span className="gallery-strap__count">
                          {artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'}
                        </span>
                        {/* Placeholder for future metrics (e.g., appreciations/ contemplations) */}
                        <span className="visually-hidden"> • metrics pending</span>
                      </p>
                    </header>

                    {/* Horizontal preview rail (structural only) */}
                    <div
                      className="gallery-strap__rail"
                      role="region"
                      aria-label={`Preview artworks in ${g.name}`}
                    >
                      <ul className="rail" aria-label="Artworks preview">
                        {previewArtworks.map((a) => {
                          const src = getDisplaySrc(a);
                          return (
                            <li key={a.id} className="rail__item">
                              {src ? (
                                <SafeImage
                                  className="rail__image"
                                  src={src}
                                  alt={`${a.title} — ${a.artist}`}
                                  width={500} // 500px intrinsic thumbnail convention
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <div
                                  className="rail__placeholder"
                                  aria-label="No image available"
                                />
                              )}
                            </li>
                          );
                        })}

                        {previewArtworks.length === 0 && (
                          <li className="rail__item rail__item--empty">
                            <div className="rail__empty">
                              <span>Let’s get this gallery started!</span>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>

                    <footer className="gallery-strap__footer">
                      <Link className="btn" to={`/gallery/${g.id}`}>
                        Open Gallery
                      </Link>
                    </footer>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
