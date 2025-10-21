// src/hooks/__tests__/useSearch.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useSearch } from '../useSearch';
import type { Artwork, Institution } from '../../types/artwork';

// Phase 2: controlled mocking (no network, no MSW).
// Mock the orchestrator that talks to providers.
jest.mock('../../services/artworkService', () => ({
  searchArtworks: jest.fn(),
}));

// Import the real (now mocked) module to type its function.
import * as artworkService from '../../services/artworkService';
const mockedSearchArtworks = artworkService.searchArtworks as jest.MockedFunction<
  typeof artworkService.searchArtworks
>;

describe('useSearch (Phase 2: controlled mocking)', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns early on empty query (clears results/warnings, no error)', async () => {
    const { result } = renderHook(() => useSearch(''));

    await act(async () => {
      await result.current.runSearch('');
    });

    expect(mockedSearchArtworks).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.results).toEqual<Artwork[]>([]);
    expect(result.current.warnings).toEqual<string[]>([]);
  });

  it('sets results and warnings on success and clears error', async () => {
    // Use your real types so TS doesn’t widen to string
    const rijks: Institution = 'Rijksmuseum';
    const harvard: Institution = 'Harvard Art Museums';

    const fakeItems: Artwork[] = [
      {
        id: 'harvard:1',
        title: 'Alpha',
        artist: 'Unknown',
        date: '',
        imageUrl: 'https://x/1.jpg',
        objectUrl: 'https://museum.example/harvard/1',
        institution: harvard,
        source: 'harvard',
      },
      {
        id: 'rijks:2',
        title: 'Beta',
        artist: 'Rembrandt',
        date: '',
        imageUrl: 'https://x/2.jpg',
        objectUrl: 'https://museum.example/rijks/2',
        institution: rijks,
        source: 'rijksmuseum',
      },
    ];
    const fakeWarnings: string[] = [
      'Harvard API key not configured (VITE_HARVARD_API_KEY); skipping provider.',
    ];

    mockedSearchArtworks.mockResolvedValueOnce({
      items: fakeItems,
      warnings: fakeWarnings,
    });

    const { result } = renderHook(() => useSearch(''));

    await act(async () => {
      await result.current.runSearch('Rembrandt');
    });

    expect(result.current.isLoading).toBe(false);
    expect(mockedSearchArtworks).toHaveBeenCalledWith('Rembrandt');
    expect(result.current.error).toBeNull();
    expect(result.current.results).toEqual(fakeItems);
    expect(result.current.warnings).toEqual(fakeWarnings);
  });

  it('sets a generic user-facing error on failure and leaves warnings empty', async () => {
    mockedSearchArtworks.mockRejectedValueOnce(new Error('Network exploded'));

    const { result } = renderHook(() => useSearch(''));

    await act(async () => {
      await result.current.runSearch('Monet');
    });

    expect(result.current.isLoading).toBe(false);
    // Generic error message per your hook contract.
    expect(result.current.error).toBe('Something went wrong while searching. Please try again.');
    expect(result.current.results).toEqual<Artwork[]>([]);
    expect(result.current.warnings).toEqual<string[]>([]);
  });
});
