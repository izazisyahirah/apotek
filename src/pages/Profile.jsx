import { useEffect, useState } from "react";
import { profile } from "../services/profile";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    tanggal_lahir: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profile.fetchProfile();
      if (data.length > 0) {
        setUserProfile(data[0]);
        setForm({
          nama: data[0].nama,
          tanggal_lahir: data[0].tanggal_lahir,
        });
      } else {
        setUserProfile(null);
        setForm({ nama: "", tanggal_lahir: "" });
      }
    } catch {
      setError("Lengkapi data diri");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (userProfile && isEditMode) {
        await profile.updateProfile(userProfile.id, form);
        setSuccess("Profil berhasil diperbarui.");
      } else {
        await profile.createProfile(form);
        setSuccess("Profil berhasil ditambahkan.");
      }
      setIsEditMode(false);
      loadProfile();
    } catch {
      setError("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus profil ini?")) return;
    try {
      setLoading(true);
      await profile.deleteProfile(userProfile.id);
      setUserProfile(null);
      setForm({ nama: "", tanggal_lahir: "" });
      setSuccess("Profil berhasil dihapus.");
    } catch {
      setError("Gagal menghapus profil.");
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

      {!loading && (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {userProfile
                ? isEditMode
                  ? "Edit Profil"
                  : "Detail Profil"
                : "Tambah Profil"}
            </h2>

            <div>
              <label className="block text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                required
                disabled={!isEditMode && userProfile}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                value={form.tanggal_lahir}
                onChange={handleChange}
                required
                disabled={!isEditMode && userProfile}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
              />
            </div>

            {(!userProfile || isEditMode) && (
              <div className="gap-3 grid grid-cols-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700"
                >
                  {userProfile ? "Simpan Perubahan" : "Simpan Profil"}
                </button>
                {userProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditMode(false);
                      setForm({
                        nama: userProfile.nama,
                        tanggal_lahir: userProfile.tanggal_lahir,
                      });
                    }}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-400"
                  >
                    Batal
                  </button>
                )}
              </div>
            )}
          </form>

          {/* tombol Edit & Hapus dipisah di luar form */}
          {userProfile && !isEditMode && (
            <div className="gap-3 mt-4 grid grid-cols-2">
              <button
                type="button"
                onClick={() => setIsEditMode(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}