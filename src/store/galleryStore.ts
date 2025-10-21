// src/store/galleryStore.ts
import { useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { logError, AppError } from '../utils/errorLogger';
import type { Artwork } from '../types/artwork';

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
    const data: unknown = JSON.parse(json);

    if (!Array.isArray(data)) {
      throw new AppError('Invalid gallery data format', 'STORAGE_ERROR', {
        component: 'galleryStore',
        action: 'safeParse',
      });
    }

    return data as Gallery[];
  } catch (error) {
    logError(error, { component: 'galleryStore', action: 'safeParse' });
    return null;
  }
}

function initialGalleries(): Gallery[] {
  try {
    const existing = safeParse(localStorage.getItem(STORAGE_KEY));

    if (existing && existing.length > 0) {
      return existing;
    }

    // Create default gallery
    const defaultGallery: Gallery = {
      id: uuidv4(),
      name: 'My First Gallery',
      description: 'Start curating by saving artworks from Search.',
      createdAt: new Date().toISOString(),
      artworks: [],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultGallery]));
    return [defaultGallery];
  } catch (error) {
    logError(error, { component: 'galleryStore', action: 'initialGalleries' });

    // Return empty array if localStorage fails
    return [];
  }
}

function persist(galleries: Gallery[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(galleries));
  } catch (error) {
    logError(error, { component: 'galleryStore', action: 'persist' });

    // Could show user notification here about storage failure
  }
}

export function useGalleryStore() {
  const [galleries, setGalleries] = useState<Gallery[]>(initialGalleries);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      persist(galleries);
    } else {
      mounted.current = true;
    }
  }, [galleries]);

  const api = useMemo(() => {
    function createGallery(name: string, description: string): Gallery {
      const trimmedName = name.trim();

      if (!trimmedName) {
        throw new AppError('Gallery name cannot be empty', 'VALIDATION_ERROR', {
          component: 'galleryStore',
          action: 'createGallery',
        });
      }

      const gallery: Gallery = {
        id: uuidv4(),
        name: trimmedName,
        description: description.trim(),
        createdAt: new Date().toISOString(),
        artworks: [],
      };

      setGalleries((prev) => [...prev, gallery]);
      return gallery;
    }

    function addArtworkToGallery(galleryId: string, art: Artwork): void {
      setGalleries((prev) =>
        prev.map((g) => {
          if (g.id !== galleryId) return g;

          const exists = g.artworks.some((a) => a.id === art.id);
          if (exists) return g;

          return { ...g, artworks: [...g.artworks, art] };
        })
      );
    }

    function addArtworkToGalleries(galleryIds: string[], art: Artwork): void {
      setGalleries((prev) =>
        prev.map((g) => {
          if (!galleryIds.includes(g.id)) return g;

          const exists = g.artworks.some((a) => a.id === art.id);
          if (exists) return g;

          return { ...g, artworks: [...g.artworks, art] };
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
