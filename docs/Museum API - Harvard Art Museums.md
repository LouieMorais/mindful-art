![](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/mindful-art-topmastb-w.png)

# Harvard Art Museums — Integration Manual

**23/09/2025**
**Product Manager:** Louie Morais

## 1. What I get

- A mature REST API (10+ years) with endpoints for **objects**, **images**, **people**, **exhibitions**, **galleries**, etc. Data is JSON, well-documented, and stable. ([Harvard Art Museums](https://harvardartmuseums.org/collections/api?utm_source=chatgpt.com))
- Many records include high-quality image URLs and IIIF derivatives exposed via Harvard’s Digital Repository Service. Always check rights before reuse. ([iiif.harvard.edu](https://iiif.harvard.edu/collaborators/harvard-art-museums/?utm_source=chatgpt.com))

---

## 2. Registration (5 minutes)

1. Visit the official API page and request an **API key** (short web form). Keys are typically issued by email within minutes. ([Harvard Art Museums](https://harvardartmuseums.org/collections/api?utm_source=chatgpt.com))
2. Keep the key private; treat it like a password.

```
Hi Luis Morais,

Thanks for your interest in the Harvard Art Museums API. Here is your key.

------

Documentation is at https://github.com/harvardartmuseums/api-docs. Feel free to share your projects and feedback with us.

Enjoy.
```

> Reference onboarding/help material is also available in Harvard’s API Toolkit and GitHub docs. ([GitHub](https://github.com/harvardartmuseums/api-docs?utm_source=chatgpt.com))

---

## 3. Environment setup (Vite)

Create **`.env.local`** at the project root and add:

```
VITE_HARVARD_KEY=your_api_key_here
```

Restart the dev server after changing env vars.

---

## 4. Endpoint basics (I’ll mostly use `object`)

- Base URL: `https://api.harvardartmuseums.org/`

- **Search objects** (by keyword, artist name, title, etc.):

  ```
  GET /object?apikey={KEY}&q={term}&size={limit}&hasimage=1
  ```

  Common filters:
  - `q` – full-text search (works for artist names and titles).
  - `person` – filter by person name or ID (advanced).
  - `size` – page size (e.g., 25).
  - `hasimage=1` – only return records with images.

Official documentation: endpoints, parameters, field descriptions. ([Harvard Art Museums](https://harvardartmuseums.org/collections/api?utm_source=chatgpt.com))

---

## 5. Code — add Harvard to the service layer

### 5.1 Extend provider type (if I am using a union)

In `src/services/artworkService.ts` (types section):

```ts
// Add 'harvard' to the Provider union.
export type Provider = 'met' | 'cma' | 'rijks' | 'harvard';

// Ensure the Artwork model includes a human-readable providerName.
export type Artwork = {
  id: string;
  provider: Provider;
  providerName: string;
  title: string;
  artist: string | null;
  thumbUrl: string;
  fullUrl: string;
  sourceUrl: string;
  rights?: string;
};
```

### 5.2 Implement `searchHarvard()`

Paste this function into `src/services/artworkService.ts`. It:

- Requires `VITE_HARVARD_KEY`.
- Queries `/object` with `q`, `size`, and `hasimage=1`.
- Normalises the response into my `Artwork` shape.
- Picks a web-sized image URL for both the 300-px thumbnail and fullscreen (good enough for MVP; I can switch to explicit IIIF sizing later).

```ts
export async function searchHarvard(term: string, limit = 25): Promise<Artwork[]> {
  const key = import.meta.env.VITE_HARVARD_KEY;
  if (!key) return [];

  const q = (term || '').trim();
  if (!q) return [];

  const url = `https://api.harvardartmuseums.org/object?apikey=${encodeURIComponent(
    key
  )}&q=${encodeURIComponent(q)}&size=${limit}&hasimage=1`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = (await res.json()) as { records?: any[] };
  const rows = Array.isArray(data.records) ? data.records : [];

  return rows
    .filter((r) => {
      // Prefer a web-friendly image; Harvard exposes image arrays and IIIF links.
      const images = Array.isArray(r.images) ? r.images : [];
      const primary = images[0];
      return Boolean(primary?.baseimageurl || r?.primaryimageurl);
    })
    .map((r) => {
      const images = Array.isArray(r.images) ? r.images : [];
      const primary = images[0];
      const img = primary?.baseimageurl || r?.primaryimageurl || '';
      const title = String(r?.title ?? 'Untitled');

      // 'people' can be undefined or an array; take the first person’s name as the display artist.
      const artist =
        Array.isArray(r.people) && r.people[0]?.name
          ? String(r.people[0].name)
          : r?.culture
            ? String(r.culture)
            : null;

      return {
        id: `harvard:${r.objectid ?? r.id ?? crypto.randomUUID()}`,
        provider: 'harvard' as const,
        providerName: 'Harvard Art Museums',
        title,
        artist,
        thumbUrl: String(img),
        fullUrl: String(img),
        sourceUrl: String(
          r?.url || `https://harvardartmuseums.org/collections/object/${r.objectid ?? ''}`
        ),
        rights: r?.copyright || r?.creditline || undefined,
      } as Artwork;
    });
}
```

> Rights and image use: Harvard encourages personal, non-commercial use of many images, but some content is restricted by third-party rights. Check the record’s rights/credit fields and Harvard’s licensing guidance when reusing images. ([Harvard Art Museums](https://harvardartmuseums.org/licensing?utm_source=chatgpt.com))

### 5.3 Wire Harvard into the aggregator

In the same file, update the unified search to include Harvard (keeping the **all-settled** pattern so one source cannot break the page):

```ts
export async function searchArtworks(term: string, limit = 25): Promise<Artwork[]> {
  const calls = [
    searchMet(term, limit),
    searchCMA(term, limit),
    searchRijks(term, limit),
    searchHarvard(term, limit), // NEW
  ];

  const settled = await Promise.allSettled(calls);
  const out: Artwork[] = [];
  for (const s of settled) if (s.status === 'fulfilled') out.push(...s.value);
  return out;
}
```

---

## 6. Smoke tests (manual, 3 minutes)

- `term=Monet` – expect multiple results (verify artist names and images).
- `term="Vincent van Gogh"` – results with images and person names.
- `term=Rembrandt` – confirm returns alongside The Met/Rijks.
- **Empty query** – confirm Harvard is skipped (we return `[]` when `q` is empty).

---

## 7. TDD hooks (optional quick tests)

- **Record normalisation**: given a minimal Harvard object with `images[0].baseimageurl`, assert the mapped `Artwork` includes `provider: 'harvard'`, correct `id`, `title`, and image URLs.
- **No key**: with `VITE_HARVARD_KEY` unset, `searchHarvard()` returns `[]`.

---

## 8. Troubleshooting

- **HTTP 401/403**: wrong or missing `apikey` – verify `.env.local` and restart Vite.
- **No images**: ensure `hasimage=1` is present; otherwise filter out records with no `baseimageurl` or `primaryimageurl`.
- **CORS**: the public API is CORS-enabled; browser calls should work. If I later proxy through the backend, forward the `apikey` server-side.
