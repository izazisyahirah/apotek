import { FaCartPlus } from "react-icons/fa";

export default function Products() {
  return (
    <div>
      <NewProducts/>
    </div>
  );
}

function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain p-4"
      />
      <div className="px-4 pb-4">
        <h3 className="text-sm font-nunito-bold mb-1">{name}</h3>
        <p className="text-sm font-nunito-bold text-gray-500 mb-2">Rp{price}</p>
        <button className="w-full bg-green text-white font-nunito-bold text-sm py-1 rounded-md flex items-center justify-center gap-2 hover:bg-green-700">
          <FaCartPlus /> Add to Cart
        </button>
      </div>
    </div>
  );
}

function Section({ title, products }) {
  return (
    <section className="px-10 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-nunito-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
}

export function NewProducts() {
  const products = [
    { name: "Nebulizer", price: 12.5, image: "https://mamasewa.com/wp-content/uploads/2023/03/289.png" },
    { name: "Thermometer", price: 8.98, image: "https://m.media-amazon.com/images/I/51t+OH8SucL.jpg" },
    { name: "Non-Rebreather Mask", price: 3.32, image: "https://cdn11.bigcommerce.com/s-xe1mvjh/images/stencil/1280x1280/products/2261/6067/inrbe__new__48350.1702391634.jpg?c=2" },
    { name: "Wound Dressing", price: 24.78, image: "https://shop.stjohn.org.au/cdn/shop/products/2091_wound_dressing__n15_1320x1320_10f752fd-2a6d-4720-b925-01c5246f0e91.jpg?v=1681973536" },
  ];
  return <Section title="New Products" products={products} />;
}

export function TopProducts() {
  const products = [
    { name: "Hospital Bed", price: 109.89, image: "https://autodoc.id/images/stories/virtuemart/product/indofarma-sm-1117-iii.jpg" },
    { name: "Walker Mobility", price: 12.80, image: "https://images.squarespace-cdn.com/content/v1/524f0efae4b04a769202bd72/1591115812242-H0PELLQ69ESCWUVQ6D6G/6291-5F_400_A.jpg?format=1000w" },
    { name: "Wheelchair", price: 30.00, image: "https://images-cdn.ubuy.co.id/666793d954243f2a95294c04-medline-comfortable-folding-wheelchair.jpg" },
    { name: "Crutches", price: 24.78, image: "https://www.shhc.com.au/assets/thumbL/P-12174.jpg?20200714030823" },
  ];
  return <Section title="Top Products" products={products} />;
}