import { useState } from "react";
import dataProduct from "./product.json";

export default function ProductList() {
  /** Deklarasi State **/
  const [dataForm, setDataForm] = useState({
    searchName: "",
    selectedCategory: "",
    selectedTag: "",
  });

  /** Deklarasi State untuk Pagination **/
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
    setCurrentPage(1); // Reset halaman saat filter berubah
  };

  /** Deklarasi Logic Search & Filter **/
  const searchKeyword = dataForm.searchName.toLowerCase();
  const filteredProducts = dataProduct.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchKeyword) ||
      item.description.toLowerCase().includes(searchKeyword);

    const matchesCategory = dataForm.selectedCategory
      ? item.details.category.includes(dataForm.selectedCategory)
      : true;

    const matchesTag = dataForm.selectedTag
      ? item.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesCategory && matchesTag;
  });

  /** Logic Pagination **/
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /** Deklarasi pengambilan unique categories dan tags di dataProduct **/
  const allCategories = [...new Set(dataProduct.map(item => item.details.category))];
  const allTags = [...new Set(dataProduct.flatMap((item) => item.tags))];

  /** Pengaturan Halaman **/
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Produk Apotek Kita
      </h1>

      {/* Filter Section */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="text"
          name="searchName"
          placeholder="Cari nama produk..."
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-7">
        <select
          name="selectedCategory"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        >
          <option value="">Semua Kategori</option>
          {allCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          name="selectedTag"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        >
          <option value="">Semua Tag</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-2 gap-4">
        {paginatedProducts.map((item) => (
          <div
            key={item.id}
            className="flex flex-col border rounded-2xl p-4 shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={item.details.image}
              alt={item.name}
              className="w-full h-40 object-contain mb-3"
            />
            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{item.description}</p>
            <p className="text-sm text-gray-600">
              Kategori: {item.details.category}
            </p>
            <p className="text-md font-bold text-blue-700 mb-2">
              Rp{item.details.price}
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-auto bg-blue-600 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-lg transition">
              Beli
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
          >
            ⬅ Sebelumnya
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === pageNum
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-sm rounded disabled:opacity-50"
          >
            Berikutnya ➡
          </button>
        </div>
      )}
    </div>
  );
}
