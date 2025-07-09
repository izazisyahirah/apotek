import { Outlet, useLocation } from 'react-router-dom'
import loginImage from '../assets/medicine.png'
import logo from '../assets/logo.jpg'

export default function AuthLayout() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const title = isLogin ? 'Login' : 'Register'

  return (
    <div className="w-screen h-screen flex">
      {/* Kiri: Logo + Ilustrasi */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
        <img src={logo} alt="Logo Apotek" className="w-28 mb-6" />
        <img src={loginImage} alt="Login Illustration" className="w-3/4 max-h-[400px] object-contain" />
      </div>

      {/* Kanan: Form */}
      <div className="w-1/2 bg-[#1f3f3b] text-white flex flex-col justify-center p-12">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <Outlet />
        <p className="text-xs text-center mt-6 text-gray-400">
          © 2025 Apotek Kita. Powered by React & Supabase.
        </p>
      </div>
    </div>
  )
}