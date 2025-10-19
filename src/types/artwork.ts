// src/types/artwork.ts

export type Institution = 'Rijksmuseum' | 'Harvard Art Museums';
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  date?: string; // free-text date (e.g., "c. 1650")
  year?: string | number; // numeric or string year (if available)
  imageUrl: string | null;
  thumbnailUrl?: string;
  objectUrl: string | null;
  institution: Institution;
  source: 'rijksmuseum' | 'harvard';
}
