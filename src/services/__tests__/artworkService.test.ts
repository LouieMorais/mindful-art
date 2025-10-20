// src/services/__tests__/artworkService.test.ts
import { searchArtworks } from '../artworkService';
import type { Artwork } from '../../types/artwork';

// Phase 2: controlled mocking of providers (no env, no network).
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

describe('searchArtworks (Phase 2: provider contracts via controlled mocks)', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('flattens items and collects provider warnings (Harvard missing key)', async () => {
    // Exact warning from the codebase:
    // 'Harvard API key not configured (VITE_HARVARD_API_KEY); skipping provider.'
    mockedHarvard.mockResolvedValueOnce({
      items: [],
      warning: 'Harvard API key not configured (VITE_HARVARD_API_KEY); skipping provider.',
    });

    const rijksItems: Artwork[] = [
      {
        id: 'r1',
        title: 'A Title',
        artist: 'Someone',
        date: '',
        imageUrl: null,
        objectUrl: null,
        institution: 'Rijksmuseum',
        source: 'rijksmuseum',
      },
    ];
    mockedRijks.mockResolvedValueOnce({ items: rijksItems });

    const { items, warnings } = await searchArtworks('Rembrandt', 5);

    // Items are concatenated and sorted by title inside the orchestrator.
    expect(items).toEqual(rijksItems);

    // Warning from Harvard is preserved and surfaced.
    expect(warnings).toEqual([
      'Harvard API key not configured (VITE_HARVARD_API_KEY); skipping provider.',
    ]);

    // Providers were called once with our query/limit.
    expect(mockedRijks).toHaveBeenCalledWith('Rembrandt', 5);
    expect(mockedHarvard).toHaveBeenCalledWith('Rembrandt', 5);
  });

  it('includes HTTP error warnings from providers without failing the whole search', async () => {
    mockedHarvard.mockResolvedValueOnce({ items: [], warning: 'Harvard HTTP 500' });
    mockedRijks.mockResolvedValueOnce({
      items: [
        {
          id: 'r2',
          title: 'B Title',
          artist: 'Another',
          date: '',
          imageUrl: null,
          objectUrl: null,
          institution: 'Rijksmuseum',
          source: 'rijksmuseum',
        },
      ],
    });

    const { items, warnings } = await searchArtworks('Monet', 3);

    expect(items.map(i => i.id)).toEqual(['r2']);
    expect(warnings).toEqual(['Harvard HTTP 500']);
  });

  it('concatenates items from both providers and sorts by title ASC', async () => {
    mockedHarvard.mockResolvedValueOnce({
      items: [
        {
          id: 'h1',
          title: 'Zeta',
          artist: 'H Artist',
          date: '',
          imageUrl: null,
          objectUrl: null,
          institution: 'Harvard Art Museums',
          source: 'harvard',
        },
      ],
    });
    mockedRijks.mockResolvedValueOnce({
      items: [
        {
          id: 'r3',
          title: 'Alpha',
          artist: 'R Artist',
          date: '',
          imageUrl: null,
          objectUrl: null,
          institution: 'Rijksmuseum',
          source: 'rijksmuseum',
        },
      ],
    });

    const { items, warnings } = await searchArtworks('anything', 2);

    // Sorted by title asc: Alpha, Zeta
    expect(items.map(i => i.title)).toEqual(['Alpha', 'Zeta']);
    expect(warnings).toEqual([]); // no warnings returned in this case
  });
});
