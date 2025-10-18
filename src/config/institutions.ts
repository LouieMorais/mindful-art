// src/config/institutions.ts
// Static list of active art sources for Mindful Art MVP.
export interface Institution {
  id: string;
  name: string;
}

export const INSTITUTIONS: Institution[] = [
  { id: 'rijksmuseum', name: 'Rijksmuseum' },
  { id: 'harvard', name: 'Harvard Art Museums' },
];
