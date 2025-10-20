// src/services/__tests__/rijks-orchestrator.test.ts
import { searchArtworks } from '../artworkService';
import type { Artwork } from '../../types/artwork';

// Phase 2: controlled mocking (no network, no import.meta)
// We mock providers so we can assert orchestrated behaviour and exact warnings.
jest.mock('../harvard', () => ({
  searchHarvard: jest.fn(),
}));
jest.mock('../rijksmuseum', () => ({
  searchRijksmuseum: jest.fn(),
}));

import { searchHarvard } from '../harvard';
import { searchRijksmuseum } from '../rijksmuseum';

const mockedHarvard = searchHarvard as jest.MockedFunction<typeof searchHarvard>;
const mockedRijks = searchRijksmuseum as jest.MockedFunction<typeof searchRijksmuseum>;

describe('searchArtworks — Rijksmuseum behaviours (Phase 2, orchestrator-level)', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('collects the missing-key warning from Rijksmuseum and still returns items from other providers', async () => {
    // Rijksmuseum: missing key path
    mockedRijks.mockResolvedValueOnce({
      items: [],
      warning: 'Rijksmuseum API key not configured (VITE_RIJKS_API_KEY); skipping provider.',
    });

    // Harvard returns one item (shape matches Artwork)
    const harvardItems: Artwork[] = [
      {
        id: 'h1',
        title: 'Harvard Piece',
        artist: 'Unknown',
        date: '',
        imageUrl: null,
        objectUrl: null,
        institution: 'Harvard Art Museums',
        source: 'harvard',
      },
    ];
    mockedHarvard.mockResolvedValueOnce({ items: harvardItems });

    const { items, warnings } = await searchArtworks('test', 3);

    expect(items).toEqual(harvardItems);
    expect(warnings).toEqual([
      'Rijksmuseum API key not configured (VITE_RIJKS_API_KEY); skipping provider.',
    ]);
    expect(mockedRijks).toHaveBeenCalledWith('test', 3);
    expect(mockedHarvard).toHaveBeenCalledWith('test', 3);
  });

  it('includes HTTP error warnings from Rijksmuseum without failing the whole search', async () => {
    mockedRijks.mockResolvedValueOnce({
      items: [],
      warning: 'Rijksmuseum HTTP 429',
    });

    mockedHarvard.mockResolvedValueOnce({
      items: [
        {
          id: 'h2',
          title: 'Another Harvard Piece',
          artist: 'Someone',
          date: '',
          imageUrl: null,
          objectUrl: null,
          institution: 'Harvard Art Museums',
          source: 'harvard',
        },
      ],
    });

    const { items, warnings } = await searchArtworks('rate', 5);

    expect(items.map(i => i.id)).toEqual(['h2']);
    expect(warnings).toEqual(['Rijksmuseum HTTP 429']);
  });

  it('propagates schema-validation failure from Rijksmuseum as a warning', async () => {
    mockedRijks.mockResolvedValueOnce({
      items: [],
      warning: 'Rijksmuseum schema validation failed',
    });

    mockedHarvard.mockResolvedValueOnce({
      items: [
        {
          id: 'h3',
          title: 'Sorted Alpha',
          artist: 'A',
          date: '',
          imageUrl: null,
          objectUrl: null,
          institution: 'Harvard Art Museums',
          source: 'harvard',
        },
      ],
    });

    const { items, warnings } = await searchArtworks('schema', 2);

    expect(items.map(i => i.title)).toEqual(['Sorted Alpha']);
    expect(warnings).toEqual(['Rijksmuseum schema validation failed']);
  });
});
