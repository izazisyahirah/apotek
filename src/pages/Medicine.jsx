import { useEffect, useState } from "react";
import { medicine } from "../services/medicine";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Semua Kategori", "Tablet", "Sirup", "Salep", "Kapsul"];

export default function Medicine() {
  const [medicineData, setMedicineData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await medicine.fetchMedicine();
        setMedicineData(data);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data dari database");
      }
    };
    fetchData();
  }, []);

  const filteredMedicine = medicineData.filter((item) => {
    const cocokNama = item.nama_obat
      .toLowerCase()
      .includes(query.toLowerCase());
    const cocokKategori =
      selectedCategory === "Semua Kategori" ||
      item.kategori.toLowerCase() === selectedCategory.toLowerCase();
    return cocokNama && cocokKategori;
  });

  return (
    <section className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
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
              placeholder="Cari nama obat atau produk..."
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
          {filteredMedicine.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/medicine/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onClick }) {
  const { nama_obat, gambar, harga_obat } = product;

  return (
    <div
      onClick={onClick}
      className={`relative bg-white group p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-md  hover:bg-emerald-50 hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center`}
    >
      <img
        src={gambar}
        alt={nama_obat}
        className="w-full h-36 object-contain mb-3 rounded"
      />
      <h3 className="text-green-700 font-semibold text-sm mb-1">{nama_obat}</h3>
      <p className="text-gray-500 text-sm">
        Rp{parseInt(harga_obat).toLocaleString("id-ID")}
      </p>
    </div>
  );
}
