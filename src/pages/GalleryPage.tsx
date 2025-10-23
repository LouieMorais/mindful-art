// src/pages/GalleryPage.tsx
import { useParams, Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useGalleryStore } from '../store/galleryStore';
import { getDisplaySrc, hasDisplayImage } from '../utils/getDisplaySrc';

export default function GalleryPage() {
  const { id } = useParams();
  const { getGallery } = useGalleryStore();
  const gallery = id ? getGallery(id) : undefined;

  if (!gallery) {
    return (
      <main>
        <h1>Gallery Not Found</h1>
        <p>
          <Link to="/galleries">Back to Your Galleries</Link>
        </p>
      </main>
    );
  }

  const openLocal = (e: React.MouseEvent) => {
    e.preventDefault();
    // Intentionally a no-op for now (modal deferred)

    console.debug('openLocal (stub)');
  };

  return (
    <main>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/galleries">← Your Galleries</Link>
      </nav>

      <header>
        <h1>{gallery.name}</h1>
        <p>{gallery.description}</p>
        <p>
          Created {new Date(gallery.createdAt).toLocaleDateString()} • {gallery.artworks.length}{' '}
          {gallery.artworks.length === 1 ? 'artwork' : 'artworks'}
        </p>
      </header>

      {gallery.artworks.length === 0 ? (
        <section aria-labelledby="empty-art">
          <h2 id="empty-art">No artworks yet</h2>
          <p>Use “Save to Gallery” on any search result to add artworks here.</p>
        </section>
      ) : (
        <section aria-label="Artworks">
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              listStyle: 'none',
              padding: 0,
            }}
          >
            {gallery.artworks.filter(hasDisplayImage).map((a) => {
              const src = getDisplaySrc(a);
              const providerHref: string | undefined = a.objectUrl ?? undefined;

              return (
                <li key={a.id}>
                  <article data-artworkcard-context="gallery" className="art-card__gallery">
                    {src ? (
                      <a href="#" onClick={openLocal} aria-label="Open artwork locally">
                        <SafeImage
                          src={src}
                          alt={`${a.title} — ${a.artist}`}
                          width={500} // 500 px intrinsic thumbnail convention
                          style={{ height: 'auto' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                    ) : (
                      <div
                        className="art-card__noimage"
                        role="img"
                        aria-label="No image available"
                        style={{ width: 240, height: 240 }}
                      >
                        <span className="art-card__noimage__label" aria-hidden="true">
                          No image available
                        </span>
                      </div>
                    )}

                    <h3 className="art-card__title">
                      <a href="#" onClick={openLocal}>
                        {a.title || 'Untitled'}
                      </a>
                    </h3>

                    <dl className="art-card__meta">
                      <dt className="visually-hidden">Artist</dt>
                      <dd className="art-card__artist">{a.artist || 'Unknown artist'}</dd>

                      {a.date && (
                        <>
                          <dt className="visually-hidden">Date</dt>
                          <dd className="art-card__date">{a.date}</dd>
                        </>
                      )}

                      {providerHref && (
                        <>
                          <dt className="visually-hidden">Institution</dt>
                          <dd className="art-card__institution">
                            <a href={providerHref} target="_blank" rel="noreferrer">
                              Courtesy of {a.institution || 'the provider'}
                            </a>
                          </dd>
                        </>
                      )}
                    </dl>
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
