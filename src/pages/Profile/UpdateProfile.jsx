import { useEffect, useState } from "react";
import {
  getPelangganById,
  updatePelangganProfile,
  uploadProfilePhoto,
} from "../../services/pelanggan";
import { supabase } from "../../services/supabase";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function UpdateProfile({ onProfileUpdate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    email: "",
    nama: "",
    alamat: "",
    phone: "",
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoUrl, setFotoUrl] = useState("");

  // Ambil data pelanggan dari Supabase
  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        setError("User tidak ditemukan.");
        return;
      }

      const { data: profile } = await getPelangganById(userId);
      if (profile) {
        setForm({
          email: profile.email || "",
          nama: profile.nama || "",
          alamat: profile.alamat || "",
          phone: profile.phone || "",
        });
        setFotoUrl(profile.foto_profil || "");
        setFotoFile(null);
      }
    } catch {
      setError("Gagal memuat data profil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setFotoUrl(URL.createObjectURL(file)); // preview
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) {
        setError("User tidak ditemukan.");
        return;
      }

      let finalFotoUrl = fotoUrl;

      if (fotoFile) {
        const { url, error: uploadError } = await uploadProfilePhoto(
          userId,
          fotoFile
        );
        if (uploadError) {
          setError("Gagal upload foto.");
          setLoading(false);
          return;
        }
        finalFotoUrl = url;
      }

      await updatePelangganProfile(userId, {
        ...form,
        foto_profil: finalFotoUrl,
      });

      setSuccess("Data berhasil disimpan.");
      setFotoFile(null);
      if (onProfileUpdate) onProfileUpdate();
      loadProfile();
    } catch {
      setError("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) return;

      await updatePelangganProfile(userId, { foto_profil: null });
      setFotoUrl("");
      setFotoFile(null);
      setSuccess("Foto profil berhasil dihapus.");
    } catch {
      setError("Gagal menghapus foto profil.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
        Update Data Diri
      </h2>

      {loading && <LoadingSpinner text="Menyimpan..." />}
      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="flex flex-col items-center mb-6">
        {fotoUrl ? (
          <img
            src={fotoUrl}
            alt="Foto Profil"
            className="w-28 h-28 rounded-full object-cover border"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
            ?
          </div>
        )}
        <div className="mt-3 flex flex-col items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="text-sm"
          />
          {fotoUrl && (
            <button
              type="button"
              onClick={handleDeletePhoto}
              className="text-red-500 text-sm hover:underline"
            >
              Hapus Foto
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            className="w-full border border-gray-200 bg-gray-100 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Nama</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Alamat</label>
          <textarea
            name="alamat"
            rows="2"
            value={form.alamat}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">No HP</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
