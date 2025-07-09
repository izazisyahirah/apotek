export default function Hero() {
  return (
<section className="bg-darkgreen text-white py-10">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
      {/* Teks */}
      <div className="w-full">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito-extrabold leading-snug mb-4">
          Selamat Datang di <span className="text-green-200">Apotek Keluarga</span>!
        </h1>
        <p className="mb-6 text-gray-300 text-sm text-poppins-regular sm:text-base">
          Temukan solusi kesehatan terpercaya untuk Anda dan keluarga. Nikmati kemudahan belanja obat, alat kesehatan, dan layanan resep online hanya di satu tempat.
        </p>
        <button className="bg-white text-darkgreen font-nunito-semibold px-5 py-3 rounded-lg hover:bg-green-100 transition">
          Belanja Sekarang
        </button>
      </div>

      {/* Gambar */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-a-girl-character-clip-art-in-doctor-s-coat-png-image_11388883.png"
          alt="Dokter Apotek"
          className="w-64 sm:w-80 md:w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  </div>
</section>

  );
}
