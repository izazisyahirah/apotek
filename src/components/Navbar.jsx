import { BsPatchQuestionFill, BsSuitHeartFill } from "react-icons/bs";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsHandbagFill } from "react-icons/bs";
import { FaNotesMedical } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdRateReview } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import {
  FaSearch,
  FaChevronDown,
  FaPills,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiArticleFill } from "react-icons/ri";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // contoh logout: bisa tambahkan fungsi logout dari auth
    console.log("Logging out...");
    // redirect ke login (jika pakai auth)
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer ${
      isActive
        ? "bg-green/10 text-green font-semibold"
        : "text-darkgray hover:text-green hover:bg-green/5"
    }`;

  const iconClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm rounded-lg transition-colors cursor-pointer ${
      isActive ? "text-green font-semibold" : "text-darkgray hover:text-green"
    }`;

  //badge cart
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = stored.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    const interval = setInterval(updateCartCount, 1000); // realtime update
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="header-container" className="bg-white shadow-sm relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 space-x-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://png.pngtree.com/png-vector/20230418/ourmid/pngtree-medical-logo-vector-png-image_6713322.png"
            alt="Apotek Kita"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-green">Apotek</span>
          <span className="text-sm font-semibold text-darkgray">Kita</span>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-3xl mx-6">
          <div className="inline-flex items-center bg-gray-100 rounded-l-lg px-4 py-2 border border-gray-300 whitespace-nowrap">
            <span className="text-poppins-regular text-sm text-darkgray">
              All Categories
            </span>
            <FaChevronDown className="ml-2 text-xs text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search medicine, medical products"
            className="text-poppins-regular text-sm w-full px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-green hover:bg-darkgreen text-white px-4 rounded-r-lg">
            <FaSearch />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-darkgray text-xl relative">
          <NavLink to="/likes" className={iconClass}>
            <BsSuitHeartFill />
          </NavLink>

          <NavLink to="/about" className={iconClass}>
            <BsFillInfoCircleFill className="cursor-pointer" />
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => `relative text-xl ${iconClass({ isActive })}`}>
            <BsHandbagFill className="cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img
                src="https://i.pinimg.com/474x/b2/08/eb/b208eb2516ff294adef797df39010e94.jpg"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <FaChevronDown className="text-sm" />
            </div>

            {showDropdown && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 text-sm">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav Links */}
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm px-4 pb-3 md:px-8">
        <NavLink to="/" className={menuClass}>
          <AiFillHome className="text-lg" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/medicine" className={menuClass}>
          <FaPills className="text-lg" />
          <span>Medicine</span>
        </NavLink>
        <NavLink to="/medical-product" className={menuClass}>
          <FaBriefcaseMedical className="text-lg" />
          <span>Medical Product</span>
        </NavLink>
        <NavLink to="/obat-resep" className={menuClass}>
          <FaNotesMedical className="text-lg" />
          <span>Obat Resep</span>
        </NavLink>
        <NavLink to="/artikel" className={menuClass}>
          <RiArticleFill className="text-lg" />
          <span>Artikel</span>
        </NavLink>
        <NavLink to="/FAQ" className={menuClass}>
          <BsPatchQuestionFill className="text-lg" />
          <span>FAQ</span>
        </NavLink>
        <NavLink to="/review" className={menuClass}>
          <MdRateReview className="text-lg" />
          <span>Review</span>
        </NavLink>
      </nav>
    </header>
  );
}