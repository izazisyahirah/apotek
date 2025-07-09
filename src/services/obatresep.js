import { supabase } from './supabase';

// Upload gambar ke storage 'resep'
export async function uploadResepImage(file, userId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}_${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage.from('resep').upload(fileName, file);
  if (error) throw error;
  return data.path; // path di storage
}

// Insert data resep ke tabel 'obatresep'
export async function insertObatResep({ keterangan, gambar, pelanggan_id }) {
  const { data, error } = await supabase
    .from('obatresep')
    .insert([{ keterangan, gambar, pelanggan_id }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Ambil semua resep
export async function getAllObatResep() {
  const { data, error } = await supabase
    .from('obatresep')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}
