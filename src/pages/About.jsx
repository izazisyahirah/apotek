import { FiPackage, FiUsers } from "react-icons/fi";
import { MdHealthAndSafety, MdOutlineSupportAgent } from "react-icons/md";
import { BsCapsule, BsClockHistory } from "react-icons/bs";
import Quotes from "../pages/Quotes";

export default function About() {
  return (
    <div id="about-page" className="p-6 md:p-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">
          Tentang Kami
        </h2>
        <p className="text-center text-gray-600 text-sm font-poppins-regular max-w-xl mx-auto mb-10">
          Apotek kami menyediakan obat-obatan dan alat kesehatan berkualitas
          tinggi dengan pelayanan profesional yang ramah, cepat, dan terpercaya.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Gambar */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://i.pinimg.com/736x/af/a2/0c/afa20cd0c42db8f9781a82d332f1eb6b.jpg"
              alt="Apotek Kami"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <h3 className="text-2xl font-nunito-bold text-darkgreen">
              Apotek Modern & Layanan Unggul
            </h3>
            <p className="text-gray-700 text-sm font-poppins-regular leading-relaxed">
              Dengan pengalaman bertahun-tahun, kami hadir sebagai solusi
              kesehatan terpercaya. Kami selalu memastikan bahwa setiap produk
              yang kami jual telah terverifikasi dan aman untuk digunakan.
            </p>

            {/* Fitur layanan */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <BsCapsule size={20} className="text-green-600" />,
                  label: "Obat Resep & Non-Resep",
                },
                {
                  icon: <FiPackage size={20} className="text-green-600" />,
                  label: "Alat Medis Lengkap",
                },
                {
                  icon: (
                    <MdOutlineSupportAgent
                      size={20}
                      className="text-green-600"
                    />
                  ),
                  label: "Apoteker Tersertifikasi",
                },
                {
                  icon: <BsClockHistory size={20} className="text-green-600" />,
                  label: "Pengiriman Cepat",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm"
                >
                  {item.icon}
                  <span className="text-sm font-poppins-regular text-gray-700">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=6281249003900"
              target="_blank"
              rel="noopener noreferrer"
              className="font-poppins-regular bg-green hover:bg-darkgreen text-white text-sm px-6 py-2 rounded transition-all duration-200 inline-block"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        {/* Keunggulan */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8 grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: (
                <FiUsers size={36} className="mx-auto text-green-600 mb-2" />
              ),
              title: "Tim Profesional",
              desc: "Apoteker dan staf ahli siap memberikan edukasi & konsultasi.",
            },
            {
              icon: (
                <MdHealthAndSafety
                  size={36}
                  className="mx-auto text-green-600 mb-2"
                />
              ),
              title: "Produk Aman & Terverifikasi",
              desc: "Obat & alat kesehatan resmi BPOM dan standar WHO.",
            },
            {
              icon: (
                <BsCapsule size={36} className="mx-auto text-green-600 mb-2" />
              ),
              title: "1000+ Produk",
              desc: "Beragam kategori untuk kebutuhan harian hingga khusus.",
            },
          ].map((item, index) => (
            <div key={index} className="space-y-2">
              {item.icon}
              <h4 className="text-xl font-nunito-bold text-darkgreen">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 font-poppins-regular">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Quotes */}
      <Quotes />
    </div>
  );
}
