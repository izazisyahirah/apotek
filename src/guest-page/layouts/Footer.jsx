import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer id="footer-container" className="bg-darkgreen text-white text-sm">
            <div className="p-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 border-b border-white/20">

                {/* Contact */}
                <div className="space-y-3">
                    <h3 className="font-nunito-extrabold text-lg">Contact</h3>
                    <div className="flex items-start font-poppins-regular space-x-2">
                        <FaMapMarkerAlt className="mt-1" />
                        <span>123 Road, Pekanbaru, Indonesia</span>
                    </div>
                    <div className="flex items-start font-poppins-regular space-x-2">
                        <FaPhoneAlt className="mt-1" />
                        <span>+628123456789</span>
                    </div>
                    <div className="flex items-start font-poppins-regular space-x-2">
                        <FaEnvelope className="mt-1" />
                        <span>apotekkita@gmail.com</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                    <h3 className="font-nunito-extrabold text-lg">Quick Links</h3>
                    <ul className="font-poppins-regular space-y-1">
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Careers</li>
                        <li>Contact</li>
                    </ul>
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                    <h3 className="font-nunito-extrabold text-lg">Specialties</h3>
                    <ul className="font-poppins-regular space-y-1">
                        <li>Anesthesiology</li>
                        <li>Psychiatry</li>
                        <li>General surgery</li>
                        <li>Family medicine</li>
                        <li>Pediatrics</li>
                    </ul>
                </div>

                {/* Services */}
                <div className="space-y-2">
                    <h3 className="font-nunito-extrabold text-lg">Services</h3>
                    <ul className="font-poppins-regular space-y-1">
                        <li>Medical</li>
                        <li>Operation</li>
                        <li>Laboratory</li>
                        <li>ICU</li>
                        <li>Patient Ward</li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="space-y-2">
                    <h3 className="font-nunito-extrabold text-lg">Social Media</h3>
                    <div className="flex space-x-4 text-white text-lg">
                        <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
                        <FaLinkedinIn className="hover:text-gray-300 cursor-pointer" />
                        <FaInstagram className="hover:text-gray-300 cursor-pointer" />
                        <FaYoutube className="hover:text-gray-300 cursor-pointer" />
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center px-8 py-4 text-xs font-poppins-regular text-white/60">
                <span>© 2025 APOTEK KITA. All rights reserved.</span>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-white">Terms and Conditions</a>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}
