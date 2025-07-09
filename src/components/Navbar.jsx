import {
  BsPatchQuestionFill,
  BsSuitHeartFill,
  BsFillInfoCircleFill,
  BsHandbagFill,
  BsSuitHeart,
  BsInfoCircle,
  BsHandbag,
} from "react-icons/bs";
import {
  FaNotesMedical,
  FaChevronDown,
  FaPills,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import defaultAvatar from "../assets/avatar-default.png";
import logo from "../assets/logoo.png";
import slogan from "../assets/slogan.png";
import { getPelangganById } from "../services/pelanggan";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Ambil data user dan avatar
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user;
      setUser(currentUser);

      if (currentUser) {
        const { data: pelanggan } = await getPelangganById(currentUser.id);
        setAvatarUrl(pelanggan?.foto_profil || defaultAvatar);
      } else {
        setAvatarUrl(defaultAvatar);
      }
    };

    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Perbarui jumlah keranjang berdasarkan email user login
  useEffect(() => {
    const updateCartCount = () => {
      if (!user?.email) {
        setCartCount(0);
        return;
      }

      const stored =
        JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      const totalItems = stored.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    // Dengarkan event custom dari halaman lain saat cart diperbarui
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, [user]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowDropdown(false);
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm px-3 py-1.5 rounded transition-all duration-150 ${
      isActive
        ? "bg-green/10 text-green font-semibold"
        : "text-darkgray hover:text-green hover:bg-green/5"
    }`;

  const iconClass = ({ isActive }) =>
    `flex items-center text-xl transition-colors ${
      isActive ? "text-green" : "text-darkgray hover:text-green"
    }`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-4 lg:px-8 py-3 w-full">
          {/* Logo */}
          <div className="flex items-center gap-4 w-[240px]">
            <img
              src={logo}
              alt="Logo Apotek"
              className="w-10 h-10 object-cover"
            />
            <img
              src={slogan}
              alt="Slogan Apotek"
              className="h-12 object-contain"
            />
          </div>

          {/* Menu Navigasi */}
          <div className="flex flex-col items-center gap-1 gap-x-4 gap-y-2 text-sm px-4 pb-3 md:px-8">
            <div className="flex gap-2 flex-wrap justify-center">
              <NavLink to="/" className={menuClass}>
                <AiFillHome className="text-base" />
                Home
              </NavLink>
              <NavLink to="/medicine" className={menuClass}>
                <FaPills className="text-base" />
                Medicine
              </NavLink>
              <NavLink to="/medical-product" className={menuClass}>
                <FaBriefcaseMedical className="text-base" />
                Medical Product
              </NavLink>
              <NavLink to="/obat-resep" className={menuClass}>
                <FaNotesMedical className="text-base" />
                Obat Resep
              </NavLink>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <NavLink to="/artikel" className={menuClass}>
                <RiArticleFill className="text-base" />
                Artikel
              </NavLink>
              <NavLink to="/FAQ" className={menuClass}>
                <BsPatchQuestionFill className="text-base" />
                FAQ
              </NavLink>
              <NavLink to="/review" className={menuClass}>
                <MdRateReview className="text-base" />
                Review
              </NavLink>
            </div>
          </div>

          {/* Kanan: Ikon dan Auth */}
          <div className="flex items-center gap-4">
          <div className="w-[150px] flex items-center justify-end gap-6">
            <NavLink
              to="/likes"
              className={iconClass({
                isActive: location.pathname === "/likes",
              })}
            >
              {location.pathname === "/likes" ? (
                <BsSuitHeartFill />
              ) : (
                <BsSuitHeart />
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={iconClass({
                isActive: location.pathname === "/about",
              })}
            >
              {location.pathname === "/about" ? (
                <BsFillInfoCircleFill />
              ) : (
                <BsInfoCircle />
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={`relative ${iconClass({
                isActive: location.pathname === "/cart",
              })}`}
            >
              {location.pathname === "/cart" ? (
                <BsHandbagFill />
              ) : (
                <BsHandbag />
              )}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
          
          {user ? (
            <div className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <img
                  src={avatarUrl}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border"
                />
                {}
                <FaChevronDown className="text-sm" />
              </div>
              {showDropdown && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 text-sm">
                  <li>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
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
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="text-sm font-medium text-green border border-green rounded-full px-4 py-1 hover:bg-green hover:text-white transition-all"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-sm bg-green text-white px-4 py-1.5 rounded-full hover:bg-darkgreen transition-all"
              >
                Register
              </NavLink>
            </div>
          )}
          </div>
        </div>
      </div>
    </header>
  );
}
