# What is Europeana and what does it offer?

Europeana is the EU-wide aggregator for cultural heritage metadata from thousands of museums, libraries and archives. It exposes this data via several public APIs for search, record retrieval, thumbnails, IIIF, entities (artists/places/concepts), bulk harvesting (OAI-PMH), and a public SPARQL endpoint. You request a free key and can then query millions of records, including links to images on the holding institutions’ sites and, where available, IIIF manifests and cached thumbnails. ([apis.europeana.eu](https://apis.europeana.eu/?utm_source=chatgpt.com))

---

# API surface you’ll actually use

## 1) Search API (primary entry point)

Purpose: full-text and faceted search across Europeana’s corpus; returns lightweight records with fields you can list in results (title, data provider, preview URL, rights, etc.). Also supports OpenSearch RSS if needed. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812/Search%2BAPI%2BDocumentation?utm_source=chatgpt.com))

Typical flow:

1. Query Search API with text and filters (e.g., media type, country, reusability, has thumbnail).
2. Render a results grid using `edmPreview` (Europeana’s cached thumbnail) and metadata fields.
3. For an item the user clicks, fetch the full record via the Record API (below).

Key points:

- Requires an API key (prefer sending it via `X-Api-Key` header; `wskey` query param still works but is slated for deprecation). ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2462351393))
- Supports faceting (e.g., by provider, country, data set) and filters such as `has_thumbnail` and reusability. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812/Search%2BAPI%2BDocumentation?utm_source=chatgpt.com))

## 2) Record API (details for a single item)

Purpose: retrieve the complete EDM-modeled metadata for a single record, including links to provider media (`edm:isShownBy`), additional views, IIIF, rights statements, etc. Use it to populate your item detail page. ([apis.europeana.eu](https://apis.europeana.eu/))

## 3) Thumbnail API (no key required)

Purpose: serve Europeana’s cached thumbnails in fixed widths (200 or 400 px)—very handy for fast search-result grids and masonry layouts. v3 format:
`https://api.europeana.eu/thumbnail/v3/{SIZE}/{MEDIA_HASH}.jpg`
You can discover whether a thumbnail exists via `has_thumbnail=true` or the `edmPreview` field. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2480209953?utm_source=chatgpt.com))

## 4) IIIF APIs (image zooming & interoperable viewers)

Purpose: many items expose IIIF Presentation Manifests or IIIF Image endpoints; you can hand the manifest URL to a ready-made IIIF viewer (e.g., Universal Viewer or Mirador) to give deep zoom, tiling, and annotations. ([Europeana PRO](https://pro.europeana.eu/page/europeana-and-iiif?utm_source=chatgpt.com))

## 5) Entity API (artists, places, timespans, concepts)

Purpose: resolve or suggest controlled entities (e.g., “Rembrandt”) and link to related items via stable URIs (aligned to AAT, VIAF, ULAN, Geonames, etc.). Great for building filters, autocomplete, and “More like this by the same artist/place” features. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2324561923?utm_source=chatgpt.com))

## 6) Bulk access (OAI-PMH) & Linked Data (SPARQL)

- **OAI-PMH**: harvest whole datasets in bulk; recommended for large corpus work to stay within fair-use limits. Endpoint and docs available. ([oai.europeana.eu](https://oai.europeana.eu/?utm_source=chatgpt.com))
- **SPARQL**: query Europeana’s linked open data graph at `https://sparql.europeana.eu/` for advanced research use-cases. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385870903?utm_source=chatgpt.com))

---

# Authentication & keys

- Register for an account, then request an API key (public key; you may also get a private/secret for special flows). ([Europeana PRO](https://pro.europeana.eu/page/get-api?utm_source=chatgpt.com))
- Prefer `X-Api-Key: YOUR_KEY` header; `?wskey=YOUR_KEY` works but is planned for deprecation. Europeana also runs an OIDC-based token service for selected write/privileged APIs. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2462351393))

---

# Rights & reuse: what you can display

- Each item carries a machine-readable rights statement in `edm:rights` (Creative Commons, Public Domain tools, or RightsStatements.org). You **must** respect this for previews, full images, and downstream reuse. ([Europeana PRO](https://pro.europeana.eu/page/available-rights-statements?utm_source=chatgpt.com))
- Europeana’s **Terms of Use** explain how rights statements indicate permitted access & reuse, including previews. For an app that shows images, filter to “open” reuse statuses where appropriate. ([Europeana](https://www.europeana.eu/en/rights/terms-of-use?utm_source=chatgpt.com))
- Europeana recommends using “reusability”-oriented filters when you plan to let users download/reuse content (e.g., open licences like CC BY/CC BY-SA, or PD/CC0). Their content-tier and openness guidance is helpful background. ([Europeana PRO](https://pro.europeana.eu/page/open-and-reusable-digital-cultural-heritage?utm_source=chatgpt.com))

---

# Fair use, rate limits & performance

- Europeana applies a **fair-use policy**: keep concurrency reasonable, back off on errors, and use bulk channels (OAI-PMH/FTP) for very large pulls; otherwise your key can be throttled or blocked. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2704146433/Fair%2Buse%2Bpolicy%2Bguidelines))
- Use pagination, caching (HTTP + your own), and CDN-backed thumbnails (via the Thumbnail API) for fast UX. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2480209953?utm_source=chatgpt.com))

---

# Practical integration plan

## A. Quick start search → detail flow

1. **Search request** (pseudo-HTTP):
   - Endpoint: _Search API_ (see doc hub)
   - Headers: `X-Api-Key: YOUR_KEY`
   - Typical query params (examples):
     - `query=impressionism`
     - `qf=TYPE:IMAGE` (media type)
     - `qf=has_thumbnail:true` (ensure fast imagery)
     - `qf=REUSABILITY:open` (only open-licence images for safe reuse)
     - `rows=24&start=1` (pagination)
       The Search API documentation describes supported parameters, faceting and examples; Europeana also notes an OpenSearch RSS alternative. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812/Search%2BAPI%2BDocumentation?utm_source=chatgpt.com))
2. **Render results**
   - Use `edmPreview` from each hit (or the Thumbnail API) to display a 200/400px thumbnail quickly; display title, provider, country and rights label. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2480209953?utm_source=chatgpt.com))
3. **Record details**
   - On item click, call _Record API_ for the full EDM record; if a IIIF **manifest** link is present, pass it to a IIIF viewer for deep zoom. ([apis.europeana.eu](https://apis.europeana.eu/))
4. **Attribution & rights**
   - Always show the data provider and the rights statement badge/link. Use rights filters up front to avoid surfacing non-reusable images in contexts where you promote download/reuse. ([Europeana](https://www.europeana.eu/en/rights/terms-of-use?utm_source=chatgpt.com))

## B. Filters you’ll likely want (Search API)

- **Media type** (images only for an art app).
- **Has thumbnail** (fast results grid).
- **Country / data provider** (e.g., “Rijksmuseum”).
- **Time period** (via facets or query).
- **Reusability** (open / restricted / permission) for licensing safety.
- **Dataset name** (`edm_datasetName`) – useful if you later bulk-harvest that dataset via OAI-PMH. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812/Search%2BAPI%2BDocumentation?utm_source=chatgpt.com))

## C. Example requests (illustrative)

**Fetch search results (cURL-style)**

```
GET https://api.europeana.eu/record/search
Headers:
  X-Api-Key: YOUR_KEY
Query params (examples):
  query=vermeer
  rows=24
  start=1
  qf=TYPE:IMAGE
  qf=has_thumbnail:true
  qf=REUSABILITY:open
```

(Use the Search API doc and examples for the exact request shape and supported parameters.) ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812/Search%2BAPI%2BDocumentation?utm_source=chatgpt.com))

**Get a record (detail page)**

```
GET https://api.europeana.eu/record/<RECORD_ID>
Headers:
  X-Api-Key: YOUR_KEY
```

The response includes full EDM fields such as `edm:isShownBy`, `edm:hasView`, `edm:rights`, and often IIIF references suitable for a viewer. ([apis.europeana.eu](https://apis.europeana.eu/))

**Serve a cached thumbnail (no auth needed)**

```
https://api.europeana.eu/thumbnail/v3/400/<MEDIA_HASH>.jpg
```

(You can derive the hash from the Search/Record API `edmPreview` or underlying media URL via the Thumbnail API docs.) ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2480209953?utm_source=chatgpt.com))

**Display via IIIF viewer**

- If the Record contains an IIIF **manifest** URL, pass it to Mirador/Universal Viewer to get pan/zoom/tiling out of the box. ([Europeana PRO](https://pro.europeana.eu/page/europeana-and-iiif?utm_source=chatgpt.com))

## D. UI/UX patterns that work well

- **Search results**: grid of thumbnails (400px), title, artist, date, provider, and a rights badge.
- **Left-hand facets**: media type, time, country, provider, reusability.
- **Detail page**: IIIF viewer (if available) + metadata tabs (description, provenance, rights, related entities).
- **Related content**: call the _Entity API_ for the artist/place to fetch “more by/related to…”. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2324561923?utm_source=chatgpt.com))

## E. Handling scale & quotas

- Respect concurrency and backoff; if you need tens of thousands of records, **identify relevant datasets** via Search API facet `edm_datasetName` then harvest the **complete dataset** via **OAI-PMH** or download from their FTP, per Europeana’s own recommendation. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2704146433/Fair%2Buse%2Bpolicy%2Bguidelines))

---

# Data model orientation (EDM)

Europeana uses the **Europeana Data Model (EDM)** (RDF-based) to represent items, web resources, aggregations and contextual entities. You’ll see EDM class/property names in the Record API (e.g., `edm:isShownBy`, `edm:WebResource`, `ore:Aggregation`, `dc:title`). For most app work you don’t need to master EDM to list records—but it helps when you want richer relationships or SPARQL. ([Europeana PRO](https://pro.europeana.eu/page/edm-documentation?utm_source=chatgpt.com))

---

# Compliance & licensing checklist (strongly recommended)

1. **Always display**: data provider/institution and the **rights statement** (link to the statement URI). ([Europeana](https://www.europeana.eu/en/rights/terms-of-use?utm_source=chatgpt.com))
2. **Filter by reusability** when you allow download or remix, to avoid surfacing non-reusable works for that feature. ([Europeana PRO](https://pro.europeana.eu/page/open-and-reusable-digital-cultural-heritage?utm_source=chatgpt.com))
3. **Use Europeana thumbnails** for listing; link out to the provider page for the full asset unless the rights permit inline full-size display. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2480209953?utm_source=chatgpt.com))
4. **Fair use**: avoid high concurrency; use OAI-PMH for bulk pulls. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2704146433/Fair%2Buse%2Bpolicy%2Bguidelines))

---

# Handy extras

- **For Developers** page and the public demo on apis.europeana.eu help you see real requests. ([Europeana](https://www.europeana.eu/en/for-developers?utm_source=chatgpt.com))
- **IIIF**: Europeana’s IIIF pages and the IIIF community docs will help you wire a modern zoomable viewer quickly. ([Europeana PRO](https://pro.europeana.eu/page/europeana-and-iiif?utm_source=chatgpt.com))
- **Python**: a community library (“PyEuropeana”) provides a Python wrapper if you prefer not to write raw HTTP calls. ([PyEuropeana Documentation](https://rd-europeana-python-api.readthedocs.io/?utm_source=chatgpt.com))

---

# Summary

- **Yes—Europeana** is the European aggregator you heard of.
- Use the **Search API** for finding items, **Record API** for full metadata, **Thumbnail API** for fast images, **IIIF** for deep zoom, **Entity API** for artist/place concepts, and **OAI-PMH/SPARQL** for bulk/LOD use-cases.
- **Authenticate** with an API key (prefer `X-Api-Key` header).
- **Filter by reusability** and **show rights/institution attribution**; respect the **fair-use policy**.
- For performance and quota, cache aggressively and employ **thumbnails** and **bulk harvesting** when needed.

---

# Sources

- Europeana APIs landing & overview. ([apis.europeana.eu](https://apis.europeana.eu/))
- Search API documentation (overview & OpenSearch option). ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385739812/Search%2BAPI%2BDocumentation?utm_source=chatgpt.com))
- Record API documentation hub. ([apis.europeana.eu](https://apis.europeana.eu/))
- Accessing the APIs (key, headers, deprecation of `wskey`, OIDC). ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2462351393))
- Thumbnail API (v2/v3, sizes, discovery). ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2480209953?utm_source=chatgpt.com))
- IIIF usage with Europeana. ([Europeana PRO](https://pro.europeana.eu/page/europeana-and-iiif?utm_source=chatgpt.com))
- Rights statements and terms of use. ([Europeana PRO](https://pro.europeana.eu/page/available-rights-statements?utm_source=chatgpt.com))
- Fair-use policy & bulk alternatives (OAI-PMH/FTP). ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2704146433/Fair%2Buse%2Bpolicy%2Bguidelines))
- SPARQL endpoint location & guide. ([europeana.atlassian.net](https://europeana.atlassian.net/wiki/spaces/EF/pages/2385870903?utm_source=chatgpt.com))
