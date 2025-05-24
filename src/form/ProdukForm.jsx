import { useState } from "react";
import Alert from "./components/Alert";
import Card from "./components/Card";
import Input from "./components/Input";
import Button from "./components/Button";

export default function ProdukForm() {
  const [namaObat, setNamaObat] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [harga, setHarga] = useState("");
  const [kadaluarsa, setKadaluarsa] = useState("");
  const [kategori, setKategori] = useState("");

  const kategoriOptions = ["Tablet", "Sirup", "Kapsul", "Salep"];

  return (
    <Card title="Data Obat">
      <div className="mb-2">
        <Input
          lable="Nama Obat"
          type="text"
          placeholder="Masukkan nama obat"
          onChange={(e) => setNamaObat(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <Input
          lable="Jumlah"
          type="number"
          placeholder="Masukkan jumlah"
          onChange={(e) => setJumlah(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <Input
          lable="Harga"
          type="text"
          placeholder="Masukkan harga"
          onChange={(e) => setHarga(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <Input
          lable="Tanggal Kadaluarsa"
          type="date"
          onChange={(e) => setKadaluarsa(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <lable className="block text-gray-700 font-medium mb-2">
          Kategori Obat
        </lable>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          <option value="">Pilih kategori</option>
          {kategoriOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {namaObat && jumlah && harga && kadaluarsa && kategori ? (
        <Alert
          type="info"
          message="Data obat telah dimasukkan dengan lengkap"
        />
      ) : (
        <Alert type="error" message="Harap isi semua data dengan benar" />
      )}
      <Button
        lable="Simpan Data"
        onClick={() => alert("Data berhasil disimpan!")}
      />
    </Card>
  );
}
