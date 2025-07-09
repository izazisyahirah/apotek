import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://rlkrzkngbfbzumeipfbs.supabase.co"; // ganti dengan project URL-mu jika beda
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsa3J6a25nYmZienVtZWlwZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU1NzYsImV4cCI6MjA2NzIxMTU3Nn0.M-S-U9dYLo_rMfpLsZsMzb_Fn89kTHgbvaIPxfyWd6s";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
