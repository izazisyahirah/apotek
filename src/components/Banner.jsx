export default function Banner() {
  return (
    <div id="promo-banner-container">
        <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between bg-gradient-to-r from-green-100 to-white p-8 rounded-lg shadow-md">
        {/* Left Text Side */}
        <div className="lg:w-1/2 space-y-4 text-center lg:text-left">
          <p className="text-sm font-nunito-bold text-darkgreen uppercase tracking-wider">
            Promo Spesial Bulan Ini
          </p>
          <h2 className="text-3xl lg:text-4xl font-nunito-extrabold text-gray-900 leading-snug">
            Dapatkan Diskon Hingga{" "}
            <span className="text-green-600">25%</span> Untuk Produk Kesehatan Pilihan!
          </h2>
          <p className="text-gray-700 text-sm font-poppins-regular">
            Belanja obat & alat kesehatan lebih hemat hanya di Apotek Kita.
            Nikmati <strong>gratis ongkir</strong>, <strong>jaminan keaslian</strong>, dan
            <strong> pengiriman cepat khusus wilayah Pekanbaru</strong>.
          </p>
        </div>

        {/* Right Image Side */}
        <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/923/884/non_2x/pastel-color-medicine-pills-pills-flying-up-out-of-tablet-capsule-3d-rendering-pharmacy-concept-drugs-awareness-free-png.png"
            alt="Promo Capsule"
            className="max-w-xs lg:max-w-md"
          />
        </div>
      </div>
    </div>
    </div>
  );
}