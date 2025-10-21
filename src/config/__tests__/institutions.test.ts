// src/config/__tests__/institutions.test.ts
import { INSTITUTIONS } from '../institutions'; // named export of objects { id, name }
import type { Institution as ArtworkInstitution } from '../../types/artwork'; // 'Rijksmuseum' | 'Harvard Art Museums'

// Local type from the config module (objects with id/name), not the artwork union.
type ConfigInstitution = { id: string; name: string };

// Compile-time assertion: ensure INSTITUTIONS is an array of {id,name}.
// This uses the type alias so it is not "defined but never used", and has zero runtime effect.
(INSTITUTIONS satisfies readonly ConfigInstitution[]);

describe('institutions config', () => {
  it('exports a non-empty array of {id,name} objects', () => {
    expect(Array.isArray(INSTITUTIONS)).toBe(true);
    expect(INSTITUTIONS.length).toBeGreaterThan(0);
    for (const it of INSTITUTIONS) {
      expect(typeof it.id).toBe('string');
      expect(typeof it.name).toBe('string');
      expect(it.id.length).toBeGreaterThan(0);
      expect(it.name.length).toBeGreaterThan(0);
    }
  });

  it('uses recognised institution names (aligned with artwork Institution union)', () => {
    const allowedNames: readonly ArtworkInstitution[] = ['Rijksmuseum', 'Harvard Art Museums'];
    for (const it of INSTITUTIONS) {
      // Ensure config.name fits the union type used across the app
      const typedName: ArtworkInstitution = it.name as ArtworkInstitution;
      expect(allowedNames).toContain(typedName);
    }
  });

  it('has stable, unique ids and no duplicates', () => {
    const ids = INSTITUTIONS.map(i => i.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('maps ids to the correct display names', () => {
    const map = Object.fromEntries(INSTITUTIONS.map(i => [i.id, i.name]));
    expect(map['rijksmuseum']).toBe('Rijksmuseum');
    expect(map['harvard']).toBe('Harvard Art Museums');
  });
});
