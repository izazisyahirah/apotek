import { useEffect, useState } from "react";
import { getPelangganById } from "../../services/pelanggan";
import { supabase } from "../../services/supabase";

// List level dan benefit
const levels = [
  {
    name: "Platinum",
    minAmount: 5000000,
    minTransaksi: 20,
    benefit: "Diskon 10%, layanan prioritas, undangan event khusus",
    color: "yellow",
  },
  {
    name: "Gold",
    minAmount: 2000000,
    minTransaksi: 10,
    benefit: "Diskon 5%, promo spesial, poin reward lebih tinggi",
    color: "amber",
  },
  {
    name: "Silver",
    minAmount: 500000,
    minTransaksi: 5,
    benefit: "Diskon 2%",
    color: "gray",
  },
  {
    name: "Bronze",
    minAmount: 0,
    minTransaksi: 0,
    benefit: "Akses layanan dan informasi promosi",
    color: "gray",
  },
];

// Fungsi tentukan level
function determineLevel(amount, transaksi) {
  for (const level of levels) {
    if (amount >= level.minAmount || transaksi >= level.minTransaksi) {
      return level;
    }
  }
  return levels[levels.length - 1];
}

// Komponen Badge Member
function MemberBadge({ level, color }) {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full bg-${color}-100 text-${color}-700 font-bold text-sm shadow-sm`}
    >
      <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
        <path d="M12 2l2.39 6.95h7.3l-5.94 4.32 2.27 7.04L12 16.91 6.98 20.3l2.27-7.04-5.94-4.32h7.3z" />
      </svg>
      {level}
    </div>
  );
}

// Komponen Card Benefit
function MemberBenefitCard({ level, benefit, color, isActive }) {
  return (
    <div
      className={`rounded-lg shadow-md p-5 transition hover:shadow-xl border-t-4 ${
        isActive
          ? `border-${color}-600 bg-${color}-50`
          : `border-green-500 bg-white`
      }`}
    >
      <h3
        className={`text-lg font-bold ${
          isActive ? `text-${color}-700` : "text-gray-700"
        } mb-2`}
      >
        {level} {isActive && "⭐"}
      </h3>
      <p className="text-sm text-gray-600">{benefit}</p>
    </div>
  );
}

// Komponen Utama Member
export default function Member() {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [transaksi, setTransaksi] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(levels[3]); // Bronze

  useEffect(() => {
    const fetchMemberData = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (!userId) return;

      const { data: pelanggan } = await getPelangganById(userId);
      if (pelanggan) {
        const total = pelanggan.total_pembelian || 0;
        const trx = pelanggan.jumlah_transaksi || 0;
        setAmount(total);
        setTransaksi(trx);
        setCurrentLevel(determineLevel(total, trx));
      }
      setLoading(false);
    };

    fetchMemberData();
  }, []);

  const nextLevel = levels.find(
    (l) =>
      l.minAmount > currentLevel.minAmount ||
      l.minTransaksi > currentLevel.minTransaksi
  );

  const progress = nextLevel
    ? Math.min((amount / nextLevel.minAmount) * 100, 100)
    : 100;

  return (
    <div className="max-w-6xl mx-auto px-2 py-2">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        Keanggotaan Saya
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <>
          <div className="bg-white shadow rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Status:
                  <span className="ml-2">
                    <MemberBadge
                      level={currentLevel.name}
                      color={currentLevel.color}
                    />
                  </span>
                </h2>
                <p className="text-gray-600 mt-2">
                  Total Belanja:{" "}
                  <strong className="text-emerald-600">
                    Rp{amount.toLocaleString("id-ID")}
                  </strong>
                </p>
                <p className="text-gray-600">
                  Jumlah Transaksi:{" "}
                  <strong className="text-emerald-600">{transaksi}</strong>
                </p>
              </div>
            </div>

            {nextLevel && (
              <div className="mt-5">
                <p className="text-sm text-gray-600 mb-2">
                  Menuju{" "}
                  <strong className="text-emerald-700">{nextLevel.name}</strong>
                  : butuh tambahan{" "}
                  <strong>
                    Rp
                    {(nextLevel.minAmount - amount).toLocaleString("id-ID")}
                  </strong>{" "}
                  atau{" "}
                  <strong>
                    {nextLevel.minTransaksi - transaksi} transaksi
                  </strong>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden relative">
                  <div
                    className={`bg-${nextLevel.color}-500 h-5 animate-pulse`}
                    style={{ width: `${progress}%` }}
                  ></div>
                  <span className="absolute left-1/2 -translate-x-1/2 top-0 text-xs text-white font-bold">
                    {progress.toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Tingkatan dan Keuntungannya
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {levels.map((l) => (
              <MemberBenefitCard
                key={l.name}
                level={l.name}
                benefit={l.benefit}
                color={l.color}
                isActive={l.name === currentLevel.name}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
