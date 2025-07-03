import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://cnxlzvapqucxphsoeubg.supabase.co"; // ganti dengan project URL-mu jika beda
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNueGx6dmFwcXVjeHBoc29ldWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjE4NzgsImV4cCI6MjA2NTUzNzg3OH0.Q5qszj0Q_VlUTFFCKUXy7ZbmPSsUlTgI4y41r0IDmkc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
