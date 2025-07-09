import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { medicalproduct } from "../services/medicalproduct";
import {
  FaArrowLeft,
  FaCartPlus,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

export default function MedicalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [product, setProduct] = useState(null);
  const [rekomendasi, setRekomendasi] = useState([]);
  const [error, setError] = useState(null);
  const [showDeskripsi, setShowDeskripsi] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loadingNavigate, setLoadingNavigate] = useState(false);
  const [cart, setCart] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);

  // Ambil email user login
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email);
    });
  }, []);

  // Ambil cart & likes berdasarkan email
  useEffect(() => {
    if (userEmail) {
      const storedCart =
        JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
      const storedLikes =
        JSON.parse(localStorage.getItem(`likes_${userEmail}`)) || [];
      setCart(storedCart);
      setLikedProducts(storedLikes);
    }
  }, [userEmail]);

  // Simpan cart & likes ke localStorage
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
      localStorage.setItem(`likes_${userEmail}`, JSON.stringify(likedProducts));
    }
  }, [cart, likedProducts, userEmail]);

  // Ambil detail & rekomendasi
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await medicalproduct.fetchMedicalProduct();
        const found = data.find((item) => String(item.id) === id);
        if (!found) {
          setError("Produk tidak ditemukan");
        } else {
          setProduct(found);
          const sameCategory = data.filter(
            (item) => item.kategori === found.kategori && item.id !== found.id
          );
          setRekomendasi(sameCategory.slice(0, 4));
        }
      } catch (err) {
        setError("Gagal mengambil data produk");
      }
    };

    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !userEmail) return;

    if (quantity <= 0) {
      setModalMessage("Jumlah produk harus lebih dari 0.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 2000);
      return;
    }

    const cartKey = `cart_${userEmail}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = storedCart.find(
      (item) => item.id === product.id && item.type === "medical"
    );

    let updatedCart;
    if (existing) {
      updatedCart = storedCart.map((item) =>
        item.id === product.id && item.type === "medical"
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...storedCart,
        { id: product.id, type: "medical", quantity: quantity },
      ];
    }

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cart-updated"));
    setModalMessage(`${quantity} item ditambahkan ke keranjang`);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const handleLikeToggle = () => {
    const fullId = `medical-${product.id}`;
    setLikedProducts((prev) =>
      prev.includes(fullId)
        ? prev.filter((id) => id !== fullId)
        : [...prev, fullId]
    );
  };

  if (error)
    return (
      <div className="text-red-600 p-4 max-w-lg mx-auto mt-10 text-center font-semibold bg-red-100 rounded-xl shadow">
        {error}
      </div>
    );

  if (!product)
    return (
      <div className="p-4 max-w-lg mx-auto mt-10 text-center text-gray-500">
        Memuat data produk...
      </div>
    );

  const { nama_alkes, harga_alkes, stok_alkes, gambar, kategori, deskripsi } =
    product;
  const isLiked = likedProducts.includes(`medical-${product.id}`);

  return (
    <>
      {/* Modal Notifikasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl px-8 py-6 w-[90%] max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✅
            </div>
            <h3 className="text-green-700 text-xl font-bold mb-2">
              Notifikasi
            </h3>
            <p className="text-gray-700 text-sm">{modalMessage}</p>
          </div>
        </div>
      )}

      {/* Loading Navigasi */}
      {loadingNavigate && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Detail Produk */}
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/medical-product")}
          className="flex items-center text-green-600 mb-6 hover:underline hover:text-green-700"
        >
          <FaArrowLeft className="mr-2" /> Kembali ke Daftar Produk
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 md:flex overflow-hidden">
          <div className="md:w-1/2 p-6 flex items-center justify-center border-r border-green-700">
            <img
              src={gambar}
              alt={nama_alkes}
              className="w-full max-w-[90%] aspect-square object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">
                {nama_alkes}
              </h1>
              <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-4">
                {kategori}
              </span>

              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="font-semibold">Stok:</span>
                  {stok_alkes > 0 ? (
                    <span>{stok_alkes}</span>
                  ) : (
                    <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-full text-xs">
                      Stok Habis
                    </span>
                  )}
                </li>
              </ul>

              <div className="text-sm text-gray-700 mb-4">
                <button
                  onClick={() => setShowDeskripsi(!showDeskripsi)}
                  className={`flex justify-between items-center w-full font-semibold px-4 py-2 rounded-lg transition ${
                    showDeskripsi
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-green-50 text-green-700 hover:bg-green-100"
                  }`}
                >
                  Deskripsi Produk
                  {showDeskripsi ? <FaChevronUp /> : <FaChevronDown />}
                </button>

                {showDeskripsi && (
                  <div className="whitespace-pre-wrap text-justify mt-3 px-2 text-gray-700">
                    {deskripsi}
                  </div>
                )}
              </div>

              <p className="text-xl font-bold text-green-700">
                Harga: Rp {parseInt(harga_alkes).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <input
                type="number"
                min={0}
                max={stok_alkes}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val <= stok_alkes) {
                    setQuantity(val);
                  } else if (val > stok_alkes) {
                    setQuantity(stok_alkes); // otomatis set ke maksimal
                  } else {
                    setQuantity(0);
                  }
                }}
                className="w-24 border border-gray-300 rounded-xl px-3 py-2 text-center font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-auto"
                disabled={stok_alkes <= 0}
              />

              <button
                onClick={handleAddToCart}
                disabled={stok_alkes <= 0}
                className={`flex-1 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm font-medium ${
                  stok_alkes <= 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {stok_alkes <= 0 ? (
                  "Stok Habis"
                ) : (
                  <>
                    <FaCartPlus /> Tambah ke Keranjang
                  </>
                )}
              </button>

              <button
                onClick={handleLikeToggle}
                className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-xl flex items-center justify-center text-red-600 text-xl shadow transition"
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>

        {/* Rekomendasi Produk */}
        {rekomendasi.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Rekomendasi Alat Sejenis
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {rekomendasi.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setLoadingNavigate(true);
                    setTimeout(() => {
                      navigate(`/medical-product/${item.id}`);
                      setLoadingNavigate(false);
                    }, 700);
                  }}
                  className="cursor-pointer bg-white p-4 rounded-2xl shadow hover:shadow-lg transition hover:scale-105 duration-300 text-center"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama_alkes}
                    className="w-full aspect-square object-contain mb-3"
                  />
                  <p className="text-green-700 font-semibold text-sm mb-1">
                    {item.nama_alkes}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">
                    Rp{parseInt(item.harga_alkes).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
