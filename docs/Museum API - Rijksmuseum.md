![](https://github.com/LouieMorais/mindful-art/blob/main/docs/wireframes/r01/mindful-art-topmastb-w.png)

# Rijksmuseum — Integration Manual

**23/09/2025**
**Product Manager:** Louie Morais

## 1. What I get

- Search the Rijksmuseum collection by **artist**, **title**, or **general keywords**.
- Stable JSON with object IDs, titles, makers, and **web-ready images**.
- Clear rights metadata per object (many are public domain).

**Docs & onboarding:** Rijksmuseum requires an **API key** available via a **Rijksstudio** account. Their current documentation describes multiple data services (Search API, OAI-PMH, LDES). The API key is obtained from the Rijksstudio account’s **Advanced settings** and must be included with each request. ([data.rijksmuseum.nl](https://data.rijksmuseum.nl/docs/?utm_source=chatgpt.com))

---

## 2. Registration (5 minutes)

1. Create / sign in to a **Rijksstudio** account (Rijksmuseum website).
2. Go to the account **Advanced settings** and request an **API key**. The key is issued instantly and shown there. ([data.rijksmuseum.nl](https://data.rijksmuseum.nl/docs/api/?utm_source=chatgpt.com))

```
Dear Mindful Art

You have access to the Rijksmuseum API using the following credentials

Key: ------

You can read how to use the Rijksmuseum API in
this manual.

Kind regards,
Rijksmuseum
```

> Keep the key private and never commit it to Git.

---

## 3. Environment setup (Vite)

Create (or update) **`.env.local`** at the project root:

```
VITE_RIJKS_KEY=your_api_key_here
```

Restart `npm run dev` after adding/altering env vars.

---

## 4. Endpoint basics

- **Search** (English interface):
  `GET https://www.rijksmuseum.nl/api/en/collection?key={API_KEY}&q={term}&imgonly=true&ps={pageSize}`
  Useful query params:
  - `q=` general keyword search.
  - `involvedMaker=` exact maker filtering (e.g., `Rembrandt`).
  - `ps=` page size (e.g., 25).
- Each result (art object) includes `title`, `principalOrFirstMaker`, `webImage.url` (IIIF-backed), and `links.web` (record page). ([data.rijksmuseum.nl](https://data.rijksmuseum.nl/docs/?utm_source=chatgpt.com))

---

## 5. Code: add Rijksmuseum to service layer

**File:** `src/services/artworkService.ts`

1. **Extend** provider union and `Artwork` (if I want typed provider names):

```ts
// add to existing types
export type Provider = 'met' | 'cma' | 'rijks';

export type Artwork = {
  id: string;
  provider: Provider;
  providerName: string; // human-readable label
  title: string;
  artist: string | null;
  thumbUrl: string;
  fullUrl: string;
  sourceUrl: string;
  rights?: string;
};
```

1. **Add** a Rijksmuseum search function. It:

- Uses `q=` for general search (works for titles and names).
- Optionally, if I detect a single-word or person-like term, I can also try `involvedMaker` for tighter matches (kept simple here for reliability).
- Normalises into `Artwork` shape.

```ts
export async function searchRijks(term: string, limit = 25): Promise<Artwork[]> {
  const key = import.meta.env.VITE_RIJKS_KEY;
  if (!key) return [];

  const q = (term || '').trim();
  if (!q) return [];

  // ps = page size; imgonly=true ensures images are available
  const url = `https://www.rijksmuseum.nl/api/en/collection?key=${encodeURIComponent(
    key
  )}&q=${encodeURIComponent(q)}&imgonly=true&ps=${limit}`;

  const res = await fetch(url);
  if (!res.ok) return [];
  const data = (await res.json()) as { artObjects?: any[] };

  const rows = Array.isArray(data.artObjects) ? data.artObjects : [];
  return rows
    .filter((o) => o?.webImage?.url)
    .map((o) => ({
      id: `rijks:${o.objectNumber}`,
      provider: 'rijks' as const,
      providerName: 'Rijksmuseum, Amsterdam',
      title: String(o?.title ?? 'Untitled'),
      artist: o?.principalOrFirstMaker ? String(o.principalOrFirstMaker) : null,
      thumbUrl: String(o.webImage.url),
      fullUrl: String(o.webImage.url), // good enough for demo; I can switch to IIIF variants later
      sourceUrl: String(
        o?.links?.web ?? `https://www.rijksmuseum.nl/en/collection/${o?.objectNumber}`
      ),
      rights: o?.copyright ? String(o.copyright) : undefined,
    }));
}
```

1. **Wire** Rijksmuseum into aggregator:

```ts
export async function searchArtworks(term: string, limit = 25): Promise<Artwork[]> {
  const calls = [
    // existing providers
    searchMet(term, limit),
    searchCMA(term, limit),

    // new provider
    searchRijks(term, limit),
  ];

  const settled = await Promise.allSettled(calls);
  const out: Artwork[] = [];
  for (const s of settled) if (s.status === 'fulfilled') out.push(...s.value);
  return out;
}
```

---

## 6. Usage notes and pitfalls

- **Tighten artist results:** For a person-name query (e.g., “Rembrandt”), if I want tighter results, try a **second pass** with `involvedMaker={term}` when the first `q=` call returns empty or noisy sets. The Search API supports both. ([data.rijksmuseum.nl](https://data.rijksmuseum.nl/docs/?utm_source=chatgpt.com))
- **Rights:** Many works are public domain; check `copyright`/rights fields before assuming re-use.
- **Thumbnails vs full:** `webImage.url` is suitable for both the 300-px thumb (via CSS) and fullscreen in MVP; later, I can adopt IIIF size parameters.

---

## 7. Smoke tests (manual)

1. `term=Rembrandt` → expect multiple results with images and maker “Rembrandt”.
2. `term=Night Watch` → expect the famous work among results.
3. `term=van gogh` → returns images; verify captions and links.
4. Test a blank term → page should handle gracefully (no Rijks call, thanks to the `if (!q) return [];` guard).

---

## 8. TDD hooks (optional)

Add a couple of **unit tests** (using existing Jest/RTL stack):

- **Normalisation**: Given a minimal Rijks `artObject`, assert `provider`, `providerName`, `id`, `title`, `artist`, and image URLs.
- **Empty q**: `searchRijks('')` resolves to `[]`.
- **No images**: entries without `webImage.url` are filtered out.

---

## 9. Rollback plan

If keys are missing or the API is rate-limited, the aggregator still returns results from the other providers due to `Promise.allSettled`, and the safe Results page will render without crashing.
