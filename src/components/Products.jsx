import { FaCartPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <NewProducts />
    </div>
  );
}

function ProductCard({ name, price, image }) {
  return (
    <div className="relative bg-white group p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 shadow-md hover:bg-emerald-50 hover:shadow-lg transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center">
      <img src={image} alt={name} className="w-full h-full object-contain p-1" />
      <div className="px-4 pb-4">
        <h3 className="text-sm font-nunito-bold mb-1">{name}</h3>
        <p className="text-sm font-nunito-bold text-gray-500">
          Rp{parseInt(price).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}

function Section({ title, products }) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-nunito-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
}

export function NewProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      const [obatRes, alatRes] = await Promise.all([
        supabase
          .from("daftar_obat")
          .select("nama_obat, harga_obat, gambar, created_at"),
        supabase
          .from("alat_kesehatan")
          .select("nama_alkes, harga_alkes, gambar, created_at"),
      ]);

      if (obatRes.error || alatRes.error) {
        console.error(
          "Gagal ambil data:",
          obatRes.error?.message || alatRes.error?.message
        );
        return;
      }

      const combined = [...obatRes.data, ...alatRes.data];

      combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      const latest = combined.slice(0, 5).map((item) => ({
        name: item.nama_obat || item.nama_alkes,
        price: item.harga_obat || item.harga_alkes,
        image: item.gambar,
      }));

      setProducts(latest);
    };

    fetchNewProducts();
  }, []);

  return <Section title="New Products" products={products} />;
}

export function TopProducts() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const { data: pembelianData, error } = await supabase
        .from("riwayat_pembelian")
        .select("produk_id, produk_tipe, nama_produk, harga_produk")
        .limit(10);

      if (error) {
        console.error("Gagal ambil data pembelian:", error.message);
        return;
      }

      const freqMap = {};
      for (const item of pembelianData) {
        const key = `${item.produk_tipe}-${item.produk_id}`;
        if (!freqMap[key]) {
          freqMap[key] = { ...item, count: 1 };
        } else {
          freqMap[key].count += 1;
        }
      }

      const sorted = Object.values(freqMap).sort((a, b) => b.count - a.count);
      const top5 = sorted.slice(0, 5);

      const detailPromises = top5.map(async (item) => {
        try {
          if (item.produk_tipe === "obat") {
            const { data } = await supabase
              .from("daftar_obat")
              .select("gambar")
              .eq("id", item.produk_id)
              .single();

            return {
              name: item.nama_produk,
              price: item.harga_produk,
              image: data?.gambar || "/placeholder-obat.png",
            };
          }

          if (item.produk_tipe === "alkes" || item.produk_tipe === "alat kesehatan") {
            const { data } = await supabase
              .from("alat_kesehatan")
              .select("gambar")
              .eq("id", item.produk_id)
              .single();

            return {
              name: item.nama_produk,
              price: item.harga_produk,
              image: data?.gambar || "/placeholder-alkes.png",
            };
          }

          return null;
        } catch (e) {
          console.error("Gagal ambil detail produk:", e);
          return null;
        }
      });

      const results = await Promise.all(detailPromises);
      const filtered = results.filter((item) => item !== null);
      setTopProducts(filtered);
    };

    fetchTopProducts();
  }, []);

  return <div className="max-w-7xl mx-auto px-4">
      <Section title="Top Products" products={topProducts} />
    </div>;
}