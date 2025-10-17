import { supabase } from './supabaseClient';
import type { PostgrestSingleResponse, PostgrestResponse } from '@supabase/supabase-js';

// Types matching our database schema
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

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  table_name: string;
  record_id: string | null;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

// Profile operations
export async function getProfile(userId: string): Promise<Profile | null> {
  const result: PostgrestSingleResponse<Profile> = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (result.error) {
    console.error('Error fetching profile:', result.error);
    return null;
  }
  return result.data;
}

// Gallery operations
export async function getUserGalleries(userId: string): Promise<Gallery[]> {
  const result: PostgrestResponse<Gallery> = await supabase
    .from('galleries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (result.error) {
    console.error('Error fetching galleries:', result.error);
    return [];
  }
  return result.data || [];
}

export async function getGallery(galleryId: string): Promise<Gallery | null> {
  const result: PostgrestSingleResponse<Gallery> = await supabase
    .from('galleries')
    .select('*')
    .eq('id', galleryId)
    .single();

  if (result.error) {
    console.error('Error fetching gallery:', result.error);
    return null;
  }
  return result.data;
}

export async function createGallery(
  userId: string,
  title: string,
  description?: string,
  isPublic: boolean = false
): Promise<Gallery | null> {
  const result: PostgrestSingleResponse<Gallery> = await supabase
    .from('galleries')
    .insert({
      user_id: userId,
      title,
      description,
      is_public: isPublic,
    })
    .select()
    .single();

  if (result.error) {
    console.error('Error creating gallery:', result.error);
    return null;
  }
  return result.data;
}

export async function updateGallery(
  galleryId: string,
  updates: Partial<Pick<Gallery, 'title' | 'description' | 'is_public'>>
): Promise<Gallery | null> {
  const result: PostgrestSingleResponse<Gallery> = await supabase
    .from('galleries')
    .update(updates)
    .eq('id', galleryId)
    .select()
    .single();

  if (result.error) {
    console.error('Error updating gallery:', result.error);
    return null;
  }
  return result.data;
}

export async function deleteGallery(galleryId: string): Promise<boolean> {
  const { error } = await supabase.from('galleries').delete().eq('id', galleryId);

  if (error) {
    console.error('Error deleting gallery:', error);
    return false;
  }
  return true;
}

// Vault operations
export async function getVaultItems(userId: string, galleryId?: string): Promise<VaultItem[]> {
  let query = supabase.from('vault_items').select('*').eq('user_id', userId);

  if (galleryId) {
    query = query.eq('gallery_id', galleryId);
  }

  const result: PostgrestResponse<VaultItem> = await query.order('created_at', {
    ascending: false,
  });

  if (result.error) {
    console.error('Error fetching vault items:', result.error);
    return [];
  }
  return result.data || [];
}

export async function getVaultItem(itemId: string): Promise<VaultItem | null> {
  const result: PostgrestSingleResponse<VaultItem> = await supabase
    .from('vault_items')
    .select('*')
    .eq('id', itemId)
    .single();

  if (result.error) {
    console.error('Error fetching vault item:', result.error);
    return null;
  }
  return result.data;
}

export async function createVaultItem(
  userId: string,
  itemData: Omit<VaultItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<VaultItem | null> {
  const result: PostgrestSingleResponse<VaultItem> = await supabase
    .from('vault_items')
    .insert({
      user_id: userId,
      ...itemData,
    })
    .select()
    .single();

  if (result.error) {
    console.error('Error creating vault item:', result.error);
    return null;
  }
  return result.data;
}

export async function updateVaultItem(
  itemId: string,
  updates: Partial<Pick<VaultItem, 'title' | 'description' | 'gallery_id'>>
): Promise<VaultItem | null> {
  const result: PostgrestSingleResponse<VaultItem> = await supabase
    .from('vault_items')
    .update(updates)
    .eq('id', itemId)
    .select()
    .single();

  if (result.error) {
    console.error('Error updating vault item:', result.error);
    return null;
  }
  return result.data;
}

export async function deleteVaultItem(itemId: string): Promise<boolean> {
  const { error } = await supabase.from('vault_items').delete().eq('id', itemId);

  if (error) {
    console.error('Error deleting vault item:', error);
    return false;
  }
  return true;
}
