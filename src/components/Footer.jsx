import { FaTiktok } from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer-container" className="bg-darkgreen text-white text-sm">
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-b border-white/20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact */}
        <div className="space-y-3">
          <h3 className="font-nunito-extrabold text-lg">Kontak Kami</h3>
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt className="mt-1" />
            <span className="font-poppins-regular">
              Jl. HR. Soebrantas No. 297 A, Panam, Pekanbaru, Riau
            </span>
          </div>
          <div className="flex items-start space-x-2">
            <FaPhoneAlt className="mt-1" />
            <span className="font-poppins-regular">+62 812 4900 3900</span>
          </div>
          <div className="flex items-start space-x-2">
            <FaEnvelope className="mt-1" />
            <span className="font-poppins-regular">
              aptkeluarga.digital@gmail.com
            </span>
          </div>
        </div>

        {/* Google Maps */}
        <div>
          <h3 className="font-nunito-extrabold text-lg mb-3">Lokasi Apotek</h3>
          <div className="rounded overflow-hidden shadow-md">
            <iframe
              title="Lokasi Apotek"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6877449467297!2d101.41063487496467!3d0.4635460995319167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a8c1a1c3b615%3A0x8b5f4e3b0c132877!2sApotek%20Keluarga!5e0!3m2!1sen!2sid!4v1752087710481!5m2!1sen!2sid"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-3">
          <h3 className="font-nunito-extrabold text-lg">Ikuti Kami</h3>
          <p className="font-poppins-regular">
            Dapatkan info promo & tips kesehatan di media sosial Apotek
            Keluarga.
          </p>
          <div className="flex space-x-4 text-white text-lg">
            <a
              href="https://www.instagram.com/apotek_keluarga?igsh=MTVyaTQ5dDMxem55aQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-gray-300" />
            </a>
            <a
              href="https://www.tiktok.com/@apotekkeluargaofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="hover:text-gray-300" />
            </a>
            <a
              href="https://youtube.com/@apotekkeluarga?si=BqZ1YxbcHsS1nwaW"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="hover:text-gray-300" />
            </a>
          </div>
          <div className="flex justify-between gap-4 pt-6">
            <a
              href="https://vetra-project.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Admin
            </a>
            <a
              href="https://apotekita-pcr.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
            >
              Guest 2
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 py-4 text-xs font-poppins-regular text-white/60">
        <span>© 2025 Apotek Keluarga. All rights reserved.</span>
      </div>
    </footer>
  );
}
