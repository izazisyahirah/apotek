import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div id="logo" className="flex items-center space-x-2">
            <img
              src="https://png.pngtree.com/png-vector/20230418/ourmid/pngtree-medical-logo-vector-png-image_6713322.png"
              alt="Apotek Kita"
              className="w-15 h-15"
            />
          </div>
        </div>
        <Outlet />
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 Apotek Kita Guest Page. All rights reserved.
        </p>
      </div>
    </div>
  );
}
