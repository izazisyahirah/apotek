import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [qrUrl, setQrUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [receiver, setReceiver] = useState({
    nama: "",
    hp: "",
    alamat: "",
    catatan: "",
    metodePembayaran: "",
  });

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !user.email) return;

      const email = user.email;
      setUserEmail(email);

      const cartKey = `cart_${email}`;
      const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const medicineIds = storedCart
        .filter((i) => i.type === "medicine")
        .map((i) => i.id);
      const medicalIds = storedCart
        .filter((i) => i.type === "medical")
        .map((i) => i.id);

      const [{ data: medicines }, { data: medicals }] = await Promise.all([
        supabase.from("daftar_obat").select("*").in("id", medicineIds),
        supabase.from("alat_kesehatan").select("*").in("id", medicalIds),
      ]);

      const updatedItems = storedCart
        .map((item) => {
          const data =
            item.type === "medicine"
              ? medicines.find((p) => p.id === item.id)
              : medicals.find((p) => p.id === item.id);

          if (!data) return null;

          return {
            ...item,
            product: {
              id: item.id,
              name: data.nama_obat || data.nama_alkes,
              details: {
                price: data.harga_obat || data.harga_alkes,
              },
            },
          };
        })
        .filter(Boolean);

      setCheckoutItems(updatedItems);
    };

    fetchCheckoutItems();
    const handleUpdate = () => fetchCheckoutItems();
    window.addEventListener("cart-updated", handleUpdate);
    return () => window.removeEventListener("cart-updated", handleUpdate);
  }, []);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.quantity * item.product.details.price,
    0
  );
  const voucher = subtotal > 100000 ? 10000 : 0;
  const codFee =
    receiver.metodePembayaran === "Cash on Delivery (COD)" ? 2000 : 0;
  const totalBayar = subtotal + codFee - voucher;

  useEffect(() => {
    if (receiver.metodePembayaran === "Transfer Bank") {
      const bankInfo = `Transfer ke Bank ABC\nNo Rek: 1234567890\nTotal: Rp${totalBayar.toLocaleString(
        "id-ID"
      )}`;
      setQrUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          bankInfo
        )}`
      );
    } else {
      setQrUrl("");
    }
  }, [receiver.metodePembayaran, totalBayar]);

  const handleChange = (e) =>
    setReceiver({ ...receiver, [e.target.name]: e.target.value });

  const handleConfirmCheckout = async () => {
    const { nama, hp, alamat, metodePembayaran } = receiver;
    if (!nama || !hp || !alamat || !metodePembayaran) {
      alert("Mohon lengkapi semua data dan pilih metode pembayaran.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !user.id) {
      alert("User tidak terautentikasi.");
      return;
    }

    const tanggalTransaksi = new Date().toISOString();

    const transaksi = checkoutItems.map((item) => ({
      pelanggan_id: user.id,
      produk_tipe: item.type === "medicine" ? "obat" : "alat kesehatan",
      produk_id: item.id,
      nama_produk: item.product.name,
      harga_produk: item.product.details.price,
      jumlah: item.quantity,
      total_pembelian: item.product.details.price * item.quantity,
      alamat_tujuan: `${alamat} (${nama}, ${hp})`,
      metode_pembayaran: metodePembayaran,
      tanggal_transaksi: tanggalTransaksi,
      status_order:
        metodePembayaran === "Cash on Delivery (COD)"
          ? "Menunggu"
          : "Menunggu Pembayaran",
    }));

    const { error: insertError } = await supabase
      .from("riwayat_pembelian")
      .insert(transaksi);
    if (insertError) {
      alert("Gagal menyimpan transaksi: " + insertError.message);
      return;
    }

    // Update stok
    for (const item of checkoutItems) {
      const tabel = item.type === "medicine" ? "daftar_obat" : "alat_kesehatan";
      const stokField = item.type === "medicine" ? "stok_obat" : "stok_alkes";

      const { data: current, error: fetchError } = await supabase
        .from(tabel)
        .select(stokField)
        .eq("id", item.id)
        .single();

      if (fetchError || !current) continue;

      const stokBaru = Math.max(0, current[stokField] - item.quantity);

      await supabase
        .from(tabel)
        .update({ [stokField]: stokBaru })
        .eq("id", item.id);
    }

    localStorage.removeItem(`cart_${user.email}`);
    setShowModal(true);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/cart")}
          className="text-green-600 hover:text-green-800 mb-4 inline-block"
        >
          ← Kembali ke Keranjang
        </button>

        <h1 className="text-3xl font-bold text-green-700 text-center mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ringkasan Belanja */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-700">
                Ringkasan Belanja
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-green-100 text-green-800 text-left">
                  <tr>
                    <th className="py-3 px-5">Produk</th>
                    <th className="py-3 px-5 text-center">Jumlah</th>
                    <th className="py-3 px-5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm divide-y">
                  {checkoutItems.map(({ product, quantity }) => (
                    <tr key={product.id}>
                      <td className="py-2 px-5">{product.name}</td>
                      <td className="py-2 px-5 text-center">{quantity}</td>
                      <td className="py-2 px-5 text-right">
                        Rp
                        {(product.details.price * quantity).toLocaleString(
                          "id-ID"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="text-sm bg-gray-50 font-semibold text-gray-700">
                  <tr>
                    <td colSpan={2} className="py-2 px-5 text-right">
                      Subtotal
                    </td>
                    <td className="py-2 px-5 text-right">
                      Rp{subtotal.toLocaleString("id-ID")}
                    </td>
                  </tr>
                  {voucher > 0 && (
                    <tr className="text-green-600">
                      <td colSpan={2} className="py-2 px-5 text-right">
                        Voucher Diskon
                      </td>
                      <td className="py-2 px-5 text-right">
                        - Rp{voucher.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  )}
                  {codFee > 0 && (
                    <tr className="text-red-600">
                      <td colSpan={2} className="py-2 px-5 text-right">
                        Biaya COD
                      </td>
                      <td className="py-2 px-5 text-right">
                        + Rp{codFee.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  )}
                  <tr className="text-green-700 text-lg border-t font-bold">
                    <td colSpan={2} className="py-3 px-5 text-right">
                      Total Bayar
                    </td>
                    <td className="py-3 px-5 text-right">
                      Rp{totalBayar.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Form & Pembayaran */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6 space-y-5">
              <h2 className="text-xl font-semibold text-gray-700">
                Informasi Penerima
              </h2>
              <div className="space-y-4">
                <input
                  name="nama"
                  placeholder="Nama Lengkap"
                  value={receiver.nama}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="hp"
                  placeholder="No HP"
                  value={receiver.hp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  name="alamat"
                  placeholder="Alamat Lengkap"
                  rows={3}
                  value={receiver.alamat}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  name="catatan"
                  placeholder="Catatan (Opsional)"
                  value={receiver.catatan}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <select
                  name="metodePembayaran"
                  value={receiver.metodePembayaran}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Pilih Metode Pembayaran</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="Cash on Delivery (COD)">
                    Cash on Delivery (COD)
                  </option>
                </select>
              </div>
            </div>

            {qrUrl && (
              <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  QR Code Pembayaran
                </h3>
                <img
                  src={qrUrl}
                  alt="QR Code"
                  className="mx-auto w-52 h-52 border rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Scan QR code untuk lanjutkan pembayaran
                </p>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleConfirmCheckout}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:to-green-700 text-white text-lg px-6 py-3 rounded-full shadow font-semibold transition"
              >
                Konfirmasi Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl px-8 py-6 w-[90%] max-w-sm text-center animate-fade-in">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
              ✅
            </div>
            <h3 className="text-green-700 text-xl font-bold mb-2">
              Pesanan Berhasil!
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Pesanan Anda telah dikonfirmasi dan stok telah diperbarui.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow text-sm font-medium"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
