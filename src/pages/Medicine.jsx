import { FaCartPlus } from "react-icons/fa";
import { BsFillExclamationDiamondFill } from "react-icons/bs"; // untuk errorInfo
import { useEffect, useState } from "react";
import medicineData from "../data/medicine.json";
import { Link } from "react-router-dom";

export default function Medicine() {
  const [medicine, setMedicine] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

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
        {medicine.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
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

// import { FaCartPlus } from "react-icons/fa";
// import { BsFillExclamationDiamondFill } from "react-icons/bs"; // penting untuk errorInfo
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Medicine() {
//   const [medicine, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [query, setQuery] = useState(""); //useEffect dengan dependencies state

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       axios
//         .get(`https://dummyjson.com/products/search?q=${query}`) // menerapkan search dan query param
//         .then((response) => {
//           if (response.status !== 200) {
//             setError(response.data.message);
//             return;
//           }
//           setProducts(response.data.products);
//         })
//         .catch((err) => {
//           setError(err.message || "An unknown error occurred");
//         });
//     }, 500); // 500ms debounce
//     return () => clearTimeout(timeout); // cleanup
//   }, [query]); // -> useEffect akan dipanggil ulang setiap `query` berubah

//   const errorInfo = error ? (
//     <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
//       <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
//       {error}
//     </div>
//   ) : null;

//   return (
//     <div className="p-4">
//       {errorInfo}

//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Cari produk..."
//         className="mb-4 p-3 w-full bg-white rounded-2xl shadow-lg"
//       />

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {medicine.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function ProductCard({ product }) {
//   const { title, price, thumbnail } = product;

//   return (
//     <div className="p-5">
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <img
//           src={thumbnail}
//           alt={title}
//           className="w-full h-40 object-contain p-4"
//         />
//         <div className="px-4 pb-4">
//           <h3 className="text-sm font-bold mb-1">{title}</h3>
//           <p className="text-sm font-bold text-gray-500 mb-2">Rp{price}</p>
//           <button className="w-full bg-green text-white font-bold text-sm py-1 rounded-md flex items-center justify-center gap-2 hover:bg-green-700">
//             <FaCartPlus /> Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
