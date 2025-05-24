import { FaCartPlus } from "react-icons/fa";
import medical from "../assets/medical.json";

export default function MedicalProduct() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {medical.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
}

function ProductCard({ name, details }) {
    return (
      <div className="p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={details.image}
          alt={name}
          className="w-full h-40 object-contain p-4"
        />
        <div className="px-4 pb-4">
          <h3 className="text-sm font-nunito-bold mb-1">{name}</h3>
          <p className="text-sm font-nunito-bold text-gray-500 mb-2">Rp{details.price}</p>
          <button className="w-full bg-green text-white font-nunito-bold text-sm py-1 rounded-md flex items-center justify-center gap-2 hover:bg-green-700">
            <FaCartPlus /> Add to Cart
          </button>
        </div>
      </div>
      </div>
    );
  }
  