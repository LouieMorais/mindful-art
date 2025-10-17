import { supabase } from './supabaseClient';

export type Artwork = {
  id: string;
  title: string;
  created_at: string;
};

export async function listArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from('mindful.artworks')
    .select('id,title,created_at')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Artwork[];
}

export async function createArtwork(title: string): Promise<Artwork> {
  const { data, error } = await supabase
    .from('mindful.artworks')
    .insert({ title })
    .select('id,title,created_at')
    .single();

  if (error) throw error;
  return data as Artwork;
}
