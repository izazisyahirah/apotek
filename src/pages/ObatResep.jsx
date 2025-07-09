import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { insertObatResep, getAllObatResep, uploadResepImage } from "../services/obatresep";
import { supabase } from "../services/supabase";
import AlertBox from "../components/AlertBox";

export default function ObatResep() {
  const navigate = useNavigate();
  const [reseps, setReseps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    keterangan: "",
    gambar: null,
  });

  const [preview, setPreview] = useState(null);

  const loadReseps = async () => {
    try {
      const data = await getAllObatResep();
      setReseps(data);
    } catch {
      setError("Gagal memuat data resep.");
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        loadReseps();
      }
    };
    checkUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      const file = files[0];
      setForm({ ...form, gambar: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let imageUrl = null;
      const email = user.email;

      const { data: pelanggan, error: pelangganError } = await supabase
        .from("pelanggan")
        .select("id")
        .eq("email", email)
        .single();

      if (pelangganError || !pelanggan?.id)
        throw new Error("Data pelanggan tidak ditemukan.");

      const pelanggan_id = pelanggan.id;

      if (form.gambar) {
        const path = await uploadResepImage(form.gambar, pelanggan_id);
        const { data: urlData } = supabase.storage.from("resep").getPublicUrl(path);
        imageUrl = urlData.publicUrl;
      }

      const newResep = {
        keterangan: form.keterangan,
        gambar: imageUrl,
        pelanggan_id,
      };

      await insertObatResep(newResep);

      setSuccess("Resep berhasil dikirim!");
      setForm({ keterangan: "", gambar: null });
      setPreview(null);
      loadReseps();
    } catch (err) {
      setError("Gagal menyimpan resep: " + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">
        Unggah Resep Dokter
      </h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {!user ? (
        <div className="bg-red-100 border border-red-300 text-red-800 text-center px-5 py-5 rounded-xl shadow-md">
          Silakan login terlebih dahulu untuk mengunggah resep dokter.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Gambar Resep
              </label>
              <input
                type="file"
                name="gambar"
                accept="image/*"
                onChange={handleChange}
                disabled={loading}
                required
                className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 max-h-64 rounded-xl shadow"
                />
              )}
            </div>

            <div>
              <label className="block font-medium">Keterangan</label>
              <textarea
                name="keterangan"
                required
                rows="3"
                value={form.keterangan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                placeholder="Tuliskan informasi tambahan..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl"
            >
              {loading ? "Mengirim..." : "Kirim Resep"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}