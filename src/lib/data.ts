// src/lib/data.ts
import { supabase } from './supabaseClient';
import { logError, AppError } from '../utils/errorLogger';
import type { PostgrestSingleResponse, PostgrestResponse } from '@supabase/supabase-js';

// Types matching database schema
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface VaultItem {
  id: string;
  user_id: string;
  gallery_id: string | null;
  title: string;
  description: string | null;
  image_url: string;
  thumbnail_url: string | null;
  storage_path: string;
  file_size: number | null;
  mime_type: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
  updated_at: string;
}

// Profile operations
export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const result: PostgrestSingleResponse<Profile> = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (result.error) {
      throw new AppError(
        'Failed to fetch profile',
        'DB_ERROR',
        { component: 'data', action: 'getProfile', userId },
        result.error
      );
    }

    return result.data;
  } catch (error) {
    logError(error, { component: 'data', action: 'getProfile', userId });
    return null;
  }
}

// Gallery operations
export async function getUserGalleries(userId: string): Promise<Gallery[]> {
  try {
    const result: PostgrestResponse<Gallery> = await supabase
      .from('galleries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (result.error) {
      throw new AppError(
        'Failed to fetch galleries',
        'DB_ERROR',
        { component: 'data', action: 'getUserGalleries', userId },
        result.error
      );
    }

    return result.data || [];
  } catch (error) {
    logError(error, { component: 'data', action: 'getUserGalleries', userId });
    return [];
  }
}

export async function getGallery(galleryId: string): Promise<Gallery | null> {
  try {
    const result: PostgrestSingleResponse<Gallery> = await supabase
      .from('galleries')
      .select('*')
      .eq('id', galleryId)
      .single();

    if (result.error) {
      throw new AppError(
        'Failed to fetch gallery',
        'DB_ERROR',
        { component: 'data', action: 'getGallery', metadata: { galleryId } },
        result.error
      );
    }

    return result.data;
  } catch (error) {
    logError(error, { component: 'data', action: 'getGallery', metadata: { galleryId } });
    return null;
  }
}

export async function createGallery(
  userId: string,
  title: string,
  description?: string,
  isPublic: boolean = false
): Promise<Gallery | null> {
  try {
    if (!title || title.trim().length === 0) {
      throw new AppError('Gallery title cannot be empty', 'VALIDATION_ERROR', {
        component: 'data',
        action: 'createGallery',
      });
    }

    const result: PostgrestSingleResponse<Gallery> = await supabase
      .from('galleries')
      .insert({
        user_id: userId,
        title: title.trim(),
        description: description?.trim() || null,
        is_public: isPublic,
      })
      .select()
      .single();

    if (result.error) {
      throw new AppError(
        'Failed to create gallery',
        'DB_ERROR',
        { component: 'data', action: 'createGallery', userId },
        result.error
      );
    }

    return result.data;
  } catch (error) {
    logError(error, { component: 'data', action: 'createGallery', userId });
    return null;
  }
}

export async function updateGallery(
  galleryId: string,
  updates: Partial<Pick<Gallery, 'title' | 'description' | 'is_public'>>
): Promise<Gallery | null> {
  try {
    if (updates.title !== undefined && updates.title.trim().length === 0) {
      throw new AppError('Gallery title cannot be empty', 'VALIDATION_ERROR', {
        component: 'data',
        action: 'updateGallery',
      });
    }

    const sanitizedUpdates = {
      ...updates,
      title: updates.title?.trim(),
      description: updates.description?.trim() || null,
    };

    const result: PostgrestSingleResponse<Gallery> = await supabase
      .from('galleries')
      .update(sanitizedUpdates)
      .eq('id', galleryId)
      .select()
      .single();

    if (result.error) {
      throw new AppError(
        'Failed to update gallery',
        'DB_ERROR',
        { component: 'data', action: 'updateGallery', metadata: { galleryId } },
        result.error
      );
    }

    return result.data;
  } catch (error) {
    logError(error, { component: 'data', action: 'updateGallery', metadata: { galleryId } });
    return null;
  }
}

export async function deleteGallery(galleryId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('galleries').delete().eq('id', galleryId);

    if (error) {
      throw new AppError(
        'Failed to delete gallery',
        'DB_ERROR',
        { component: 'data', action: 'deleteGallery', metadata: { galleryId } },
        error
      );
    }

    return true;
  } catch (error) {
    logError(error, { component: 'data', action: 'deleteGallery', metadata: { galleryId } });
    return false;
  }
}

// Vault operations
export async function getVaultItems(userId: string, galleryId?: string): Promise<VaultItem[]> {
  try {
    let query = supabase.from('vault_items').select('*').eq('user_id', userId);

    if (galleryId) {
      query = query.eq('gallery_id', galleryId);
    }

    const result: PostgrestResponse<VaultItem> = await query.order('created_at', {
      ascending: false,
    });

    if (result.error) {
      throw new AppError(
        'Failed to fetch vault items',
        'DB_ERROR',
        { component: 'data', action: 'getVaultItems', userId, metadata: { galleryId } },
        result.error
      );
    }

    return result.data || [];
  } catch (error) {
    logError(error, {
      component: 'data',
      action: 'getVaultItems',
      userId,
      metadata: { galleryId },
    });
    return [];
  }
}

export async function deleteVaultItem(itemId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('vault_items').delete().eq('id', itemId);

    if (error) {
      throw new AppError(
        'Failed to delete vault item',
        'DB_ERROR',
        { component: 'data', action: 'deleteVaultItem', metadata: { itemId } },
        error
      );
    }

    return true;
  } catch (error) {
    logError(error, { component: 'data', action: 'deleteVaultItem', metadata: { itemId } });
    return false;
  }
}
