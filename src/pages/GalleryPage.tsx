// src/pages/GalleryPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useGalleryStore } from '../store/galleryStore';

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
            {gallery.artworks.map((a) => (
              <li key={a.id}>
                {a.imageUrl ? (
                  <img
                    src={a.imageUrl}
                    alt={`${a.title} — ${a.artist}`}
                    width={240}
                    height="auto"
                  />
                ) : (
                  <div style={{ width: 240, height: 240 }} aria-label="No image available" />
                )}
                <p>
                  <strong>{a.title}</strong>
                  <br />
                  {a.artist}
                  {a.date ? ` — ${a.date}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
