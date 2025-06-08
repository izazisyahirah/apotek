import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import medicineData from "../data/medicine.json";

export default function MedicineDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        const found = medicineData.find((item) => String(item.id) === id);

        if (!found) {
          setError("Produk tidak ditemukan");
          setProduct(null);
        } else {
          setProduct(found);
          setError(null);
        }
      }, 300);

      return () => clearTimeout(timer);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data");
      setProduct(null);
    }
  }, [id]);

  if (error)
    return (
      <div className="text-red-600 p-4 max-w-lg mx-auto mt-10 mb-10">{error}</div>
    );
  if (!product)
    return (
      <div className="p-4 max-w-lg mx-auto mt-10 mb-10">Loading...</div>
    );

  const { name, details, description } = product;

  return (
    <div className="max-w-lg mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg p-6 relative">
      <img
        src={details.image}
        alt={name}
        className="rounded-xl mb-4 w-full h-48 object-contain"
      />
      <h2 className="text-2xl font-bold mb-2 text-darkgreen">{name}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Kategori:</span> {details.category}
      </p>
      <p className="text-gray-800 font-semibold text-lg">
        Harga: Rp {details.price}
      </p>
    </div>
  );
}
