import axios from 'axios';

const API_URL = "https://cnxlzvapqucxphsoeubg.supabase.co/rest/v1/faq";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNueGx6dmFwcXVjeHBoc29ldWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjE4NzgsImV4cCI6MjA2NTUzNzg3OH0.Q5qszj0Q_VlUTFFCKUXy7ZbmPSsUlTgI4y41r0IDmkc";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const faq = {
  async fetchFAQ() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },
};