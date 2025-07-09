import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Link } from "react-router-dom";

export default function LikedProducts() {
  const [userEmail, setUserEmail] = useState("");
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email);
    });
  }, []);

  useEffect(() => {
    const fetchLiked = async () => {
      if (!userEmail) return;

      const likedIds =
        JSON.parse(localStorage.getItem(`likes_${userEmail}`)) || [];
      const medicineIds = likedIds
        .filter((id) => id.startsWith("medicine-"))
        .map((id) => id.replace("medicine-", ""));
      const medicalIds = likedIds
        .filter((id) => id.startsWith("medical-"))
        .map((id) => id.replace("medical-", ""));

      const [{ data: obat }, { data: alkes }] = await Promise.all([
        supabase.from("daftar_obat").select("*").in("id", medicineIds),
        supabase.from("alat_kesehatan").select("*").in("id", medicalIds),
      ]);

      const result = [
        ...(obat || []).map((item) => ({ ...item, type: "medicine" })),
        ...(alkes || []).map((item) => ({ ...item, type: "medical" })),
      ];
      setLiked(result);
    };

    fetchLiked();
  }, [userEmail]);

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
          Produk yang Kamu Sukai
        </h1>

        {liked.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-xl shadow-md text-gray-600">
            <p className="text-lg mb-6">Belum ada produk yang kamu sukai.</p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <Link
                to="/medicine"
                className="text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-full shadow transition text-sm font-medium"
              >
                Jelajahi Obat
              </Link>
              <Link
                to="/medical-product"
                className="text-center bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-full shadow transition text-sm font-medium"
              >
                Jelajahi Alat Kesehatan
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {liked.map((product) => {
              const url =
                product.type === "medical"
                  ? `/medical-product/${product.id}`
                  : `/medicine/${product.id}`;

              return (
                <Link
                  to={url}
                  key={`${product.type}-${product.id}`}
                  className="relative bg-white group p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-md hover:bg-emerald-50 hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center"
                >
                  <img
                    src={product.gambar}
                    alt={product.nama}
                    className="w-full h-36 object-contain mb-4 rounded-md"
                  />
                  <h3 className="text-green-700 font-semibold text-sm mb-1">
                    {product.nama_obat || product.nama_alkes}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    Rp
                    {parseInt(
                      product.harga_obat || product.harga_alkes
                    ).toLocaleString("id-ID")}
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
