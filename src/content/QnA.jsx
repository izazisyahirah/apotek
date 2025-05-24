export default function QnASection() {
  return (
    <div className="card">
      <h2>QnA Kesehatan</h2>
      <UserCard
        question="Apa itu obat salep dan bagaimana cara kerjanya?"
        answer="Obat salep adalah obat oles berbentuk krim atau gel yang digunakan langsung pada kulit untuk mengatasi berbagai masalah, seperti luka, iritasi, infeksi, atau peradangan. Salep bekerja dengan cara meresap ke dalam kulit dan memberikan efek terapeutik sesuai dengan kandungannya, seperti antibiotik, antijamur, atau antiinflamasi."
      />
      <UserCard
        question="Apa yang harus dilakukan untuk menjaga daya tahan tubuh?"
        answer="Untuk menjaga daya tahan tubuh, pastikan mengonsumsi makanan bergizi seimbang, cukup tidur, rutin berolahraga, serta menghindari stres berlebihan. Selain itu, minum air putih yang cukup dan menjaga kebersihan diri juga sangat penting."
      />
      <UserCard
        question="Bagaimana cara mengenali tanda-tanda dehidrasi?"
        answer="Tanda-tanda dehidrasi meliputi rasa haus yang berlebihan, warna urine yang lebih gelap, pusing, lemas, mulut kering, dan dalam kondisi parah bisa menyebabkan kebingungan atau kehilangan kesadaran. Jika mengalami gejala ini, segera minum air putih dan hindari aktivitas berat."
      />
      <UserCard
        question="Berapa lama waktu ideal untuk berolahraga setiap hari?"
        answer="Organisasi Kesehatan Dunia (WHO) merekomendasikan olahraga setidaknya 150 menit per minggu untuk intensitas sedang atau 75 menit per minggu untuk intensitas tinggi. Idealnya, sekitar 30 menit per hari sudah cukup untuk menjaga kebugaran tubuh."
      />
      <QnATips/>
      <QnAContact/>
      <QnAFeedback/>
    </div>
  );
}

function UserCard(props) {
  return (
    <div>
      <hr/>
      <b><div className="text">Q: {props.question}</div></b>
      <div className="text"><b>✨A:</b> {props.answer}</div>
    </div>
  );
}
  
  function QnATips() {
    return (
      <div>
        <hr/>
        <h3>❤️‍🩹 Tips Kesehatan</h3>
        <ul>
          <li>Minum air putih minimal 8 gelas sehari</li>
          <li>Hindari konsumsi obat tanpa resep dokter</li>
          <li>Pastikan cukup tidur agar daya tahan tubuh tetap baik</li>
        </ul>
      </div>
    );
  }
  
  function QnAContact() {
    return (
      <div>
        <hr/>
        <h3>⚠️ Butuh Bantuan?</h3>
        <div className="text">Hubungi apoteker kami di hotline: 0800-123-4567</div>
      </div>
    );
  }

  function QnAFeedback() {
    return (
      <div>
                <hr/>

        <h3>📝 Beri Masukan</h3>
        <div className="text">Kami ingin mendengar pendapat Anda! Beri tahu kami apakah jawaban ini membantu.</div>
        <div className="feedback-buttons">
          <button className="btn-yes">Ya</button>
          <button className="btn-no">Tidak</button>
        </div>
      </div>
    );
  }