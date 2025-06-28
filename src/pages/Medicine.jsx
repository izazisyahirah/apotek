import { FaCartPlus, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; // untuk errorInfo
import { useEffect, useState } from "react";
import medicineData from "../data/medicine.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Medicine() {
  const [medicine, setMedicine] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        // Simulasi fetch dan filter data lokal
        const filtered = medicineData.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

        setMedicine(filtered);
        setError(null); // reset error jika sukses
      } catch (err) {
        setError("Gagal memuat data produk");
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(timeout);
  }, [query]);

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  const [cart, setCart] = useState([]);

  const getQuantity = (productId) => {
    const item = cart.find((c) => c.product.id === productId);
    return item ? item.quantity : 0;
  };

  //tambah produk ke keranjang
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  //kurangi jumlah
  const handleDecrease = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  //tambah jumlah
  const handleIncrease = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.details.price,
    0
  );

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

{cart.length > 0 && (
  <div className="mb-6 p-4 bg-white rounded-xl shadow border border-green-100 grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="text-sm text-gray-700 space-y-2">
      <p className="text-base font-semibold text-green-700">
        🛒 {totalItems} item di keranjang:
      </p>
      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
        {cart.map((item) => (
          <li key={item.product.id}>
            {item.product.name} — {item.quantity}x{" "}
            <span className="text-green-700">
              Rp{item.product.details.price.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-col justify-between h-full">
      <div className="text-sm text-gray-700">
        <p className="mb-2 text-base font-semibold text-green-700">💰 Total Belanja:</p>
        <p className="text-2xl font-bold text-green-800">
          {"Rp" + totalPrice.toLocaleString("id-ID")}
        </p>
      </div>
      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 transition text-white text-sm px-5 py-3 rounded-lg shadow font-semibold"
      >
        Lanjut ke Pembayaran
      </button>
    </div>
  </div>
)}


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {medicine.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onAddToCart={handleAddToCart}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
}) {
  const { id, name, details } = product;

  return (
    <div className="p-5">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={details.image}
          alt={name}
          className="w-full h-40 object-contain p-4"
        />
        <div className="px-4 pb-4">
          <h3 className="text-sm font-nunito-bold mb-1">
            <Link
              to={`/medicine/${id}`}
              className="text-green-500 hover:text-green-700"
            >
              {name}
            </Link>
          </h3>
          <p className="text-sm font-nunito-bold text-gray-500 mb-2">
            Rp{details.price.toLocaleString("id-ID")}
          </p>
          {quantity > 0 ? (
            <div className="flex justify-center items-center gap-4 mt-2">
              <button
                onClick={() => onDecrease(id)}
                className="text-yellow-600 hover:text-yellow-800 transition"
              >
                <FaMinusCircle size={20} />
              </button>
              <span className="text-sm font-semibold text-gray-700">
                {quantity}
              </span>
              <button
                onClick={() => onIncrease(id)}
                className="text-green-600 hover:text-green-800 transition"
              >
                <FaPlusCircle size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold text-sm py-2 rounded-md flex items-center justify-center gap-2 mt-2"
            >
              <FaCartPlus /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}