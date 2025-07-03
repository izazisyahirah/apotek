import {
  FaCartPlus,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import medicalData from "../data/medical.json";
import { Link, useNavigate } from "react-router-dom";

export default function MedicalProduct() {
  const [medical, setMedical] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [likedProducts, setLikedProducts] = useState(() => {
    const stored = localStorage.getItem("likes");
    return stored ? JSON.parse(stored) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  const navigate = useNavigate();

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
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likedProducts));
  }, [likedProducts]);

  const handleAddToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevCart, { product, quantity: qty }];
    });
  };

  const handleLikeToggle = (fullId) => {
    const updated = likedProducts.includes(fullId)
      ? likedProducts.filter((id) => id !== fullId)
      : [...likedProducts, fullId];
    setLikedProducts(updated);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedQty(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari alat kesehatan..."
            className="p-3 w-full md:max bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {error && (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 flex items-center gap-2 mb-4 shadow">
            <BsFillExclamationDiamondFill /> {error}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {medical.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLiked={likedProducts.includes(`medical-${product.id}`)}
              onAddToCart={() => openModal(product)}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg relative">
            <h2 className="text-lg font-semibold text-green-700 mb-3">
              Tambah ke Keranjang
            </h2>
            <p className="mb-2 text-sm text-gray-600">{selectedProduct.name}</p>

            <label className="block text-sm mb-1 text-gray-700">Jumlah:</label>
            <input
              type="number"
              min={1}
              value={selectedQty}
              onChange={(e) => setSelectedQty(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleAddToCart(selectedProduct, selectedQty);
                  closeModal();
                }}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product, isLiked, onAddToCart, onLikeToggle }) {
  const { id, name, details } = product;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition relative flex flex-col items-center text-center">
      <button
        onClick={() => onLikeToggle(`medical-${id}`)}
        className="absolute top-3 right-3 text-red-500 hover:scale-110 transition"
        title={isLiked ? "Hapus dari Favorit" : "Tambah ke Favorit"}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
      </button>

      <img
        src={details.image}
        alt={name}
        className="w-full h-36 object-contain mb-3 rounded"
      />
      <Link to={`/medical-product/${id}`}>
        <u><h3 className="text-green-700 font-semibold text-sm mb-1">{name}</h3></u>
      </Link>
      <p className="text-gray-500 text-sm mb-3">
        Rp{details.price.toLocaleString("id-ID")}
      </p>

      <button
        onClick={onAddToCart}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
      >
        <FaCartPlus /> Tambah ke Keranjang
      </button>
    </div>
  );
}