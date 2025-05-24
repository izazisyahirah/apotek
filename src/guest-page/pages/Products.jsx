import { FaCartPlus } from "react-icons/fa";

export default function Products() {
  return (
    <div>
      <NewProducts/>
      <PopularProducts/>
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
        <a href="#" className="text-green text-sm font-nunito-bold hover:underline">
          View All →
        </a>
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

export function PopularProducts() {
  const products = [
    { name: "Oxygen Mask", price: 2.00, image: "https://cdn1.npcdn.net/images/bc1ee138cbf249373d54f22e9ffae7e5_1718523124.webp?md5id=d855ef37fb3c07f657a489eab125fc3e&new_width=1000&new_height=1000&size=max&w=1722417391&from=png" },
    { name: "Surgical Gloves", price: 1.99, image: "https://d2qjkwm11akmwu.cloudfront.net/products/33824_23-5-2019_9-29-12-1665790211.webp" },
    { name: "Medical Mask", price: 0.89, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCamBIhA7JX5cRO7d5dwuy3ARTV_GOI4iE8w&s" },
    { name: "Hand Sanitizer", price: 4.00, image: "https://solvent-production.s3.amazonaws.com/media/images/products/2021/07/DSC_1851_copy_ufEMZ2B.jpg" },
  ];
  return <Section title="Popular Products" products={products} />;
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

export function MedicalProducts() {
  const products = [
    { name: "Sphygmomanometer", price: 15.09, image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2020/7/11/4939b19d-563a-430d-946d-e86ecd460db7.jpg" },
    { name: "Digital Stethoscope", price: 29.99, image: "https://mediworld.co.uk/cdn/shop/files/112.webp?v=1704721420" },
    { name: "Glucometer", price: 12.08, image: "https://static.wixstatic.com/media/2e6930_a6171f6918b1488b91367bcc05691b4f~mv2.jpg/v1/fill/w_568,h_568,al_c,lg_1,q_80,enc_avif,quality_auto/2e6930_a6171f6918b1488b91367bcc05691b4f~mv2.jpg" },
    { name: "Pulse Oximeter", price: 30.00, image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//94/MTA-23069127/brd-44261_fingertip-pulse-oximeter-tft-display-blood-oxygen-oxymeter-measurement_full01.jpg" },
  ];
  return <Section title="Medical Products" products={products} />;
}

export function UpcomingProducts() {
  const products = [
    { name: "Wound Dressing", price: 5.78, image: "https://shop.stjohn.org.au/cdn/shop/products/2091_wound_dressing__n15_1320x1320_10f752fd-2a6d-4720-b925-01c5246f0e91.jpg?v=1681973536" },
    { name: "IV Catheter", price: 2.00, image: "https://www.safelockmedical.com/assets/img-zoom/iv%20catheter%20zoom.jpg" },
    { name: "Blood Pressure Cuff", price: 24.78, image: "https://images-cdn.ubuy.co.id/6385300f954114400e279063-paramed-blood-pressure-monitor-bp.jpg" },
    { name: "Chest Tube", price: 58.56, image: "https://gbukgroup.com/eurow/wp-content/uploads/sites/2/2023/12/GBUK-Chest-Drainage-System.jpg" },
  ];
  return <Section title="Upcoming Products" products={products} />;
}