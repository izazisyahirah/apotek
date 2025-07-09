import { Outlet, useLocation } from "react-router-dom";
import loginImage from "../assets/medicine.png";
import logo from "../assets/logo.jpg";

export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const title = isLogin ? "Login" : "Register";

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* Kiri: Ilustrasi */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <img
          src={loginImage}
          alt="Ilustrasi Apotek"
          className="w-full max-w-[520px] max-h-[520px] object-contain"
        />
      </div>

      {/* Kanan: Form */}
      <div className="w-1/2 bg-green-800 text-white flex flex-col overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center p-12">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Logo Apotek"
              className="w-20 h-20 object-cover"
            />
          </div>
          <h2 className="text-4xl font-bold text-center mb-6">{title}</h2>
          <Outlet /> <br></br>
          <p className="text-xs text-center mb-4 text-white">
            © 2025 Apotek Keluarga. Powered by React & Supabase.
          </p>
        </div>
      </div>
    </div>
  );
}