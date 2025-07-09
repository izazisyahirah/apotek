import { useEffect, useState } from "react";
import { medicalproduct } from "../services/medicalproduct";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

const CATEGORIES = ["Semua Kategori", "Alat Ukur", "Alat Bantu", "Perawatan"];

export default function MedicalProduct() {
  const [medicalData, setMedicalData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await medicalproduct.fetchMedicalProduct();
        setMedicalData(data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data dari database");
      }
    };

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    fetchUser();
    fetchData();
  }, []);

  const filteredMedical = medicalData.filter((item) => {
    const cocokNama = item.nama_alkes
      ?.toLowerCase()
      .includes(query.toLowerCase());
    const cocokKategori =
      selectedCategory === "Semua Kategori" ||
      item.kategori?.toLowerCase() === selectedCategory.toLowerCase();
    return cocokNama && cocokKategori;
  });

  const handleProductClick = (id) => {
    if (user) {
      navigate(`/medical-product/${id}`);
    } else {
      setModalMessage("Silakan login terlebih dahulu untuk melihat detail produk.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <section className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl border border-green-600 overflow-hidden flex flex-col md:flex-row items-stretch">
            {/* Dropdown kategori */}
            <div className="relative w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-green-50 text-green-800 text-sm px-5 py-3 border-none w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium h-full"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none text-green-600">
                <FaChevronDown />
              </div>
            </div>

            {/* Input search */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari alat kesehatan..."
              className="flex-1 px-5 py-3 text-sm text-gray-700 bg-white border-t md:border-t-0 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Tombol Search */}
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-5 flex items-center justify-center transition"
              title="Cari"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 flex items-center gap-2 mb-6 shadow-md">
            <BsFillExclamationDiamondFill /> {error}
          </div>
        )}

        {/* Produk */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredMedical.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal Notifikasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl px-8 py-6 w-[90%] max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✅
            </div>
            <h3 className="text-green-700 text-xl font-bold mb-2">Notifikasi</h3>
            <p className="text-gray-700 text-sm">{modalMessage}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function ProductCard({ product, onClick }) {
  const { nama_alkes, gambar, harga_alkes } = product;

  return (
    <div
      onClick={onClick}
      className="relative bg-white group p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-md hover:bg-emerald-50 hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center"
    >
      <img
        src={gambar}
        alt={nama_alkes}
        className="w-full h-36 object-contain mb-3 rounded"
      />
      <h3 className="text-green-700 font-semibold text-sm mb-1">{nama_alkes}</h3>
      <p className="text-gray-500 text-sm">
        Rp{parseInt(harga_alkes).toLocaleString("id-ID")}
      </p>
    </div>
  );
}
