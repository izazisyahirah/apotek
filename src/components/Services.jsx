import {
  FaTag,
  FaTruck,
  FaUserMd,
  FaStethoscope,
} from "react-icons/fa";

export default function Services() {
  return (
    <div id="service-highlights-container">
      <div className="p-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">

        {/* Promo Hingga 25% */}
        <div className="flex flex-col justify-between bg-softgreen rounded-xl p-4 hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-2">
            <FaTag className="text-2xl" />
            <div className="text-xl font-nunito-bold leading-tight">
              Promo Hingga 25%
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Dapatkan diskon menarik untuk produk pilihan setiap minggu.
          </p>
        </div>

        {/* Pengiriman Khusus Pekanbaru */}
        <div className="flex flex-col justify-between bg-cream rounded-xl p-4 hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-2">
            <FaTruck className="text-2xl" />
            <div className="text-xl font-nunito-bold leading-tight">
              Gratis Pengiriman
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Layanan cepat & terpercaya langsung ke alamat Anda di Pekanbaru.
          </p>
        </div>

        {/* Tim Apoteker Handal */}
        <div className="flex flex-col justify-between bg-lime rounded-xl p-4 hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-2">
            <FaUserMd className="text-2xl" />
            <div className="text-xl font-nunito-bold leading-tight">
              Tim Apoteker Tersertifikasi
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Layanan obat Anda ditangani langsung oleh tenaga farmasi profesional.
          </p>
        </div>

        {/* Edukasi Kesehatan */}
        <div className="flex flex-col justify-between bg-softpurple rounded-xl p-4 hover:shadow-md transition">
          <div className="flex items-center space-x-3 mb-2">
            <FaStethoscope className="text-2xl" />
            <div className="text-xl font-nunito-bold leading-tight">
              Edukasi Kesehatan
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Temukan info penting tentang obat & tips hidup sehat setiap hari.
          </p>
        </div>

      </div>
    </div>
  );
}