import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import medicineData from "../data/medicine.json";
import medicalData from "../data/medical.json";

export default function LikedProducts() {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const likedIds = JSON.parse(localStorage.getItem("likes")) || [];

    const likedItems = likedIds
      .map((fullId) => {
        const [category, id] = fullId.split("-");
        const source = category === "medicine" ? medicineData : medicalData;
        return source.find((item) => String(item.id) === id);
      })
      .filter(Boolean); // hilangkan null jika tidak ditemukan

    setLiked(likedItems);
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
              const isMedical = medicalData.some((m) => m.id === product.id);
              const detailUrl = isMedical
                ? `/medical-product/${product.id}`
                : `/medicine/${product.id}`;

              return (
                <Link
                  to={detailUrl}
                  key={`${isMedical ? "medical" : "medicine"}-${product.id}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition text-center block"
                >
                  <img
                    src={product.details.image}
                    alt={product.name}
                    className="w-full h-36 object-contain mb-4 rounded-md"
                  />
                  <h3 className="text-green-700 font-semibold text-sm mb-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    Rp{product.details.price.toLocaleString("id-ID")}
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