// src/store/galleryStore.ts
import { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Artwork } from '../types/artwork';

// Artwork type reused from Sprint 1
export interface Gallery {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  artworks: Artwork[];
}

const STORAGE_KEY = 'mindfulart:galleries';

function safeParse(json: string | null): Gallery[] | null {
  if (!json) return null;
  try {
    const data = JSON.parse(json) as Gallery[];
    if (!Array.isArray(data)) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Loads galleries from localStorage.
 * If none exist (or array is empty), a default gallery is created automatically.
 */
function initialGalleries(): Gallery[] {
  const existing = safeParse(localStorage.getItem(STORAGE_KEY));
  if (existing && existing.length > 0) return existing;

  // Default gallery fallback
  const defaultGallery: Gallery = {
    id: uuidv4(),
    name: 'My First Gallery',
    description: 'Start curating by saving artworks from Search.',
    createdAt: new Date().toISOString(),
    artworks: [],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultGallery]));
  return [defaultGallery];
}

function persist(galleries: Gallery[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(galleries));
}

export function useGalleryStore() {
  const [galleries, setGalleries] = useState<Gallery[]>(initialGalleries);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) persist(galleries);
    else mounted.current = true;
  }, [galleries]);

  const api = useMemo(() => {
    function createGallery(name: string, description: string): Gallery {
      const g: Gallery = {
        id: uuidv4(),
        name: name.trim(),
        description: description.trim(),
        createdAt: new Date().toISOString(),
        artworks: [],
      };
      setGalleries((prev) => [...prev, g]);
      return g;
    }

    function addArtworkToGallery(galleryId: string, art: Artwork) {
      setGalleries((prev) =>
        prev.map((g) => {
          if (g.id !== galleryId) return g;
          const exists = g.artworks.some((a) => a.id === art.id);
          return exists ? g : { ...g, artworks: [...g.artworks, art] };
        })
      );
    }

    function addArtworkToGalleries(galleryIds: string[], art: Artwork) {
      setGalleries((prev) =>
        prev.map((g) => {
          if (!galleryIds.includes(g.id)) return g;
          const exists = g.artworks.some((a) => a.id === art.id);
          return exists ? g : { ...g, artworks: [...g.artworks, art] };
        })
      );
    }

    function getGallery(id: string): Gallery | undefined {
      return galleries.find((g) => g.id === id);
    }

    return { createGallery, addArtworkToGallery, addArtworkToGalleries, getGallery };
  }, [galleries]);

  return { galleries, ...api };
}
