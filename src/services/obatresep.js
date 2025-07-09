import axios from "axios";

const API_URL = "https://rlkrzkngbfbzumeipfbs.supabase.co/rest/v1/obatresep";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsa3J6a25nYmZienVtZWlwZmJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MzU1NzYsImV4cCI6MjA2NzIxMTU3Nn0.M-S-U9dYLo_rMfpLsZsMzb_Fn89kTHgbvaIPxfyWd6s"

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const resep = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}?order=created_at.desc`, { headers });
    return response.data;
  },

  async fetchById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
    return response.data[0]; // karena supabase REST API balikin array
  },

  async create(data) {
    const response = await axios.post(API_URL, [data], { headers });
    return response.data[0];
  },

  async update(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data[0];
  },

  async delete(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  },
};
