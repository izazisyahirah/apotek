export default function Product() {
  return (
    <div className="card">
      <h2>Produk Kesehatan</h2>
      <center>
        <NewArrival />
      </center>
      <div className="product-grid">
        <div className="card3">
          <ProductItem
            nama="Vitamin C"
            harga="Rp 50.000 / botol"
            deskripsi="Vitamin C membantu meningkatkan daya tahan tubuh dan menjaga kesehatan kulit."
            gambar="/img/vitaminc.jpg"
          />
        </div>
        <div className="card3">
          <ProductItem
            nama="Paracetamol"
            harga="Rp 10.000 / strip"
            deskripsi="Obat pereda nyeri dan demam yang aman digunakan sesuai dosis."
            gambar="/img/paracetamol.jpg"
          />
        </div>
        <div className="card3">
          <ProductItem
            nama="Neocenta Gel"
            harga="Rp 40.000 / buah"
            deskripsi="Menyembuhkan luka gores pada kulit."
            gambar="/img/neocenta.jpg"
          />
        </div>
        <div className="card3">
          <ProductItem
            nama="Masker Medis"
            harga="Rp 15.000 / pack"
            deskripsi="Masker sekali pakai yang efektif menyaring partikel dan menjaga kesehatan pernapasan."
            gambar="/img/maskermedis.jpg"
          />
        </div>
      </div>
      <center>
        <BestSeller />
      </center>
      <center>
        <SpecialOffer />
      </center>
    </div>
  );
}

function ProductItem({ nama, harga, deskripsi, gambar }) {
  return (
    <div className="product-card">
      <img
        src={gambar}
        alt={nama}
        width={150}
        height={150}
        className="product-image"
      />
      <h3>{nama}</h3>
      <div className="text2">{deskripsi}</div>
      <strong>{harga}</strong>
    </div>
  );
}

function BestSeller() {
  return (
    <div>
      <hr />
      <h3>🔥 Best Seller</h3>
      <div className="text2">
        Produk kesehatan terbaik pilihan pelanggan kami untuk menjaga tubuh
        tetap sehat.
      </div>
      <strong>Promo: Beli 2 gratis 1 untuk produk pilihan!</strong>
    </div>
  );
}

function NewArrival() {
  return (
    <div>
      <h3>🆕 Produk Terbaru</h3>
      <div className="text2">
        Temukan produk kesehatan terbaru untuk mendukung gaya hidup sehat Anda.
      </div>
      <strong>Dapatkan harga spesial untuk pembelian pertama!</strong>
    </div>
  );
}

function SpecialOffer() {
  return (
    <div>
      <hr />
      <h3>🎉 Penawaran Spesial</h3>
      <div className="text2">
        Nikmati diskon eksklusif untuk pelanggan setia kami setiap bulan.
      </div>
      <strong>Gunakan kode: SEHAT15 untuk potongan harga 15%.</strong>
    </div>
  );
}