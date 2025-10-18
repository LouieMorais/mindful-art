// src/types/artwork.ts

export type Institution = 'Rijksmuseum' | 'Harvard Art Museums';

export interface Artwork {
  id: string; // provider-stable id (string)
  title: string; // safe text
  artist: string; // safe text
  date: string; // safe text
  imageUrl: string | null; // absolute URL or null
  objectUrl: string | null; // link to the object page on provider site
  institution: Institution; // grouping key
  source: 'rijksmuseum' | 'harvard';
}
