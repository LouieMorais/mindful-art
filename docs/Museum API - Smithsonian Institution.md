![](https://i.ibb.co/PskKYv93/mindful-art-topmastb-w.png)

# Smithsonian Institution — Integration Manual - It doesn't work!

**25/09/2025**
**Product Manager:** Louie Morais

## 1. What you get

- Access to the **Smithsonian Open Access API**, exposing **over 3 million records** across art, history, culture, and science.
- Each object can include: title, creators, media (often multiple images), and rights information.
- Supports **full-text search** and **fielded queries** (Solr syntax).
- JSON responses, CORS enabled, suitable for frontend apps.
- Official reference: [Smithsonian Open Access API (Postman docs)](https://www.postman.com/opamcurators/open-access-museums/documentation/aq6kzfx/smithsonian-institution-open-access-api).

---

## 2. Registration

1. Go to [api.data.gov/signup](https://api.data.gov/signup/).
2. Fill in the signup form.
3. You’ll receive a free **API key** by email, usable across APIs hosted on api.data.gov.
4. Keep the key private; do not commit to Git.

```
Hi,

You are receiving this email to confirm the creation of an API key. If you did not request this, please disregard this email. Your API key for louie.laicos@gmail.com is:

----

You can start using this key to make web service requests by referring to the relevant agency's API documentation. This API key is for your use and should not be shared.
```

---

## 3. Environment setup

In your Vite project, create or update **`.env.local`**:

```
VITE_SMITHSONIAN_KEY=your_api_key_here
```

Restart `npm run dev` after editing env vars.

---

## 4. Endpoint basics

- **Search**:

  ```
  GET https://api.si.edu/openaccess/api/v1.0/search?q={query}&rows={limit}&api_key={KEY}
  ```

  Example with filter for images only:

  ```
  q=Claude Monet AND online_media_type:"Images"
  ```

- **Content details**:

  ```
  GET https://api.si.edu/openaccess/api/v1.0/content/{id}?api_key={KEY}
  ```

  Expands a record into full descriptive metadata and media URLs.

---

## 5. Code — add Smithsonian to service layer

### 5.1. Extend provider union

```ts
export type Provider = 'met' | 'cma' | 'rijks' | 'harvard' | 'smithsonian';
```

### 5.2. Implement `searchSmithsonian()`

```ts
/**
 * Smithsonian Open Access API integration.
 *
 * Flow:
 *  1. Perform a search with Solr query syntax, filtered to include only image-bearing records.
 *  2. Extract IDs from the search results.
 *  3. For each ID, fetch detailed content to get title, creators, and images.
 *  4. Map results into the common Artwork type.
 *
 * Notes:
 *  - Requires api.data.gov key passed as ?api_key=...
 *  - Slower than Met/CMA because each hit requires a second fetch.
 *  - Keep `limit` small (≤10) for demo reliability.
 */
export async function searchSmithsonian(term: string, limit = 10): Promise<Artwork[]> {
  const key = import.meta.env.VITE_SMITHSONIAN_KEY;
  if (!key) return [];

  const q = (term || '').trim();
  if (!q) return [];

  // Step 1: Search Smithsonian with filter for image media
  const searchUrl = `https://api.si.edu/openaccess/api/v1.0/search?q=${encodeURIComponent(
    `${q} AND online_media_type:"Images"`,
  )}&rows=${limit}&api_key=${encodeURIComponent(key)}`;

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) return [];
  const searchData = (await searchRes.json()) as { response?: { docs?: any[] } };
  const docs = searchData?.response?.docs ?? [];

  // Step 2: For each ID, fetch full content record
  const detailCalls = docs.map(async (doc: any) => {
    const id = doc.id;
    if (!id) return null;
    try {
      const contentUrl = `https://api.si.edu/openaccess/api/v1.0/content/${encodeURIComponent(
        id,
      )}?api_key=${encodeURIComponent(key)}`;
      const contentRes = await fetch(contentUrl);
      if (!contentRes.ok) return null;
      const contentData = await contentRes.json();

      const descriptive = contentData?.content?.descriptiveNonRepeating || {};
      const freetext = contentData?.content?.freetext || {};

      const mediaArr = descriptive?.online_media?.media || [];
      const firstMedia = Array.isArray(mediaArr) ? mediaArr[0] : null;
      const img = firstMedia?.content || '';
      if (!img) return null;

      let artist: string | null = null;
      if (Array.isArray(freetext.name) && freetext.name[0]?.content) {
        artist = String(freetext.name[0].content);
      } else if (Array.isArray(freetext.creator) && freetext.creator[0]?.content) {
        artist = String(freetext.creator[0].content);
      }

      const title = descriptive?.title?.content || 'Untitled';

      return {
        id: `smithsonian:${id}`,
        provider: 'smithsonian' as const,
        providerName: 'Smithsonian Institution',
        title,
        artist,
        thumbUrl: img,
        fullUrl: img,
        sourceUrl: descriptive?.record_link || '',
        rights: descriptive?.rights_information || undefined,
      } as Artwork;
    } catch {
      return null;
    }
  });

  const records = await Promise.all(detailCalls);
  return records.filter((r): r is Artwork => !!r);
}
```

### 5.3. Wire into aggregator

```ts
export async function searchArtworks(term: string, limit = 25): Promise<Artwork[]> {
  const calls = [
    searchMet(term, limit),
    searchCMA(term, limit),
    searchRijks(term, limit),
    searchHarvard(term, limit),
    searchSmithsonian(term, 10), // smaller limit for Smithsonian
  ];
  const settled = await Promise.allSettled(calls);
  const out: Artwork[] = [];
  for (const s of settled) if (s.status === 'fulfilled') out.push(...s.value);
  return out;
}
```

---

## 6. Smoke tests

- Try in browser (with your API key):

  ```
  https://api.si.edu/openaccess/api/v1.0/search?q=Claude%20Monet%20AND%20online_media_type:"Images"&rows=5&api_key=YOUR_KEY
  ```

  → Expect JSON with Monet records.

- In app: search “Claude Monet” and verify Smithsonian images appear in results.

- Test “van gogh”, “Rembrandt”. Note: results vary; Smithsonian’s art coverage is broad but not always dense for individual artists.

---

## 7. TDD hooks

- Mock a content record with `online_media.media[0].content`, test that `searchSmithsonian()` maps it correctly to `Artwork`.
- Test empty query returns `[]`.
- Test missing/invalid API key returns `[]` safely.

---

## 8. Pitfalls

- **Slower response**: Because each record needs an extra `/content` fetch. Limit the number of rows.
- **Not only fine art**: Smithsonian spans many domains, so queries can yield photos, documents, objects. You may need post-filters later if you only want paintings.
- **Rights**: Always check `rights_information` field before reuse.
