import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { review } from "../services/review";
import AlertBox from "../components/AlertBox";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Review() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPelangganId, setCurrentPelangganId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [dataForm, setDataForm] = useState({
    rating: "",
    quote: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        setError("Silakan login terlebih dahulu untuk menginputkan review.");
        return;
      }

      setCurrentUser(data.user);

      const { data: pelangganData, error: pelangganError } = await supabase
        .from("pelanggan")
        .select("id")
        .eq("email", data.user.email)
        .single();

      if (pelangganError || !pelangganData) {
        setError("Data pelanggan tidak ditemukan.");
      } else {
        setCurrentPelangganId(pelangganData.id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) loadReviews();
  }, [currentUser]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await review.fetchReviews();
      setReviews(data);
    } catch {
      setError("Gagal memuat review.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentUser || !currentPelangganId) {
      setError("Anda harus login terlebih dahulu.");
      return;
    }

    if (dataForm.rating < 1 || dataForm.rating > 5) {
      setError("Rating harus antara 1 sampai 5.");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await review.updateReview(editId, {
          rating: parseInt(dataForm.rating),
          quote: dataForm.quote,
        });
        setSuccess("Review berhasil diperbarui.");
        setEditId(null);
      } else {
        await review.createReview({
          rating: parseInt(dataForm.rating),
          quote: dataForm.quote,
          pelanggan_id: currentPelangganId,
        });
        setSuccess("Review berhasil dikirim!");
      }

      setDataForm({ rating: "", quote: "" });
      loadReviews();
    } catch {
      setError("Terjadi kesalahan saat menyimpan review.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleDelete = async (id, pelanggan_id) => {
    if (pelanggan_id !== currentPelangganId) return;
    if (!confirm("Yakin ingin menghapus review ini?")) return;

    try {
      setLoading(true);
      await review.deleteReview(id);
      loadReviews();
    } catch {
      setError("Gagal menghapus review.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (r) => {
    setEditId(r.id);
    setDataForm({ rating: r.rating, quote: r.quote });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">
        Review Pelanggan Apotek
      </h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {currentUser && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit Review Anda" : "Tambahkan Review Baru"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Rating (1 - 5)
              </label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={dataForm.rating}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Quote</label>
              <textarea
                name="quote"
                value={dataForm.quote}
                onChange={handleChange}
                required
                rows="3"
                disabled={loading}
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                placeholder="Tuliskan pengalaman atau komentar Anda..."
              ></textarea>
            </div>

            <div className="flex justify-between items-center gap-2">
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setDataForm({ rating: "", quote: "" });
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl shadow"
                >
                  Batal Edit
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md text-center"
              >
                {loading
                  ? "Menyimpan..."
                  : editId
                  ? "Simpan Perubahan"
                  : "Kirim Review"}
              </button>
            </div>
          </form>
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-700 mt-10 mb-4 text-center">
        Semua Review
      </h3>

      {loading ? (
        <LoadingSpinner />
      ) : reviews.length === 0 ? (
        <EmptyState message="Belum ada review." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl shadow-md p-4 border border-green-500 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={r.pelanggan?.foto_profil || "/default-profile.png"}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {r.pelanggan?.nama || "Anonim"}
                    </p>
                  </div>
                </div>

                {r.pelanggan_id === currentPelangganId && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setDropdownOpen(dropdownOpen === r.id ? null : r.id)
                      }
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <BsThreeDotsVertical size={20} />
                    </button>

                    {dropdownOpen === r.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                        <button
                          onClick={() => {
                            handleEdit(r);
                            setDropdownOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(r.id, r.pelanggan_id);
                            setDropdownOpen(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-yellow-500 text-lg mb-1">
                {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
              </div>
              <p className="text-gray-700 italic">"{r.quote}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}