import { supabase } from './supabase';

// Insert pelanggan baru
export async function insertPelanggan({ id, email, nama, alamat, phone }) {
  return await supabase
    .from('pelanggan')
    .insert([{ id, email, nama, alamat, phone, segmentasi: 'silver', total_pembelian: 0 }]);
}

// Get pelanggan by id
export async function getPelangganById(id) {
  const { data, error } = await supabase
    .from('pelanggan')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

// Update profile pelanggan
export async function updatePelangganProfile(id, { email, nama, alamat, phone, foto_profil }) {
    return await supabase
        .from('pelanggan')
        .update({ email, nama, alamat, phone, foto_profil })
        .eq('id', id);
}

// Upload foto profil (dengan nama unik + cache-busting)
export async function uploadProfilePhoto(userId, file) {
  const ext = file.name.split('.').pop();
  const timestamp = Date.now();
  const filePath = `profile_${userId}_${timestamp}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('profile-photo')
    .upload(filePath, file, { upsert: true });

  if (uploadError) return { error: uploadError };

  const { data: publicUrlData } = supabase.storage
    .from('profile-photo')
    .getPublicUrl(filePath);

  return {
    url: `${publicUrlData.publicUrl}?t=${timestamp}`, // Cache busting
  };
}