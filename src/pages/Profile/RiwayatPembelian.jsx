import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import LoadingSpinner from "../../components/LoadingSpinner";
import AlertBox from "../../components/AlertBox";

export default function RiwayatPembelian() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRiwayat = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: session } = await supabase.auth.getUser();
      const userId = session?.user?.id;

      if (!userId) {
        setError("User belum login.");
        setLoading(false);
        return;
      }

      const { data: pembelian, error: fetchError } = await supabase
        .from("riwayat_pembelian")
        .select("*")
        .eq("pelanggan_id", userId)
        .order("tanggal_transaksi", { ascending: false });

      if (fetchError) {
        setError("Gagal memuat riwayat pembelian.");
        return;
      }

      setData(pembelian || []);
    } catch {
      setError("Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRiwayat();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-700">
        Riwayat Pembelian
      </h2>

      {loading && <LoadingSpinner text="Memuat data..." />}
      {error && <AlertBox type="error">{error}</AlertBox>}
      {!loading && data.length === 0 && (
        <p className="text-gray-500">Belum ada transaksi yang tercatat.</p>
      )}

      {!loading && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead className="bg-emerald-100 text-emerald-800">
              <tr>
                <th className="py-2 px-4 border">Tanggal</th>
                <th className="py-2 px-4 border">Produk</th>
                <th className="py-2 px-4 border">Tipe</th>
                <th className="py-2 px-4 border">Jumlah</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">
                    {new Date(item.tanggal_transaksi).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-2 px-4 border">{item.nama_produk}</td>
                  <td className="py-2 px-4 border capitalize">{item.produk_tipe}</td>
                  <td className="py-2 px-4 border">{item.jumlah}</td>
                  <td className="py-2 px-4 border">
                    Rp {item.total_pembelian.toLocaleString("id-ID")}
                  </td>
                  <td className="py-2 px-4 border text-emerald-600">{item.status_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}