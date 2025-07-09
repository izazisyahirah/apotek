import { useEffect, useState } from "react";
import { getPelangganById, updatePelangganProfile, uploadProfilePhoto } from "../../services/pelanggan";
import { supabase } from "../../services/supabase";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    phone: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoUrl, setFotoUrl] = useState("");

  // Ambil user id dari Supabase Auth
  const getUserId = () => {
    const user = supabase.auth.getUser ? supabase.auth.getUser() : supabase.auth.user();
    if (user && user.id) return user.id;
    if (user && user.data && user.data.user) return user.data.user.id;
    return null;
  };

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      let userId = null;
      if (supabase.auth.getUser) {
        const { data } = await supabase.auth.getUser();
        userId = data?.user?.id;
      } else {
        userId = supabase.auth.user()?.id;
      }
      if (!userId) {
        setError("User tidak ditemukan. Silakan login ulang.");
        return;
      }
      const { data, error } = await getPelangganById(userId);
      if (error || !data) {
        setError("Data profil tidak ditemukan.");
        setUserProfile(null);
        setForm({ nama: "", alamat: "", phone: "" });
        setFotoUrl("");
      } else {
        setUserProfile(data);
        setForm({
          nama: data.nama || "",
          alamat: data.alamat || "",
          phone: data.phone || "",
        });
        setFotoUrl(data.foto_profil || "");
      }
    } catch {
      setError("Gagal memuat data profil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      let newFotoUrl = fotoUrl;
      if (fotoFile) {
        const { url, error: uploadError } = await uploadProfilePhoto(userProfile.id, fotoFile);
        if (uploadError) {
          setError("Gagal upload foto profil.");
          setLoading(false);
          return;
        }
        newFotoUrl = url;
      }
      await updatePelangganProfile(userProfile.id, { ...form, foto_profil: newFotoUrl });
      setFotoUrl(newFotoUrl);
      setSuccess("Profil berhasil diperbarui.");
      setIsEditMode(false);
      setFotoFile(null);
      loadProfile();
    } catch {
      setError("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">
        Profil Pelanggan
      </h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}
      {loading && <LoadingSpinner text="Memuat data..." />}

      {!loading && userProfile && (
        <>
          {fotoUrl && (
            <div className="mb-4 flex justify-center">
              <img
                src={fotoUrl}
                alt="Foto Profil"
                className="w-32 h-32 rounded-full object-cover border"
              />
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? "Edit Profil" : "Detail Profil"}
            </h2>

            <div>
              <label className="block text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                required
                disabled={!isEditMode}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Alamat</label>
              <input
                type="text"
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                required
                disabled={!isEditMode}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">No. Telepon</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                disabled={!isEditMode}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
              />
            </div>
            {isEditMode && (
              <div>
                <label className="block text-gray-700 mb-1">Foto Profil</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setFotoFile(e.target.files[0])}
                  className="w-full"
                />
              </div>
            )}
            {isEditMode && (
              <div className="gap-3 grid grid-cols-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditMode(false);
                    setForm({
                      nama: userProfile.nama,
                      alamat: userProfile.alamat,
                      phone: userProfile.phone,
                    });
                    setFotoFile(null);
                  }}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            )}
          </form>
          {!isEditMode && (
            <div className="gap-3 mt-4 grid grid-cols-1">
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}