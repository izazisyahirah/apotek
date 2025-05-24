import { AiFillHome } from "react-icons/ai";
import {
  FaSearch,
  FaHeart,
  FaShoppingBag,
  FaChevronDown,
  FaPills,
  FaBriefcaseMedical,
  FaInfoCircle,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const menuClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer ${
      isActive
        ? "bg-green/10 text-green font-semibold"
        : "text-darkgray hover:text-green hover:bg-green/5"
    }`;

  // const menuClass = ({ isActive }) =>
  //   `flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer ${
  //     isActive ? "text-green font-semibold" : "text-darkgray hover:text-green"
  //   }`;

  const iconClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm rounded-lg transition-colors cursor-pointer ${
      isActive ? "text-green font-semibold" : "text-darkgray hover:text-green"
    }`;

  return (
    <header id="header-container" className="bg-white shadow-sm">
      {/* Top Bar */}
      <div
        id="top-bar"
        className="flex items-center justify-between px-6 py-4 space-x-6"
      >
        {/* Logo */}
        <div id="logo" className="flex items-center space-x-2">
          <img
            src="https://png.pngtree.com/png-vector/20230418/ourmid/pngtree-medical-logo-vector-png-image_6713322.png"
            alt="Apotek Kita"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-green">Apotek</span>
          <span className="text-sm font-semibold text-darkgray">Kita</span>
        </div>

        {/* Search Bar */}
        <div id="search-bar" className="flex flex-1 max-w-3xl mx-6">
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
        <div
          id="icons"
          className="flex items-center space-x-6 text-darkgray text-xl"
        >
          <FaHeart className="cursor-pointer" />
          <NavLink id="about" to="/about" className={iconClass}>
            <FaInfoCircle className="cursor-pointer" />
          </NavLink>
          <FaShoppingBag className="cursor-pointer" />
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src="https://i.pinimg.com/474x/b2/08/eb/b208eb2516ff294adef797df39010e94.jpg"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <FaChevronDown className="text-sm" />
          </div>
        </div>
      </div>

      {/* Bottom Nav Links */}
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm px-4 pb-3 md:px-8">
        <NavLink id="home" to="/" className={menuClass}>
          <AiFillHome className="text-lg" />
          <span>Home</span>
        </NavLink>
        <NavLink id="medicine" to="/medicine" className={menuClass}>
          <FaPills className="text-lg" />
          <span>Medicine</span>
        </NavLink>
        <NavLink
          id="medical-product"
          to="/medical-product"
          className={menuClass}
        >
          <FaBriefcaseMedical className="text-lg" />
          <span>Medical Product</span>
        </NavLink>
      </nav>
    </header>
  );
}
