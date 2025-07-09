import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase"; 

export default function LikedProducts() {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const likedIds = JSON.parse(localStorage.getItem("likes")) || [];

        // Pisahkan ID berdasarkan kategori
        const medicineIds = likedIds
          .filter((id) => id.startsWith("medicine-"))
          .map((id) => id.replace("medicine-", ""));
        const medicalIds = likedIds
          .filter((id) => id.startsWith("medical-"))
          .map((id) => id.replace("medical-", ""));

        // Ambil data dari Supabase
        const [{ data: obat }, { data: alkes }] = await Promise.all([
          supabase
            .from("daftar_obat")
            .select("*")
            .in("id", medicineIds),
          supabase
            .from("alat_kesehatan")
            .select("*")
            .in("id", medicalIds),
        ]);

        // Tambahkan penanda jenis
        const result = [
          ...(obat || []).map((item) => ({ ...item, type: "medicine" })),
          ...(alkes || []).map((item) => ({ ...item, type: "medical" })),
        ];

        setLiked(result);
      } catch (err) {
        console.error("Gagal mengambil data produk yang disukai:", err);
      }
    };

    fetchLikedProducts();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
          Produk yang Kamu Sukai
        </h1>

        {liked.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-md text-gray-600">
            <p className="text-lg mb-4">Belum ada produk yang kamu like.</p>
            <Link
              to="/medicine"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow transition"
            >
              Jelajahi Produk
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {liked.map((product) => {
              const url =
                product.type === "medical"
                  ? `/medical-product/${product.id}`
                  : `/medicine/${product.id}`;
              const nama = product.nama_alkes || product.nama_obat;
              const harga = product.harga_alkes || product.harga_obat;
              const gambar = product.gambar;

              return (
                <Link
                  to={url}
                  key={`${product.type}-${product.id}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition text-center block"
                >
                  <img
                    src={gambar}
                    alt={nama}
                    className="w-full h-36 object-contain mb-4 rounded-md"
                  />
                  <h3 className="text-green-700 font-semibold text-sm mb-1">
                    {nama}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    Rp{parseInt(harga).toLocaleString("id-ID")}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}