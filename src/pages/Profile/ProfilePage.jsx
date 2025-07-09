import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import RiwayatPembelian from "./RiwayatPembelian";
import RiwayatResep from "./RiwayatResep";
import Member from "./Member";
import { getPelangganById } from "../../services/pelanggan";
import { supabase } from "../../services/supabase";

export default function ProfilePage() {
  const [activeMenu, setActiveMenu] = useState("profil");
  const [userProfile, setUserProfile] = useState(null);

  const loadProfile = async () => {
    const { data } = await supabase.auth.getUser();
    const userId = data?.user?.id;
    if (!userId) return;

    const { data: profile } = await getPelangganById(userId);
    setUserProfile(profile);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const total = userProfile?.total_pembelian || 0;
  const transaksi = userProfile?.jumlah_transaksi || 0;

  const getMembership = () => {
    if (total >= 5000000 || transaksi >= 20) return "Platinum";
    if (total >= 2000000 || transaksi >= 10) return "Gold";
    if (total >= 500000 || transaksi >= 5) return "Silver";
    return "Bronze";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg px-6 py-8">
        {userProfile && (
          <div className="text-center">
            <img
              src={userProfile.foto_profil || "/default-avatar.png"}
              alt="Foto Profil"
              className="w-24 h-24 mx-auto rounded-full object-cover border"
            />
            <h2 className="mt-4 font-bold text-lg">
              {userProfile.nama || "Pengguna"}
            </h2>
            <p className="text-sm text-gray-500">
              Membership:{" "}
              <span className="font-semibold text-emerald-600">
                {getMembership()}
              </span>
            </p>
          </div>
        )}

        {/* Menu */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => setActiveMenu("member")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
              activeMenu === "member"
                ? "bg-emerald-600 text-white"
                : "hover:bg-emerald-100 text-gray-700"
            }`}
          >
            Member
          </button>
          <button
            onClick={() => setActiveMenu("profil")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
              activeMenu === "profil"
                ? "bg-emerald-600 text-white"
                : "hover:bg-emerald-100 text-gray-700"
            }`}
          >
            Update Data Diri
          </button>
          <button
            onClick={() => setActiveMenu("riwayat")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
              activeMenu === "riwayat"
                ? "bg-emerald-600 text-white"
                : "hover:bg-emerald-100 text-gray-700"
            }`}
          >
            Riwayat Pembelian
          </button>
          <button
            onClick={() => setActiveMenu("resep")}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
              activeMenu === "resep"
                ? "bg-emerald-600 text-white"
                : "hover:bg-emerald-100 text-gray-700"
            }`}
          >
            Riwayat Resep Obat
          </button>
        </div>
      </div>

      {/* Konten */}
      <div className="flex-1 p-8">
        {activeMenu === "profil" && (
          <UpdateProfile onProfileUpdate={loadProfile} />
        )}
        {activeMenu === "riwayat" && <RiwayatPembelian />}
        {activeMenu === "member" && <Member />}
        {activeMenu === "resep" && <RiwayatResep />}
      </div>
    </div>
  );
}
