import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState(null);

  // Ambil cart berdasarkan email user
  useEffect(() => {
    const fetchCart = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.email) return;

      const email = user.email;
      setUserEmail(email);

      const cartKey = `cart_${email}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const medicineIds = storedCart
        .filter(item => item.type === "medicine")
        .map(item => item.id);
      const medicalIds = storedCart
        .filter(item => item.type === "medical")
        .map(item => item.id);

      const [{ data: medicines }, { data: medicals }] = await Promise.all([
        supabase.from("daftar_obat").select("*").in("id", medicineIds),
        supabase.from("alat_kesehatan").select("*").in("id", medicalIds),
      ]);

      const updatedCart = storedCart.map((item) => {
        const data = item.type === "medicine"
          ? medicines.find(p => p.id === item.id)
          : medicals.find(p => p.id === item.id);

        if (!data) return null;

        return {
          ...item,
          product: {
            id: item.id,
            name: data.nama_obat || data.nama_alkes,
            details: {
              price: data.harga_obat || data.harga_alkes,
              image: data.gambar,
            },
          }
        };
      }).filter(Boolean);

      setCart(updatedCart);
    };

    fetchCart();
  }, []);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(
        `cart_${userEmail}`,
        JSON.stringify(cart.map(item => ({
          id: item.product.id,
          type: item.type,
          quantity: item.quantity
        })))
      );
      window.dispatchEvent(new Event("cart-updated")); // 👈 update jumlah di navbar
    }
  }, [cart, userEmail]);

  const handleIncrease = (productId) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      window.dispatchEvent(new Event("cart-updated")); //update navbar
      return updated;
    });
  };

  const handleDecrease = (productId) => {
    setCart(prev => {
      const updated = prev
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);
      window.dispatchEvent(new Event("cart-updated")); //update navbar
      return updated;
    });
  };

  const handleRemove = (productId) => {
    setCart(prev => {
      const updated = prev.filter(item => item.product.id !== productId);
      window.dispatchEvent(new Event("cart-updated")); //update navbar
      return updated;
    });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.details.price,
    0
  );

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-10">
          Keranjang Belanja
        </h1>

        {cart.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl shadow-md">
            <p className="text-gray-600 mb-4 text-lg">
              Belum ada produk di keranjang.
            </p>
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
          <>
            <div className="space-y-6">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white p-4 md:p-5 rounded-xl shadow flex items-center gap-4 hover:shadow-lg transition"
                >
                  <img
                    src={product.details.image}
                    alt={product.name}
                    className="w-24 h-24 object-contain rounded-md border"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Rp{product.details.price.toLocaleString("id-ID")} / pcs
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => handleDecrease(product.id)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-2 py-1 rounded"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="font-semibold text-gray-700">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(product.id)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-1 rounded"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-700">
                      Rp{(quantity * product.details.price).toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="mt-2 text-red-500 hover:text-red-700 transition text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-lg font-semibold text-gray-700">
                  Total Belanja:
                  <span className="text-green-700 text-2xl ml-2">
                    Rp{totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full shadow transition text-base font-semibold"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}