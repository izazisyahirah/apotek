import { supabase } from "./supabase";

export const review = {
  async fetchReviews() {
    const { data: testimoniList, error: testimoniError } = await supabase
      .from("testimoni")
      .select("*");

    if (testimoniError) throw testimoniError;

    const { data: pelangganList, error: pelangganError } = await supabase
      .from("pelanggan")
      .select("id, nama, foto_profil");

    if (pelangganError) throw pelangganError;

    const merged = testimoniList.map((r) => {
      const pel = pelangganList.find((p) => p.id === r.pelanggan_id);
      return {
        ...r,
        pelanggan: pel || null,
      };
    });

    return merged;
  },

  async createReview(data) {
    const { data: inserted, error } = await supabase
      .from("testimoni")
      .insert(data);

    if (error) throw error;
    return inserted;
  },

  async deleteReview(id) {
    const { error } = await supabase
      .from("testimoni")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },

  async updateReview(id, payload) {
    const { error } = await supabase
      .from("testimoni")
      .update(payload)
      .eq("id", id);

    if (error) throw error;
  },
};