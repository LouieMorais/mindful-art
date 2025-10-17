// src/lib/testConnection.ts
import { supabase } from './supabaseClient';

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('galleries')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }

    console.log('✅ Database connection successful!');
    console.log('✅ Galleries table is accessible');
    return true;
  } catch (err) {
    console.error('❌ Connection test failed:', err);
    return false;
  }
}
