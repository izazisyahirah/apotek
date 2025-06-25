import { useEffect, useState } from "react";
import { review } from "../services/review";
import AlertBox from "../components/AlertBox";
import GenericTable from "../components/GenericTable";
import { AiFillDelete } from "react-icons/ai";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

export default function ReviewPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reviews, setReviews] = useState([]);

  const [dataForm, setDataForm] = useState({
    rating: "",
    keterangan: "",
  });

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await review.fetchReviews();
      setReviews(data);
    } catch (err) {
      setError("Tambahkan review");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (dataForm.rating < 1 || dataForm.rating > 5) {
      setError("Rating harus antara 1 sampai 5.");
      return;
    }

    try {
      setLoading(true);
      await review.createReview(dataForm);
      setSuccess("Review berhasil dikirim!");
      setDataForm({ rating: "", keterangan: "" });
      loadReviews();
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim review.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus review ini?")) return;
    try {
      setLoading(true);
      await review.deleteReview(id);
      loadReviews();
    } catch (err) {
      setError("Gagal menghapus review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">
        Review Pelanggan Apotek
      </h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Tambahkan Review Baru
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
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Keterangan Review
            </label>
            <textarea
              name="keterangan"
              value={dataForm.keterangan}
              onChange={handleChange}
              required
              rows="3"
              disabled={loading}
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              placeholder="Tuliskan pengalaman atau komentar Anda..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            {loading ? "Mengirim..." : "Kirim Review"}
          </button>
        </form>
      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Daftar Review ({reviews.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat data review..." />}

        {!loading && reviews.length === 0 && !error && (
          <EmptyState text="Belum ada review pelanggan." />
        )}

        {!loading && reviews.length > 0 && (
          <GenericTable
            columns={["#", "Rating", "Keterangan", "Aksi"]}
            data={reviews}
            renderRow={(item, index) => (
              <>
                <td className="px-6 py-4 text-gray-700 font-medium">{index + 1}</td>
                <td className="px-6 py-4 text-yellow-500 font-semibold">{item.rating} ★</td>
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {item.keterangan}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Hapus review"
                  >
                    <AiFillDelete className="text-2xl" />
                  </button>
                </td>
              </>
            )}
          />
        )}
      </div>
    </div>
  );
}
