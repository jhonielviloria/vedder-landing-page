// Supabase client initialization
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseEnabled = Boolean(url && key);

export const supabase = supabaseEnabled
  ? createClient(url, key)
  : null;

if (!supabaseEnabled) {
  // eslint-disable-next-line no-console
  console.warn('Supabase not configured. The admin products and store will use fallbacks until env vars are set.');
}
