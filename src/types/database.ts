// src/types/database.ts

export interface Profile {
  id: string; // UUID
  username: string;
  country: string | null;
  preferred_languages: string[] | null;
  start_date: string | null; // ISO timestamptz
  created_at: string | null;
  updated_at: string | null;
}

export interface VaultItem {
  id: number; // BIGINT
  user_id: string; // UUID
  artwork_key: string;
  artwork_json: Record<string, unknown>;
  created_at: string | null; // ISO timestamptz
}

export interface Gallery {
  id: number; // BIGINT
  user_id: string; // UUID
  name: string;
  description: string | null;
  created_at: string | null; // ISO timestamptz
  updated_at: string | null; // ISO timestamptz
}

export interface GalleryItem {
  id: number; // BIGINT
  gallery_id: number; // BIGINT
  artwork_key: string;
  artwork_json: Record<string, unknown>;
  position: number | null;
  created_at: string | null; // ISO timestamptz
}

export interface AuditLog {
  id: number; // BIGINT
  user_id: string | null; // UUID
  action: string;
  target_id: string | null;
  metadata: Record<string, unknown> | null;
  timestamp: string | null; // ISO timestamptz
}
