export default function Artikel() {
  return (
    <div className="card">
      <Judul/>
      <div>
        <h5>Artikel Kesehatan | Obat Salep</h5>
        <Gambar/>
        <Pembahasan/>
        <Kesimpulan/>
      </div>
      <div className="nav-buttons">
        <button className="prev">Sebelumnya</button>
        <button className="next">Selanjutnya</button>
      </div>
    </div>
  );
}

function Judul() {
  return (
    <h2>
      Efektif dan Praktis, Obat Salep Jadi Pilihan untuk Mengatasi Berbagai
      Keluhan Kulit
    </h2>
  );
}

function Pembahasan() {
  return (
    <div>
      <p>
        Obat salep atau obat oles semakin menjadi pilihan utama masyarakat dalam
        mengatasi berbagai masalah kulit, mulai dari luka ringan, iritasi,
        hingga infeksi. Penggunaannya yang praktis dan efeknya yang langsung
        bekerja pada area yang bermasalah membuatnya banyak diminati. Berbagai
        jenis obat salep kini tersedia di pasaran, baik yang dijual bebas maupun
        yang harus menggunakan resep dokter.
      </p>
      <p>
        Dokter spesialis kulit, dr. Andika Pratama, menjelaskan bahwa obat salep
        bekerja dengan cara meresap ke dalam lapisan kulit dan memberikan
        perlindungan atau perawatan langsung pada area yang bermasalah. "Obat
        oles ini umumnya digunakan untuk mengatasi peradangan, infeksi bakteri
        atau jamur, serta membantu penyembuhan luka lebih cepat," ujarnya.
        Beberapa jenis salep mengandung antibiotik untuk mengatasi infeksi,
        sementara lainnya memiliki bahan antiinflamasi untuk mengurangi
        peradangan dan kemerahan pada kulit.
      </p>
      <p>
        Jenis obat salep sangat beragam tergantung pada kandungannya. Salep
        antibiotik seperti mupirocin digunakan untuk infeksi bakteri, sementara
        salep antijamur seperti ketoconazole efektif melawan infeksi jamur. Ada
        juga salep dengan kandungan kortikosteroid yang dapat meredakan
        peradangan akibat eksim atau dermatitis. Selain itu, terdapat obat oles
        berbahan alami seperti ekstrak lidah buaya atau minyak tea tree yang
        dikenal memiliki efek menenangkan pada kulit sensitif.
      </p>
      <p>
        Meski mudah digunakan, masyarakat tetap diimbau untuk mengikuti aturan
        pemakaian yang tepat. Penggunaan obat salep secara berlebihan atau tanpa
        anjuran dokter dapat menimbulkan efek samping, seperti iritasi atau
        resistensi terhadap antibiotik. "Pastikan kulit dalam keadaan bersih
        sebelum mengoleskan salep, dan hindari penggunaan pada area terbuka atau
        luka yang belum kering kecuali atas rekomendasi dokter," tambah dr.
        Andika.
      </p>
      <p>
        Dengan kemudahan penggunaan dan efektivitasnya dalam mengatasi berbagai
        masalah kulit, obat salep tetap menjadi solusi yang banyak digunakan.
        Namun, pemilihan jenis salep harus disesuaikan dengan kondisi kulit agar
        manfaatnya optimal dan tidak menimbulkan efek samping. Jika terjadi
        reaksi alergi atau kondisi tidak membaik setelah pemakaian, segera
        konsultasikan dengan tenaga medis untuk penanganan lebih lanjut.
      </p>
    </div>
  );
}

function Kesimpulan() {
  return (
    <div className="kesimpulan">
      <h3>Kesimpulan</h3>
      <p>
        Obat salep adalah solusi efektif dan praktis dalam mengatasi berbagai masalah kulit.
        Penggunaannya harus disesuaikan dengan kondisi kulit dan mengikuti anjuran dokter
        untuk menghindari efek samping yang tidak diinginkan. Jika mengalami reaksi alergi,
        segera konsultasikan dengan tenaga medis.
      </p>
    </div>
  );
}

function Gambar() {
  return (
  <div>
    <center>
      <img src="img/obat.jpg" alt="logo" width={"500px"} />
    </center>
    <small>Gambar Obat-Obatan</small>
  </div>
  )
}

