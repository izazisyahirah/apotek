import { FaCartPlus } from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import medicalData from "../data/medical.json";

export default function MedicalProduct() {
  const [medical, setMedical] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const filtered = medicalData.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

        setMedical(filtered);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data produk");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  return (
    <div className="p-4">
      {errorInfo}

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari produk..."
        className="mb-4 p-3 w-full bg-white rounded-2xl shadow-lg"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {medical.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { name, details } = product;

  return (
    <div className="p-5">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={details.image}
          alt={name}
          className="w-full h-40 object-contain p-4"
        />
        <div className="px-4 pb-4">
          <h3 className="text-sm font-nunito-bold mb-1">{name}</h3>
          <p className="text-sm font-nunito-bold text-gray-500 mb-2">
            Rp{details.price}
          </p>
          <button className="w-full bg-green text-white font-nunito-bold text-sm py-1 rounded-md flex items-center justify-center gap-2 hover:bg-green-700">
            <FaCartPlus /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}