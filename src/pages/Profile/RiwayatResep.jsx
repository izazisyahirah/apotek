import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import LoadingSpinner from "../../components/LoadingSpinner";
import AlertBox from "../../components/AlertBox";

export default function RiwayatResep() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Ambil user yang login
      const { data: userData } = await supabase.auth.getUser();
      const email = userData?.user?.email;
      if (!email) {
        setError("Email pengguna tidak ditemukan.");
        return;
      }

      // 2. Ambil ID pelanggan berdasarkan email login
      const { data: pelangganData, error: pelangganErr } = await supabase
        .from("pelanggan")
        .select("id")
        .eq("email", email)
        .single();

      if (pelangganErr || !pelangganData?.id) {
        setError("Pelanggan tidak ditemukan.");
        return;
      }

      // 3. Ambil data dari tabel obatresep berdasarkan pelanggan_id
      const { data: resepList, error: resepError } = await supabase
        .from("obatresep")
        .select("*")
        .eq("pelanggan_id", pelangganData.id)
        .order("created_at", { ascending: false });

      if (resepError) {
        setError("Gagal mengambil data resep.");
        return;
      }

      setData(resepList || []);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">
        Riwayat Resep Obat
      </h2>

      {error && <AlertBox type="error">{error}</AlertBox>}
      {loading && <LoadingSpinner />}

      {data.length === 0 && !loading ? (
        <p className="text-gray-600">Belum ada resep obat yang diunggah.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg shadow-sm p-4 bg-white"
            >
              <p className="text-sm text-gray-500">
                Tanggal: {new Date(item.created_at).toLocaleDateString("id-ID")}
              </p>
              <p className="font-semibold mt-2">
                Keterangan: {item.keterangan || "-"}
              </p>
              {item.gambar && (
                <>
                  <img
                    src={item.gambar}
                    alt="Foto Resep"
                    className="w-full h-48 object-cover mt-2 rounded-md"
                  />
                  <a
                    href={item.gambar}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`resep_${item.id}.jpg`}
                    className="inline-block mt-2 text-sm text-emerald-600 hover:underline"
                  >
                    Download Gambar
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
